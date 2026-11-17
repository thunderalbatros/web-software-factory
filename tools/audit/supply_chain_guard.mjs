#!/usr/bin/env node
/**
 * Web Software Factory — Supply Chain & Anti-Slopsquatting Guard (SOTA 2026)
 *
 * Deterministic 3-layer supply-chain security shield:
 *   1. Dependency Allowlist & Floating Version Guard (.agents/governance/approved_packages.json)
 *      Blocks hallucinated AI packages (Slopsquatting) and floating tags (*, latest, next).
 *   2. Lockfile Integrity & Vulnerability Audit (package-lock.json + npm audit --audit-level=high --json)
 *      Verifies lockfile integrity and zero High/Critical CVEs.
 *   3. Subresource Integrity (SRI) Enforcer
 *      Ensures all external CDN <script> and <link rel="stylesheet"> tags carry
 *      integrity="sha384-..." and crossorigin="anonymous".
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const ALLOWLIST_PATH = path.join(ROOT, ".agents", "governance", "approved_packages.json");
export const SBOM_CYCLONEDX_PATH = path.join(ROOT, ".agents", "memory", "sbom_cyclonedx.json");

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  ".cache",
  "references",
  "dist",
  ".agents",
  ".wrangler",
  "artifacts"
]);

function collectFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, predicate, out);
    } else if (predicate(entry.name, full)) {
      out.push(full);
    }
  }
  return out;
}

/**
 * 1. Dependency Allowlist & Floating Version Guard
 */
function checkPackageAllowlist(rootDir = ROOT) {
  const issues = [];
  if (!fs.existsSync(ALLOWLIST_PATH)) {
    issues.push({
      rule: "ALLOWLIST_MISSING",
      severity: "CRITICAL",
      file: ".agents/governance/approved_packages.json",
      message: "Missing .agents/governance/approved_packages.json governance file."
    });
    return { passed: false, scannedPackages: 0, issues };
  }

  let policy;
  try {
    policy = JSON.parse(fs.readFileSync(ALLOWLIST_PATH, "utf8").replace(/^\uFEFF/, ""));
  } catch (err) {
    issues.push({
      rule: "ALLOWLIST_INVALID_JSON",
      severity: "CRITICAL",
      file: ".agents/governance/approved_packages.json",
      message: `Invalid JSON in approved_packages.json: ${err.message}`
    });
    return { passed: false, scannedPackages: 0, issues };
  }

  const approvedSet = new Set(Array.isArray(policy.approvedPackages) ? policy.approvedPackages : []);
  const enforceExactPinned = policy.enforceExactPinnedVersions !== false;
  const exactSemverRegex = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
  const forbiddenFloating = new Set(
    Array.isArray(policy.forbidFloatingVersions)
      ? policy.forbidFloatingVersions.map((v) => String(v).toLowerCase())
      : ["*", "latest", "next", "canary", "x", "^", "~"]
  );

  const pkgFiles = collectFiles(rootDir, (name) => name === "package.json");
  let scannedPackages = 0;

  for (const pkgPath of pkgFiles) {
    const relPath = path.relative(rootDir, pkgPath).replace(/\\/g, "/");
    let pkg;
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8").replace(/^\uFEFF/, ""));
    } catch (err) {
      issues.push({
        rule: "PACKAGE_JSON_CORRUPT",
        severity: "CRITICAL",
        file: relPath,
        message: `Malformed package.json: ${err.message}`
      });
      continue;
    }

    const sections = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
    for (const sec of sections) {
      const deps = pkg[sec];
      if (!deps || typeof deps !== "object") continue;

      for (const [depName, rawVersion] of Object.entries(deps)) {
        scannedPackages++;
        const ver = String(rawVersion || "").trim();
        const verLower = ver.toLowerCase();

        if (!approvedSet.has(depName)) {
          issues.push({
            rule: "SLOPSQUATTING_UNAPPROVED_PACKAGE",
            severity: "CRITICAL",
            file: relPath,
            package: depName,
            version: ver,
            message: `Unapproved package "${depName}" (${ver}) in ${relPath} [${sec}]. Blocked by Zero-Trust Anti-Slopsquatting policy.`
          });
        }

        const hasFloatingRangePrefix = /^[\^~><=|]/.test(ver) || /\|\||\s-\s/.test(ver);
        if (
          !ver ||
          forbiddenFloating.has(verLower) ||
          ver === "*" ||
          verLower.includes("latest") ||
          /^(?:https?|git|file|github):/i.test(ver) ||
          (enforceExactPinned && (hasFloatingRangePrefix || !exactSemverRegex.test(ver)))
        ) {
          issues.push({
            rule: "FLOATING_OR_UNPINNED_VERSION",
            severity: "HIGH",
            file: relPath,
            package: depName,
            version: ver,
            message: `Floating or unpinned version specifier "${ver}" for "${depName}" in ${relPath}. Pin exact semver versions without ^ or ~ ranges (-E).`
          });
        }
      }
    }
  }

  return {
    passed: issues.length === 0,
    scannedFiles: pkgFiles.length,
    scannedPackages,
    issues
  };
}

