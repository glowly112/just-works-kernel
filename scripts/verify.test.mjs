import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    failedTests++;
    console.error(`  FAIL: ${message}`);
    throw new Error(message);
  }
  passedTests++;
  console.log(`  PASS: ${message}`);
}

function runSection(title, fn) {
  console.log(`\n--- [Test Section] ${title} ---`);
  try {
    fn();
  } catch (err) {
    console.error(`Section "${title}" encountered failure:`, err.message);
  }
}

// 1. Verify Rules
runSection('Rules Verification', () => {
  const rulesDir = path.join(REPO_ROOT, 'rules');
  assert(fs.existsSync(rulesDir), 'rules/ directory exists');

  const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.mdc'));
  assert(ruleFiles.length === 5, `Expected 5 rules, found ${ruleFiles.length}`);

  const expectedRules = [
    'driver-discipline.mdc',
    'mv-parity.mdc',
    'mv-seat-map.mdc',
    'session-freshness.mdc',
    'works-app-builder.mdc',
  ];

  for (const expected of expectedRules) {
    const rulePath = path.join(rulesDir, expected);
    assert(fs.existsSync(rulePath), `Rule exists: ${expected}`);
    const content = fs.readFileSync(rulePath, 'utf8');
    assert(content.includes('description:'), `Rule ${expected} has frontmatter description`);
    assert(content.includes('alwaysApply:'), `Rule ${expected} has frontmatter alwaysApply`);
    assert(content.trim().length > 100, `Rule ${expected} has substantial content`);
  }
});

// 2. Verify Skills
runSection('Skills Verification', () => {
  const skillsDir = path.join(REPO_ROOT, 'skills');
  assert(fs.existsSync(skillsDir), 'skills/ directory exists');

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const skillDirs = entries.filter(e => e.isDirectory());
  
  assert(skillDirs.length === 67, `Expected 67 skill directories, found ${skillDirs.length}`);

  for (const dir of skillDirs) {
    const skillPath = path.join(skillsDir, dir.name, 'SKILL.md');
    assert(fs.existsSync(skillPath), `Skill file exists: skills/${dir.name}/SKILL.md`);
    const content = fs.readFileSync(skillPath, 'utf8');
    assert(content.trim().length > 20, `Skill ${dir.name} is non-empty`);
  }
});

// 3. Verify Scripts Syntax
runSection('Scripts Syntax Check', () => {
  const installSh = path.join(REPO_ROOT, 'scripts', 'install.sh');
  const cloudInstallSh = path.join(REPO_ROOT, 'scripts', 'cloud-install.sh');

  assert(fs.existsSync(installSh), 'scripts/install.sh exists');
  assert(fs.existsSync(cloudInstallSh), 'scripts/cloud-install.sh exists');

  const installCheck = spawnSync('bash', ['-n', installSh], { encoding: 'utf8' });
  assert(installCheck.status === 0, 'scripts/install.sh passes bash syntax check');

  const cloudCheck = spawnSync('bash', ['-n', cloudInstallSh], { encoding: 'utf8' });
  assert(cloudCheck.status === 0, 'scripts/cloud-install.sh passes bash syntax check');
});

// 4. Test Idempotent Installation with Mock CURSOR_HOME
runSection('Installation Execution and Idempotency', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cursor-test-'));
  const installSh = path.join(REPO_ROOT, 'scripts', 'install.sh');

  try {
    // First run
    const res1 = spawnSync('bash', [installSh], {
      env: { ...process.env, CURSOR_HOME: tmpDir },
      encoding: 'utf8'
    });
    assert(res1.status === 0, `First install run succeeded (exit code ${res1.status})`);

    const installedRules = fs.readdirSync(path.join(tmpDir, 'rules'));
    assert(installedRules.length === 5, `Installed 5 rules in target, found ${installedRules.length}`);

    const installedSkills = fs.readdirSync(path.join(tmpDir, 'skills-cursor'));
    assert(installedSkills.length === 67, `Installed 67 skills in target, found ${installedSkills.length}`);

    // Verify symlink resolution
    const sampleSkillTarget = path.join(tmpDir, 'skills-cursor', 'just-works', 'SKILL.md');
    assert(fs.existsSync(sampleSkillTarget), 'Sample symlinked skill resolves properly');

    const sampleRuleTarget = path.join(tmpDir, 'rules', 'driver-discipline.mdc');
    assert(fs.existsSync(sampleRuleTarget), 'Sample symlinked rule resolves properly');

    // Second run (Idempotency check)
    const res2 = spawnSync('bash', [installSh], {
      env: { ...process.env, CURSOR_HOME: tmpDir },
      encoding: 'utf8'
    });
    assert(res2.status === 0, `Second (idempotent) install run succeeded (exit code ${res2.status})`);

    const postRules = fs.readdirSync(path.join(tmpDir, 'rules'));
    const postSkills = fs.readdirSync(path.join(tmpDir, 'skills-cursor'));
    assert(postRules.length === 5, 'Rule count remains 5 after second run');
    assert(postSkills.length === 67, 'Skill count remains 67 after second run');

  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// Summary
console.log('\n======================================');
console.log(`Test Summary: ${passedTests}/${totalTests} passed, ${failedTests} failed.`);
console.log('======================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('All verification checks passed successfully!');
  process.exit(0);
}
