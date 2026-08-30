#!/usr/bin/env node

/**
 * scripts/sync.mjs
 * 
 * Synchronizes and validates skills and rules from the canonical
 * master Source of Truth (just-works-kernel) to all local target environments:
 *  - ~/.cursor/skills-cursor/
 *  - ~/.cursor/rules/
 *  - ~/.grok/skills/
 *  - /Users/jamie.matheson/src/multivibe-gui/skills/
 *  - /Users/jamie.matheson/src/multivibe-gui/docs/cursor-setup/rules/
 * 
 * Validates that every target points to canonical SOT and checks git status.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const REPO_ROOT = path.resolve(__dirname, '..');

export const SOT_SKILLS_DIR = path.join(REPO_ROOT, 'skills');
export const SOT_RULES_DIR = path.join(REPO_ROOT, 'rules');

export function getTargets(customEnv = process.env) {
  const cursorHome = customEnv.CURSOR_HOME || path.join(os.homedir(), '.cursor');
  const grokHome = customEnv.GROK_HOME || path.join(os.homedir(), '.grok');
  const multivibeRoot = customEnv.MULTIVIBE_ROOT || '/Users/jamie.matheson/src/multivibe-gui';

  return {
    cursorHome,
    rulesTargets: [
      path.join(cursorHome, 'rules'),
      path.join(multivibeRoot, 'docs', 'cursor-setup', 'rules'),
    ],
    skillsTargets: [
      path.join(cursorHome, 'skills-cursor'),
      path.join(grokHome, 'skills'),
      path.join(multivibeRoot, 'skills'),
    ],
  };
}

export function inspectSOT() {
  if (!fs.existsSync(SOT_RULES_DIR)) {
    throw new Error(`SOT rules directory missing: ${SOT_RULES_DIR}`);
  }
  if (!fs.existsSync(SOT_SKILLS_DIR)) {
    throw new Error(`SOT skills directory missing: ${SOT_SKILLS_DIR}`);
  }

  const rules = fs.readdirSync(SOT_RULES_DIR)
    .filter(f => f.endsWith('.mdc'))
    .map(name => ({
      name,
      filePath: path.join(SOT_RULES_DIR, name),
    }));

  const skills = fs.readdirSync(SOT_SKILLS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({
      name: dirent.name,
      dirPath: path.join(SOT_SKILLS_DIR, dirent.name),
      skillFile: path.join(SOT_SKILLS_DIR, dirent.name, 'SKILL.md'),
    }))
    .filter(s => fs.existsSync(s.skillFile));

  return { rules, skills };
}

export function linkItem(sourcePath, targetPath) {
  const targetParent = path.dirname(targetPath);
  if (!fs.existsSync(targetParent)) {
    fs.mkdirSync(targetParent, { recursive: true });
  }

  // If target exists or is a symlink (even broken)
  if (fs.existsSync(targetPath) || fs.lstatSync(targetPath, { throwIfNoEntry: false })) {
    const stat = fs.lstatSync(targetPath, { throwIfNoEntry: false });
    if (stat) {
      if (stat.isSymbolicLink()) {
        try {
          const currentTarget = fs.realpathSync(targetPath);
          const expectedTarget = fs.realpathSync(sourcePath);
          if (currentTarget === expectedTarget) {
            return { action: 'already-linked', path: targetPath };
          }
        } catch {
          // broken link, remove and recreate
        }
        fs.unlinkSync(targetPath);
      } else if (stat.isDirectory()) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(targetPath);
      }
    }
  }

  fs.symlinkSync(sourcePath, targetPath);
  return { action: 'created-symlink', path: targetPath };
}

export function syncKernel(options = {}) {
  const env = options.env || process.env;
  const targets = getTargets(env);
  const { rules, skills } = inspectSOT();

  const results = {
    rulesLinked: 0,
    skillsLinked: 0,
    targetsValidated: 0,
    errors: [],
  };

  // 1. Sync Rules
  for (const ruleTargetDir of targets.rulesTargets) {
    if (!fs.existsSync(ruleTargetDir)) {
      fs.mkdirSync(ruleTargetDir, { recursive: true });
    }
    for (const rule of rules) {
      const destFile = path.join(ruleTargetDir, rule.name);
      linkItem(rule.filePath, destFile);
      results.rulesLinked++;
    }
  }

  // 2. Sync Skills
  for (const skillTargetDir of targets.skillsTargets) {
    // If skillTargetDir itself is a symlink pointing to another location, convert it to a real dir
    const targetStat = fs.lstatSync(skillTargetDir, { throwIfNoEntry: false });
    if (targetStat && targetStat.isSymbolicLink()) {
      fs.unlinkSync(skillTargetDir);
    }
    if (!fs.existsSync(skillTargetDir)) {
      fs.mkdirSync(skillTargetDir, { recursive: true });
    }

    for (const skill of skills) {
      const destDir = path.join(skillTargetDir, skill.name);
      linkItem(skill.dirPath, destDir);
      results.skillsLinked++;
    }
  }

  // 3. Validate that every target resolves to canonical SOT
  for (const ruleTargetDir of targets.rulesTargets) {
    for (const rule of rules) {
      const destFile = path.join(ruleTargetDir, rule.name);
      try {
        const resolved = fs.realpathSync(destFile);
        const expected = fs.realpathSync(rule.filePath);
        if (resolved !== expected) {
          results.errors.push(`Rule ${rule.name} in ${ruleTargetDir} resolves to ${resolved}, expected ${expected}`);
        } else {
          results.targetsValidated++;
        }
      } catch (err) {
        results.errors.push(`Rule ${rule.name} in ${ruleTargetDir} validation error: ${err.message}`);
      }
    }
  }

  for (const skillTargetDir of targets.skillsTargets) {
    for (const skill of skills) {
      const destDir = path.join(skillTargetDir, skill.name);
      try {
        const resolved = fs.realpathSync(destDir);
        const expected = fs.realpathSync(skill.dirPath);
        if (resolved !== expected) {
          results.errors.push(`Skill ${skill.name} in ${skillTargetDir} resolves to ${resolved}, expected ${expected}`);
        } else {
          results.targetsValidated++;
        }
      } catch (err) {
        results.errors.push(`Skill ${skill.name} in ${skillTargetDir} validation error: ${err.message}`);
      }
    }
  }

  return results;
}

export function checkGitStatus(repoDir = REPO_ROOT) {
  const gitRes = {
    clean: true,
    uncommittedChanges: [],
    unpushedCommits: [],
    remoteUrl: '',
    branch: '',
    warnings: [],
  };

  try {
    const statusOut = execSync('git status --porcelain', { cwd: repoDir, encoding: 'utf8' }).trim();
    if (statusOut) {
      gitRes.clean = false;
      gitRes.uncommittedChanges = statusOut.split('\n').filter(Boolean);
    }

    const branchOut = execSync('git rev-parse --abbrev-ref HEAD', { cwd: repoDir, encoding: 'utf8' }).trim();
    gitRes.branch = branchOut;

    try {
      const remoteOut = execSync('git config --get remote.origin.url', { cwd: repoDir, encoding: 'utf8' }).trim();
      gitRes.remoteUrl = remoteOut;
    } catch {
      gitRes.warnings.push('No remote.origin.url configured');
    }

    try {
      const unpushed = execSync('git log @{u}..HEAD --oneline', { cwd: repoDir, encoding: 'utf8' }).trim();
      if (unpushed) {
        gitRes.unpushedCommits = unpushed.split('\n').filter(Boolean);
      }
    } catch {
      gitRes.warnings.push('No upstream branch configured or unable to compare with @{u}');
    }
  } catch (err) {
    gitRes.warnings.push(`Git status execution error: ${err.message}`);
  }

  return gitRes;
}

function main() {
  console.log('==> [just-works-kernel] Starting Sync to Target Environments');
  console.log(`    SOT Repository: ${REPO_ROOT}`);

  const { rules, skills } = inspectSOT();
  console.log(`    Found ${rules.length} rules and ${skills.length} skills in master SOT.`);

  console.log('==> Synchronizing and validating symlinks...');
  const syncResults = syncKernel();

  if (syncResults.errors.length > 0) {
    console.error('❌ Sync validation failed with errors:');
    for (const err of syncResults.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(`✅ All ${syncResults.targetsValidated} target links validated against canonical SOT.`);

  console.log('\n==> Verifying repository git status...');
  const gitStatus = checkGitStatus();

  console.log(`    Branch: ${gitStatus.branch}`);
  console.log(`    Remote: ${gitStatus.remoteUrl || '(none)'}`);

  if (gitStatus.uncommittedChanges.length > 0) {
    console.warn(`⚠️  Uncommitted changes detected (${gitStatus.uncommittedChanges.length} file(s)):`);
    for (const line of gitStatus.uncommittedChanges) {
      console.warn(`    ${line}`);
    }
  } else {
    console.log('    Working tree: clean');
  }

  if (gitStatus.unpushedCommits.length > 0) {
    console.warn(`⚠️  Unpushed commits detected (${gitStatus.unpushedCommits.length} commit(s)):`);
    for (const commit of gitStatus.unpushedCommits) {
      console.warn(`    ${commit}`);
    }
  } else {
    console.log('    Upstream commits: up to date');
  }

  if (gitStatus.warnings.length > 0) {
    for (const w of gitStatus.warnings) {
      console.warn(`    Note: ${w}`);
    }
  }

  console.log('\n✨ Sync completed successfully.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}