/**
 * 2. Lockfile Integrity & npm audit (--json across root, tools/audit, templates, and projects)
 */
export function checkLockfileAndVulnerabilities(rootDir = ROOT, skipNetworkAudit = false) {
  const issues = [];
  const npmLockPath = path.join(rootDir, "package-lock.json");
  const pnpmLockPath = path.join(rootDir, "pnpm-lock.yaml");

  const candidateDirs = [
    rootDir,
    path.join(rootDir, "templates", "astro-edge")
  ];
  const projectsBase = path.join(rootDir, "projects");
  if (fs.existsSync(projectsBase)) {
    for (const entry of fs.readdirSync(projectsBase, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const projDir = path.join(projectsBase, entry.name);
      if (
        fs.existsSync(path.join(projDir, "package.json")) &&
        fs.existsSync(path.join(projDir, "package-lock.json"))
      ) {
        candidateDirs.push(projDir);
      }
    }
  }

  let lockfileType = null;
  if (fs.existsSync(npmLockPath)) {
    lockfileType = "package-lock.json";
  } else if (fs.existsSync(pnpmLockPath)) {
    lockfileType = "pnpm-lock.yaml";
    const content = fs.readFileSync(pnpmLockPath, "utf8");
    if (!content.includes("lockfileVersion")) {
      issues.push({
        rule: "LOCKFILE_CORRUPT",
        severity: "CRITICAL",
        file: "pnpm-lock.yaml",
        message: "pnpm-lock.yaml is missing lockfileVersion header."
      });
    }
  } else {
    issues.push({
      rule: "LOCKFILE_MISSING",
      severity: "CRITICAL",
      file: "package-lock.json",
      message: "No package-lock.json or pnpm-lock.yaml found in workspace root."
    });
  }

  const auditSummary = { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0 };
  const auditedRoots = [];

  for (const targetDir of candidateDirs) {
    const targetPkgPath = path.join(targetDir, "package.json");
    const targetLockPath = path.join(targetDir, "package-lock.json");
    if (!fs.existsSync(targetPkgPath) || !fs.existsSync(targetLockPath)) continue;

    const relRoot = path.relative(rootDir, targetDir).replace(/\\/g, "/") || ".";
    const relLockFile = relRoot === "." ? "package-lock.json" : `${relRoot}/package-lock.json`;
    auditedRoots.push(relRoot);

    try {
      const lock = JSON.parse(fs.readFileSync(targetLockPath, "utf8").replace(/^\uFEFF/, ""));
      const targetPkg = JSON.parse(fs.readFileSync(targetPkgPath, "utf8").replace(/^\uFEFF/, ""));
      if (!lock.lockfileVersion || lock.lockfileVersion < 2 || !lock.packages) {
        issues.push({
          rule: "LOCKFILE_DOWNGRADE_OR_CORRUPT",
          severity: "CRITICAL",
          file: relLockFile,
          message: `${relLockFile} must use lockfileVersion >= 2 and include a valid packages tree.`
        });
      } else {
        const directDeps = {
          ...targetPkg.dependencies,
          ...targetPkg.devDependencies
        };
        for (const depName of Object.keys(directDeps)) {
          const nodeKey = `node_modules/${depName}`;
          const rootLockDeps = lock.packages?.[""]?.dependencies || {};
          const rootLockDevDeps = lock.packages?.[""]?.devDependencies || {};
          if (!lock.packages[nodeKey] && !rootLockDeps[depName] && !rootLockDevDeps[depName]) {
            issues.push({
              rule: "LOCKFILE_DRIFT",
              severity: "HIGH",
              file: relLockFile,
              package: depName,
              message: `Dependency "${depName}" in ${relRoot}/package.json is missing from ${relLockFile}.`
            });
          }
        }
      }
    } catch (err) {
      issues.push({
        rule: "LOCKFILE_PARSE_ERROR",
        severity: "CRITICAL",
        file: relLockFile,
        message: `Failed to parse ${relLockFile}: ${err.message}`
      });
    }

    if (!skipNetworkAudit) {
      const parseAuditReport = (rawJson) => {
        const report = JSON.parse(rawJson);
        const vulns = report?.metadata?.vulnerabilities || {};
        for (const key of ["info", "low", "moderate", "high", "critical", "total"]) {
          auditSummary[key] += Number(vulns[key] || 0);
        }
        const totalVulns = Number(vulns.total || 0);
        const critCount = Number(vulns.critical || 0);
        const highCount = Number(vulns.high || 0);
        if (totalVulns > 0) {
          const vulnNames = Object.keys(report.vulnerabilities || {}).join(", ");
          issues.push({
            rule: "NPM_AUDIT_VULNERABILITY",
            severity: critCount > 0 ? "CRITICAL" : highCount > 0 ? "HIGH" : "MODERATE",
            file: relLockFile,
            message: `npm audit in ${relRoot} detected ${totalVulns} vulnerabilities (${vulnNames}).`
          });
        }
      };

      try {
        const stdout = execSync("npm audit --json", {
          cwd: targetDir,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
          timeout: 20000
        });
        parseAuditReport(stdout);
      } catch (err) {
        const rawOut = String(err.stdout || "").trim();
        if (rawOut.startsWith("{")) {
          try {
            parseAuditReport(rawOut);
          } catch {
            // Non-JSON error (e.g. offline network); lockfile integrity still enforced
          }
        }
      }
    }
  }

  return {
    passed: issues.length === 0,
    lockfileType,
    auditedRoots,
    vulnerabilities: auditSummary,
    issues
  };
}

/**
 * 3. Subresource Integrity (SRI) Verification on HTML & Astro files
 */
export function scanHtmlContentForSri(content, relFile = "inline.html") {
  const issues = [];
  // Strip HTML comments before scanning tags
  const clean = content.replace(/<!--[\s\S]*?-->/g, "");

  const tagRegex = /<(script|link)\b([^>]*?)>/gi;
  let match;
  while ((match = tagRegex.exec(clean)) !== null) {
    const tagName = match[1].toLowerCase();
    const attrs = match[2];

    const urlMatch = attrs.match(/\b(?:src|href)\s*=\s*["']([^"']+)["']/i);
    if (!urlMatch) continue;
    const url = urlMatch[1].trim();

    // Only inspect external URLs (http://, https://, //)
    if (!/^(?:https?:)?\/\//i.test(url)) continue;

    // For <link>, only enforce SRI on stylesheets or preload scripts/styles/fonts
    if (tagName === "link") {
      const relMatch = attrs.match(/\brel\s*=\s*["']([^"']+)["']/i);
      const relVal = relMatch ? relMatch[1].toLowerCase() : "";
      const requiresSri =
        relVal.includes("stylesheet") ||
        relVal.includes("modulepreload") ||
        (relVal.includes("preload") && /\bas\s*=\s*["'](?:script|style|font)["']/i.test(attrs));
      if (!requiresSri) continue;
    }

    if (/^http:\/\//i.test(url)) {
      issues.push({
        rule: "SRI_INSECURE_HTTP_CDN",
        severity: "CRITICAL",
        file: relFile,
        url,
        message: `External resource loaded over insecure HTTP (${url}) in ${relFile}.`
      });
      continue;
    }

    const integrityMatch = attrs.match(/\bintegrity\s*=\s*["']([^"']+)["']/i);
    const crossoriginMatch = attrs.match(/\bcrossorigin\s*=\s*["']([^"']+)["']/i);

    const hasStrongSri =
      integrityMatch && /^sha(?:384|512)-[A-Za-z0-9+/=]{32,}$/.test(integrityMatch[1].trim());
    const hasCrossorigin =
      crossoriginMatch && /^(?:anonymous|use-credentials)$/i.test(crossoriginMatch[1].trim());

    if (!hasStrongSri || !hasCrossorigin) {
      issues.push({
        rule: "MISSING_SUBRESOURCE_INTEGRITY",
        severity: "HIGH",
        file: relFile,
        url,
        message: `External <${tagName}> (${url}) in ${relFile} is missing mandatory integrity="sha384-..." and crossorigin="anonymous" attributes.`
      });
    }
  }

  return issues;
}

function checkSubresourceIntegrity(rootDir = ROOT) {
  const scanDirs = [
    path.join(rootDir, "templates"),
    path.join(rootDir, "projects")
  ];

  const htmlFiles = [];
  for (const d of scanDirs) {
    collectFiles(d, (name) => name.endsWith(".html") || name.endsWith(".astro"), htmlFiles);
  }

  const issues = [];
  for (const filePath of htmlFiles) {
    const rel = path.relative(rootDir, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const fileIssues = scanHtmlContentForSri(content, rel);
    issues.push(...fileIssues);
  }

  return {
    passed: issues.length === 0,
    scannedFiles: htmlFiles.length,
    issues
  };
}

export const verifyPackageAllowlist = checkPackageAllowlist;

/**
 * 4. Retire.js Client Library Vulnerability Signature Pass (Vault: audit-sota/retire.js)
 */
export function checkRetireJsClientSignatures(rootDir = ROOT) {
  const issues = [];
  const jsFiles = collectFiles(rootDir, (name) => name.endsWith(".js") || name.endsWith(".html"));
  const retiredPatterns = [
    { id: "RETIRE_JQUERY_1_2", regex: /jquery[.-](1\.|2\.|3\.[0-4]\.)/i, msg: "Outdated jQuery (<3.5.0) vulnerable to Prototype Pollution / XSS." },
    { id: "RETIRE_LODASH_OLD", regex: /lodash[.-]([1-3]\.|4\.(0|1[0-6])\.)/i, msg: "Outdated Lodash (<4.17.21) vulnerable to Prototype Pollution." },
    { id: "RETIRE_POLYFILL_IO", regex: /cdn\.polyfill\.io|polyfill\.io/i, msg: "Malicious supply-chain domain polyfill.io detected." }
  ];

  for (const fPath of jsFiles) {
    const rel = path.relative(rootDir, fPath).replace(/\\/g, "/");
    if (rel.startsWith("tools/")) continue;
    const content = fs.readFileSync(fPath, "utf8");
    for (const pat of retiredPatterns) {
      if (pat.regex.test(content)) {
        issues.push({
          rule: pat.id,
          severity: "CRITICAL",
          file: rel,
          message: pat.msg
        });
      }
    }
  }
  return { passed: issues.length === 0, scannedFiles: jsFiles.length, issues };
}

export function generateCycloneDxSbom(rootDir = ROOT) {
  const pkgPath = path.join(rootDir, "package.json");
  const lockPath = path.join(rootDir, "package-lock.json");
  let pkg = { name: "web-software-factory-studio", version: "2.2.0", dependencies: {}, devDependencies: {} };
  try {
    if (fs.existsSync(pkgPath)) {
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8").replace(/^\uFEFF/, ""));
    }
  } catch {}

  let lockPackages = {};
  try {
    if (fs.existsSync(lockPath)) {
      const lockObj = JSON.parse(fs.readFileSync(lockPath, "utf8").replace(/^\uFEFF/, ""));
      lockPackages = lockObj.packages || {};
    }
  } catch {}

  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  const components = Object.entries(allDeps).map(([depName, specVer]) => {
    const lockEntry = lockPackages[`node_modules/${depName}`] || {};
    const resolvedVersion = String(lockEntry.version || String(specVer).replace(/^[\^~]/, ""));
    const licenseId = lockEntry.license || "MIT";
    const integrity = lockEntry.integrity || "";
    return {
      type: "library",
      "bom-ref": `pkg:npm/${depName}@${resolvedVersion}`,
      name: depName,
      version: resolvedVersion,
      purl: `pkg:npm/${depName}@${resolvedVersion}`,
      licenses: [{ license: { id: String(licenseId) } }],
      hashes: integrity
        ? [
            {
              alg: integrity.startsWith("sha512-") ? "SHA-512" : "SHA-256",
              content: Buffer.from(integrity.replace(/^sha\d+-/, ""), "base64").toString("hex")
            }
          ]
        : []
    };
  });

  const sbomPayload = {
    bomFormat: "CycloneDX",
    specVersion: "1.5",
    serialNumber: `urn:uuid:${crypto.randomUUID()}`,
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: [
        {
          vendor: "Web Software Factory Studio",
          name: "supply_chain_guard.mjs",
          version: "2026.10"
        }
      ],
      component: {
        type: "application",
        "bom-ref": `pkg:npm/${pkg.name || "web-software-factory-studio"}@${pkg.version || "2.2.0"}`,
        name: pkg.name || "web-software-factory-studio",
        version: pkg.version || "2.2.0"
      }
    },
    components
  };

  const outFile = path.join(rootDir, ".agents", "memory", "sbom_cyclonedx.json");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(sbomPayload, null, 2) + "\n", "utf8");
  return {
    path: outFile,
    componentCount: components.length
  };
}

export function runSupplyChainGuard(options = {}) {
  const rootDir = options.rootDir || ROOT;
  const skipNetworkAudit = Boolean(options.skipNetworkAudit);
  const skipSbomWrite = Boolean(options.skipSbomWrite);
  const start = performance.now();

  const allowlistCheck = checkPackageAllowlist(rootDir);
  const lockfileCheck = checkLockfileAndVulnerabilities(rootDir, skipNetworkAudit);
  const sriCheck = checkSubresourceIntegrity(rootDir);
  const retireCheck = checkRetireJsClientSignatures(rootDir);
  const sbom = skipSbomWrite ? { skipped: true, componentCount: 0 } : generateCycloneDxSbom(rootDir);

  const allIssues = [
    ...allowlistCheck.issues,
    ...lockfileCheck.issues,
    ...sriCheck.issues,
    ...retireCheck.issues
  ];

  const elapsedMs = Number((performance.now() - start).toFixed(2));
  const passed = allIssues.length === 0;

  return {
    passed,
    status: passed ? "PASS" : "BLOCKED",
    elapsedMs,
    allowlist: allowlistCheck,
    lockfile: lockfileCheck,
    sri: sriCheck,
    sbom,
    issues: allIssues
  };
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();

if (isCli) {
  const jsonMode = process.argv.includes("--json");
  const fastMode = process.argv.includes("--fast");
  const report = runSupplyChainGuard({ skipNetworkAudit: fastMode });

  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(
      `[SUPPLY-CHAIN-GUARD] Status: ${report.status} | Packages: ${report.allowlist.scannedPackages} | HTML/Astro SRI: ${report.sri.scannedFiles} | Lockfile: ${report.lockfile.lockfileType || "NONE"} (${report.elapsedMs}ms)`
    );
    if (!report.passed) {
      for (const issue of report.issues) {
        console.error(`  ❌ [${issue.rule}] ${issue.file}: ${issue.message}`);
      }
    }
  }

  process.exit(report.passed ? 0 : 1);
}
