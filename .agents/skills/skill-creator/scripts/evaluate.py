#!/usr/bin/env python3
"""
.agents/skills/skill-creator/scripts/evaluate.py
Hard-Gated Anti-Complacency Evaluator for Skills & Factory Deliverables (SOTA 2026)

Scoring Formula (0 to 100):
  - 25 pts: Clean build + oxlint + ast_guard.mjs (0 errors)
  - 25 pts: security_gate.mjs (100% hardened, 0 high/critical vulnerabilities)
  - 25 pts: chaos_monkey_test.mjs (0 dead links, 0 console errors on click, resilient forms)
  - 25 pts: ryux_design_gate.mjs + visual_audit.mjs (0 geometric collisions, 60fps, approved contrast)

Veto Gate Penalty:
  If ANY of the 4 pillars fails a critical criterion, the total score is automatically
  capped at 49/100 (REPROBADO), forcing the self-repair loop to fix the real failure
  before notifying the CTO.
"""

import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
EVAL_LATEST_JSON = ROOT / ".agents" / "memory" / "eval_matrix_latest.json"


def compute_hard_gated_score(blocks: dict) -> dict:
    p1 = min(25, max(0, int(blocks.get("buildAndStatic", {}).get("points", 0))))
    p2 = min(25, max(0, int(blocks.get("securityZeroTrust", {}).get("points", 0))))
    p3 = min(25, max(0, int(blocks.get("chaosDestructive", {}).get("points", 0))))
    p4 = min(25, max(0, int(blocks.get("visualAndMotion", {}).get("points", 0))))

    raw_score = p1 + p2 + p3 + p4
    veto_reasons = []

    for key, label in [
        ("buildAndStatic", "Build + Oxlint + AST Guard"),
        ("securityZeroTrust", "Security Gate Zero-Trust"),
        ("chaosDestructive", "Chaos Monkey Destructive Test"),
        ("visualAndMotion", "RYUX Design + Visual 60FPS Gate"),
    ]:
        blk = blocks.get(key, {})
        if not blk.get("criticalPassed", False):
            veto_reasons.append(blk.get("reason") or f"Critical failure in {label}")

    veto_triggered = len(veto_reasons) > 0
    final_score = min(49, raw_score) if veto_triggered else raw_score
    status = "REPROBADO" if (veto_triggered or final_score < 92) else "APROBADO"

    return {
        "rawScore": raw_score,
        "finalScore": final_score,
        "vetoTriggered": veto_triggered,
        "vetoReasons": veto_reasons,
        "status": status,
    }


def main() -> int:
    if "--refresh" in sys.argv or not EVAL_LATEST_JSON.exists():
        cmd = ["node", str(ROOT / "tools" / "intelligence" / "eval_matrix.mjs")]
        subprocess.run(cmd, cwd=str(ROOT), check=False)

    if not EVAL_LATEST_JSON.exists():
        print(json.dumps({"error": "eval_matrix_latest.json not found", "finalScore": 0, "status": "REPROBADO"}))
        return 1

    data = json.loads(EVAL_LATEST_JSON.read_text(encoding="utf-8"))
    blocks = data.get("hardGatedBlocks", {})
    verdict = compute_hard_gated_score(blocks)

    # Self-verify the Veto Gate cap at 49/100
    synthetic_veto = compute_hard_gated_score(
        {
            "buildAndStatic": {"points": 25, "criticalPassed": True},
            "securityZeroTrust": {"points": 25, "criticalPassed": True},
            "chaosDestructive": {"points": 0, "criticalPassed": False, "reason": "Console error on button click"},
            "visualAndMotion": {"points": 25, "criticalPassed": True},
        }
    )
    assert synthetic_veto["finalScore"] == 49 and synthetic_veto["status"] == "REPROBADO", "Veto gate failed to cap at 49/100"

    output = {
        "project": "web-software-factory",
        "hardGatedBlocks": blocks,
        "rawScore": verdict["rawScore"],
        "finalScore": verdict["finalScore"],
        "vetoTriggered": verdict["vetoTriggered"],
        "vetoReasons": verdict["vetoReasons"],
        "status": verdict["status"],
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))
    return 0 if verdict["status"] == "APROBADO" else 1


if __name__ == "__main__":
    sys.exit(main())
