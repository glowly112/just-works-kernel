#!/usr/bin/env python3
"""Validate ui-app catalogs: IDs, platform×nav×shell compat, no IX-as-NAV."""
from __future__ import annotations

import csv
import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "references"


def load_axes():
    nav_meta: dict[str, str] = {}
    shell, dens, plat, ix = set(), set(), set(), set()
    with (ROOT / "app-axes.tsv").open() as f:
        for r in csv.DictReader(f, delimiter="\t"):
            ax, i = r["axis"], r["id"]
            if ax == "navigation":
                nav_meta[i] = (r.get("meta") or "any").strip()
            elif ax == "shell":
                shell.add(i)
            elif ax == "density":
                dens.add(i)
            elif ax == "platform":
                plat.add(i)
            elif ax == "interaction":
                ix.add(i)
    return nav_meta, shell, dens, plat, ix


def shell_family(sh: str) -> str:
    if sh.startswith("SH-PHONE"):
        return "phone"
    if sh.startswith("SH-TABLET"):
        return "tablet"
    if sh.startswith("SH-DESK"):
        return "desk"
    if sh == "SH-RESPONSIVE-COLLAPSE":
        return "responsive"
    return "other"


def nav_ok(nav: str, platform: str, nav_meta: dict[str, str]) -> bool:
    m = nav_meta.get(nav, "")
    if not m or m == "any":
        return nav in nav_meta
    tags = set(m.split("|"))
    if platform == "mobile-phone":
        return bool(tags & {"mobile", "any"})
    if platform == "mobile-tablet":
        return bool(tags & {"mobile", "tablet", "desktop", "any"})
    if platform in ("desktop-web", "desktop-native-like"):
        return bool(tags & {"desktop", "tablet", "any"})
    if platform == "responsive-app":
        return True
    return False


def shell_ok(sh: str, platform: str) -> bool:
    fam = shell_family(sh)
    if platform == "mobile-phone":
        return fam in ("phone", "responsive")
    if platform == "mobile-tablet":
        return fam in ("phone", "tablet", "responsive")
    if platform in ("desktop-web", "desktop-native-like"):
        return fam in ("desk", "tablet", "responsive")
    if platform == "responsive-app":
        return True
    return False


def main() -> int:
    nav_meta, shells, dens, plats, ixs = load_axes()
    errors: list[str] = []

    # named
    with (ROOT / "app-patterns-named.tsv").open() as f:
        named = list(csv.DictReader(f, delimiter="\t"))
    for r in named:
        pid = r["pattern_id"]
        if r["platform"] not in plats:
            errors.append(f"named {pid}: bad platform {r['platform']!r}")
        if not r["nav"].startswith("NAV-") or r["nav"] not in nav_meta:
            errors.append(f"named {pid}: bad nav {r['nav']!r}")
        if r.get("ix_default") and (
            not r["ix_default"].startswith("IX-") or r["ix_default"] not in ixs
        ):
            errors.append(f"named {pid}: bad ix_default {r.get('ix_default')!r}")
        if r["shell"] not in shells:
            errors.append(f"named {pid}: bad shell {r['shell']!r}")
        if r["density"] not in dens:
            errors.append(f"named {pid}: bad density {r['density']!r}")
        if r.get("quarantine") not in ("0", "1"):
            errors.append(f"named {pid}: quarantine must be 0|1")
        if r.get("quarantine") == "0":
            if not nav_ok(r["nav"], r["platform"], nav_meta):
                errors.append(f"named {pid}: nav/platform incompat")
            if not shell_ok(r["shell"], r["platform"]):
                errors.append(f"named {pid}: shell/platform incompat")

    q = {r["pattern_id"] for r in named if r.get("quarantine") == "1"}

    def check_combo(row: dict, label: str):
        if row["nav"].startswith("IX-"):
            errors.append(f"{label}: IX-as-NAV {row.get('combo_id')}")
        if row["nav"] not in nav_meta:
            errors.append(f"{label}: unknown nav {row['nav']}")
        if row["shell"] not in shells:
            errors.append(f"{label}: unknown shell")
        if row["platform"] not in plats:
            errors.append(f"{label}: unknown platform")
        if not nav_ok(row["nav"], row["platform"], nav_meta):
            errors.append(f"{label} {row.get('combo_id')}: nav incompat")
        if not shell_ok(row["shell"], row["platform"]):
            errors.append(f"{label} {row.get('combo_id')}: shell incompat")
        if row.get("pattern_id") in q:
            errors.append(f"{label}: quarantined pattern in pool {row.get('pattern_id')}")
        ix = row.get("interaction") or ""
        if ix and (not ix.startswith("IX-") or ix not in ixs):
            errors.append(f"{label}: bad interaction {ix}")
        bl = row.get("brief_lock") or ""
        for key, val in (
            ("PLATFORM", row["platform"]),
            ("NAV", row["nav"]),
            ("SHELL", row["shell"]),
        ):
            if f"{key}={val}" not in bl:
                errors.append(f"{label} {row.get('combo_id')}: brief_lock drift {key}")

    with (ROOT / "app-combo-3k.tsv").open() as f:
        for r in csv.DictReader(f, delimiter="\t"):
            check_combo(r, "tsv")

    with (ROOT / "app-combo-5k.jsonl").open() as f:
        for line in f:
            check_combo(json.loads(line), "jsonl")

    if errors:
        print(f"FAIL {len(errors)} issues (showing ≤40):")
        for e in errors[:40]:
            print(" -", e)
        return 1
    print(
        "PASS: named=%d quarantine=%d tsv+jsonl compat OK"
        % (len(named), len(q))
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
