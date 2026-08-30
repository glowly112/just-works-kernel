#!/usr/bin/env node

/**
 * scripts/drift-check.mjs
 * 
 * Compares skill files across:
 *  - just-works-kernel (Master SOT)
 *  - multivibe-gui (/Users/jamie.matheson/src/multivibe-gui/skills)
 *  - ~/.grok/skills
 *  - ~/.cursor/skills-cursor
 * 
 * Reports any hash mismatches, missing skills, broken symlinks, or orphan files.
 * Exits 0 if clean, exits 1 if drift is detected.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const REPO_ROOT = path.resolve(__dirname, '..');

export const SOT_SKILLS_DIR = path.join(REPO_ROOT, 'skills');

export function hashFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(data).digest('hex');
  } catch (err) {
    return null;
  }
}

export function getAllFiles(dir, baseDir = dir) {
  const fileList = [];
  if (!fs.existsSync(dir)) return fileList;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      fileList.push(...getAllFiles(fullPath, baseDir));
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      fileList.push(relPath);
    }
  }
  return fileList;
}

export function getSkillTargets(customEnv = process.env) {
  const cursorHome = customEnv.CURSOR_HOME || path.join(os.homedir(), '.cursor');
  const grokHome = customEnv.GROK_HOME || path.join(os.homedir(), '.grok');
  const multivibeRoot = customEnv.MULTIVIBE_ROOT || '/Users/jamie.matheson/src/multivibe-gui';

  return [
    {
      id: 'multivibe-gui',
      path: path.join(multivibeRoot, 'skills'),
      checkOrphans: true,
      allowedNonSkillFiles: ['README.md', '.DS_Store'],
    },
    {
      id: 'grok-skills',
      path: path.join(grokHome, 'skills'),
      checkOrphans: true,
      allowedNonSkillFiles: ['.DS_Store'],
    },
    {
      id: 'cursor-skills',
      path: path.join(cursorHome, 'skills-cursor'),
      checkOrphans: false, // cursor has standalone user skills like canvas, loop, etc.
      checkBrokenLinks: true,
      allowedNonSkillFiles: ['.sync-manifest.json', '.DS_Store'],
    },
  ];
}

export function checkDrift(options = {}) {
  const env = options.env || process.env;
  const targets = getSkillTargets(env);

  const report = {
    clean: true,
    sotSkillsCount: 0,
    mismatches: [],
    missing: [],
    orphans: [],
    brokenLinks: [],
  };

  if (!fs.existsSync(SOT_SKILLS_DIR)) {
    report.clean = false;
    report.missing.push({ target: 'SOT', item: SOT_SKILLS_DIR, reason: 'SOT skills directory does not exist' });
    return report;
  }

  // 1. Index SOT Skills
  const sotSkillEntries = fs.readdirSync(SOT_SKILLS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.git');

  const sotSkills = new Map();
  for (const dirent of sotSkillEntries) {
    const skillName = dirent.name;
    const skillDirPath = path.join(SOT_SKILLS_DIR, skillName);
    const skillFile = path.join(skillDirPath, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;

    const files = getAllFiles(skillDirPath);
    const fileHashes = new Map();
    for (const rel of files) {
      const h = hashFile(path.join(skillDirPath, rel));
      if (h) fileHashes.set(rel, h);
    }

    sotSkills.set(skillName, {
      dirPath: skillDirPath,
      fileHashes,
    });
  }

  report.sotSkillsCount = sotSkills.size;

  // 2. Check each target
  for (const target of targets) {
    const targetDir = target.path;
    if (!fs.existsSync(targetDir)) {
      report.clean = false;
      report.missing.push({
        target: target.id,
        item: targetDir,
        reason: 'Target skills directory does not exist',
      });
      continue;
    }

    // Check SOT skills in this target
    for (const [skillName, sotData] of sotSkills.entries()) {
      const targetSkillPath = path.join(targetDir, skillName);
      const targetStat = fs.lstatSync(targetSkillPath, { throwIfNoEntry: false });

      if (!targetStat) {
        report.clean = false;
        report.missing.push({
          target: target.id,
          skill: skillName,
          reason: 'Skill is missing from target directory',
        });
        continue;
      }

      if (targetStat.isSymbolicLink()) {
        try {
          fs.realpathSync(targetSkillPath);
        } catch {
          report.clean = false;
          report.brokenLinks.push({
            target: target.id,
            skill: skillName,
            path: targetSkillPath,
            reason: 'Broken symbolic link',
          });
          continue;
        }
      }

      // Verify file hashes for this skill
      for (const [relFile, expectedHash] of sotData.fileHashes.entries()) {
        const targetFilePath = path.join(targetSkillPath, relFile);
        if (!fs.existsSync(targetFilePath)) {
          report.clean = false;
          report.missing.push({
            target: target.id,
            skill: skillName,
            file: relFile,
            reason: 'File missing from target skill',
          });
          continue;
        }

        const actualHash = hashFile(targetFilePath);
        if (actualHash !== expectedHash) {
          report.clean = false;
          report.mismatches.push({
            target: target.id,
            skill: skillName,
            file: relFile,
            expectedHash,
            actualHash,
          });
        }
      }

      // Check for orphan files within the target skill directory
      const targetFiles = getAllFiles(targetSkillPath);
      for (const relFile of targetFiles) {
        if (!sotData.fileHashes.has(relFile)) {
          report.clean = false;
          report.orphans.push({
            target: target.id,
            skill: skillName,
            file: relFile,
            reason: 'File exists in target skill but not in master SOT',
          });
        }
      }
    }

    // Check for orphan skills in target directory
    if (target.checkOrphans) {
      const targetEntries = fs.readdirSync(targetDir, { withFileTypes: true });
      for (const entry of targetEntries) {
        if (target.allowedNonSkillFiles && target.allowedNonSkillFiles.includes(entry.name)) {
          continue;
        }
        if (!sotSkills.has(entry.name)) {
          report.clean = false;
          report.orphans.push({
            target: target.id,
            skill: entry.name,
            reason: 'Skill exists in target but not in master SOT',
          });
        }
      }
    }

    // Check for broken links in target directory
    if (target.checkBrokenLinks) {
      const targetEntries = fs.readdirSync(targetDir);
      for (const entry of targetEntries) {
        const entryPath = path.join(targetDir, entry);
        const stat = fs.lstatSync(entryPath, { throwIfNoEntry: false });
        if (stat && stat.isSymbolicLink()) {
          try {
            fs.realpathSync(entryPath);
          } catch {
            report.clean = false;
            report.brokenLinks.push({
              target: target.id,
              skill: entry,
              path: entryPath,
              reason: 'Broken symbolic link in skills directory',
            });
          }
        }
      }
    }
  }

  return report;
}

function main() {
  console.log('==> [just-works-kernel] Running Drift Check Across Skill Targets');
  console.log(`    Master SOT: ${SOT_SKILLS_DIR}`);

  const report = checkDrift();
  console.log(`    Checked ${report.sotSkillsCount} master skills against 3 target environments.`);

  if (!report.clean) {
    console.error('\n❌ Drift detected:');

    if (report.missing.length > 0) {
      console.error(`\n  [Missing Skills/Files] (${report.missing.length}):`);
      for (const m of report.missing) {
        console.error(`    - [${m.target}] ${m.skill || m.item}${m.file ? '/' + m.file : ''}: ${m.reason}`);
      }
    }

    if (report.mismatches.length > 0) {
      console.error(`\n  [Hash Mismatches] (${report.mismatches.length}):`);
      for (const mis of report.mismatches) {
        console.error(`    - [${mis.target}] ${mis.skill}/${mis.file} (expected: ${mis.expectedHash.slice(0, 8)}, actual: ${mis.actualHash ? mis.actualHash.slice(0, 8) : 'null'})`);
      }
    }

    if (report.orphans.length > 0) {
      console.error(`\n  [Orphan Files/Skills] (${report.orphans.length}):`);
      for (const o of report.orphans) {
        console.error(`    - [${o.target}] ${o.skill}${o.file ? '/' + o.file : ''}: ${o.reason}`);
      }
    }

    if (report.brokenLinks.length > 0) {
      console.error(`\n  [Broken Symlinks] (${report.brokenLinks.length}):`);
      for (const b of report.brokenLinks) {
        console.error(`    - [${b.target}] ${b.skill} (${b.path}): ${b.reason}`);
      }
    }

    console.error('\nDrift check failed. Run `node scripts/sync.mjs` to synchronize targets.');
    process.exit(1);
  }

  console.log('\n✅ [CLEAN] Zero drift detected across all skill destinations.');
  process.exit(0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}
