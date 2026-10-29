#!/usr/bin/env node
/**
 * WebFactory FinOps — Antigravity Global MCP Profile Switcher
 * Switches C:\Users\tomas\.gemini\config\mcp_config.json between:
 *   - lean     : web-factory-omni-rag + context7 (Default, -98% MCP tool bloat)
 *   - research : lean + centinela-firecrawl + github
 *   - full     : All 13 servers from mcp_config.full_backup.json
 *
 * Usage:
 *   node tools/intelligence/toggle_mcp_profile.mjs [lean|research|full|status]
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const CONFIG_DIR = path.join(os.homedir(), ".gemini", "config");
const MCP_CONFIG_PATH = path.join(CONFIG_DIR, "mcp_config.json");
const FULL_BACKUP_PATH = path.join(CONFIG_DIR, "mcp_config.full_backup.json");

const PROFILES = {
  lean: ["web-factory-omni-rag", "context7"],
  research: ["web-factory-omni-rag", "context7", "centinela-firecrawl", "github"],
  reverse: ["web-factory-omni-rag", "context7", "rea"],
  full: "ALL"
};

function loadFullBackup() {
  if (!fs.existsSync(FULL_BACKUP_PATH)) {
    throw new Error(`Full backup not found at ${FULL_BACKUP_PATH}`);
  }
  return JSON.parse(fs.readFileSync(FULL_BACKUP_PATH, "utf8"));
}

function main() {
  const mode = (process.argv[2] || "status").toLowerCase();
  const full = loadFullBackup();

  if (mode === "status") {
    const current = fs.existsSync(MCP_CONFIG_PATH)
      ? JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, "utf8"))
      : { mcpServers: {} };
    const activeKeys = Object.keys(current.mcpServers || {});
    console.log(JSON.stringify({
      activeServerCount: activeKeys.length,
      activeServers: activeKeys,
      availableProfiles: Object.keys(PROFILES)
    }, null, 2));
    return;
  }

  if (!PROFILES[mode]) {
    console.error(`Unknown profile "${mode}". Valid profiles: ${Object.keys(PROFILES).join(", ")}, status`);
    process.exit(1);
  }

  let nextServers = {};
  if (PROFILES[mode] === "ALL") {
    nextServers = full.mcpServers;
  } else {
    for (const key of PROFILES[mode]) {
      if (full.mcpServers[key]) {
        nextServers[key] = full.mcpServers[key];
      }
    }
  }

  fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify({ mcpServers: nextServers }, null, 2) + "\n", "utf8");
  console.log(`[MCP Profile Switcher] Activated profile "${mode}" (${Object.keys(nextServers).length} servers: ${Object.keys(nextServers).join(", ")})`);
}

main();
