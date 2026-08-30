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
  const syncMjs = path.join(REPO_ROOT, 'scripts', 'sync.mjs');
  const driftCheckMjs = path.join(REPO_ROOT, 'scripts', 'drift-check.mjs');

  assert(fs.existsSync(installSh), 'scripts/install.sh exists');
  assert(fs.existsSync(cloudInstallSh), 'scripts/cloud-install.sh exists');
  assert(fs.existsSync(syncMjs), 'scripts/sync.mjs exists');
  assert(fs.existsSync(driftCheckMjs), 'scripts/drift-check.mjs exists');

  const installCheck = spawnSync('bash', ['-n', installSh], { encoding: 'utf8' });
  assert(installCheck.status === 0, 'scripts/install.sh passes bash syntax check');

  const cloudCheck = spawnSync('bash', ['-n', cloudInstallSh], { encoding: 'utf8' });
  assert(cloudCheck.status === 0, 'scripts/cloud-install.sh passes bash syntax check');

  const syncCheck = spawnSync('node', ['--check', syncMjs], { encoding: 'utf8' });
  assert(syncCheck.status === 0, 'scripts/sync.mjs passes node syntax check');

  const driftCheck = spawnSync('node', ['--check', driftCheckMjs], { encoding: 'utf8' });
  assert(driftCheck.status === 0, 'scripts/drift-check.mjs passes node syntax check');
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

// 5. Test sync.mjs Execution, Multi-target Symlinks & SOT Validation
runSection('Sync Execution and SOT Target Validation', () => {
  const syncMjs = path.join(REPO_ROOT, 'scripts', 'sync.mjs');
  const mockBase = fs.mkdtempSync(path.join(os.tmpdir(), 'kernel-sync-test-'));
  const mockCursorHome = path.join(mockBase, 'cursor');
  const mockGrokHome = path.join(mockBase, 'grok');
  const mockMultivibeRoot = path.join(mockBase, 'multivibe');

  try {
    const testEnv = {
      ...process.env,
      CURSOR_HOME: mockCursorHome,
      GROK_HOME: mockGrokHome,
      MULTIVIBE_ROOT: mockMultivibeRoot,
    };

    // First sync run via CLI
    const syncRes1 = spawnSync('node', [syncMjs], {
      env: testEnv,
      encoding: 'utf8',
    });
    assert(syncRes1.status === 0, `sync.mjs CLI execution succeeded (exit code ${syncRes1.status})`);

    // Verify rules targets
    const cursorRules = fs.readdirSync(path.join(mockCursorHome, 'rules'));
    assert(cursorRules.length === 5, `Cursor rules count is 5 (found ${cursorRules.length})`);

    const mvRules = fs.readdirSync(path.join(mockMultivibeRoot, 'docs', 'cursor-setup', 'rules'));
    assert(mvRules.length === 5, `Multivibe rules count is 5 (found ${mvRules.length})`);

    // Verify skills targets
    const cursorSkills = fs.readdirSync(path.join(mockCursorHome, 'skills-cursor'));
    assert(cursorSkills.length === 67, `Cursor skills count is 67 (found ${cursorSkills.length})`);

    const grokSkills = fs.readdirSync(path.join(mockGrokHome, 'skills'));
    assert(grokSkills.length === 67, `Grok skills count is 67 (found ${grokSkills.length})`);

    const mvSkills = fs.readdirSync(path.join(mockMultivibeRoot, 'skills'));
    assert(mvSkills.length === 67, `Multivibe skills count is 67 (found ${mvSkills.length})`);

    // Verify canonical SOT realpath resolution
    const sampleSkillPath = path.join(mockCursorHome, 'skills-cursor', 'just-works');
    const realSampleSkill = fs.realpathSync(sampleSkillPath);
    assert(realSampleSkill === path.join(REPO_ROOT, 'skills', 'just-works'), 'Target skill resolves to canonical SOT in just-works-kernel');

    const sampleRulePath = path.join(mockMultivibeRoot, 'docs', 'cursor-setup', 'rules', 'driver-discipline.mdc');
    const realSampleRule = fs.realpathSync(sampleRulePath);
    assert(realSampleRule === path.join(REPO_ROOT, 'rules', 'driver-discipline.mdc'), 'Target rule resolves to canonical SOT in just-works-kernel');

    // Idempotency: second run
    const syncRes2 = spawnSync('node', [syncMjs], {
      env: testEnv,
      encoding: 'utf8',
    });
    assert(syncRes2.status === 0, `sync.mjs second run succeeded idempotently (exit code ${syncRes2.status})`);

  } finally {
    fs.rmSync(mockBase, { recursive: true, force: true });
  }
});

// 6. Test drift-check.mjs (Clean State, Hash Mismatches, Orphans, Missing Skills)
runSection('Drift Detection and Mismatch/Orphan Reporting', () => {
  const syncMjs = path.join(REPO_ROOT, 'scripts', 'sync.mjs');
  const driftCheckMjs = path.join(REPO_ROOT, 'scripts', 'drift-check.mjs');
  const mockBase = fs.mkdtempSync(path.join(os.tmpdir(), 'kernel-drift-test-'));
  const mockCursorHome = path.join(mockBase, 'cursor');
  const mockGrokHome = path.join(mockBase, 'grok');
  const mockMultivibeRoot = path.join(mockBase, 'multivibe');

  try {
    const testEnv = {
      ...process.env,
      CURSOR_HOME: mockCursorHome,
      GROK_HOME: mockGrokHome,
      MULTIVIBE_ROOT: mockMultivibeRoot,
    };

    // Initial sync to set up clean targets
    const syncRes = spawnSync('node', [syncMjs], { env: testEnv, encoding: 'utf8' });
    assert(syncRes.status === 0, 'Sync created baseline clean target environment');

    // Test 1: Clean state check
    const cleanCheck = spawnSync('node', [driftCheckMjs], { env: testEnv, encoding: 'utf8' });
    assert(cleanCheck.status === 0, 'drift-check.mjs returns exit 0 on clean synced environment');
    assert(cleanCheck.stdout.includes('Zero drift detected'), 'drift-check.mjs reports zero drift');

    // Test 2: Drift via modified/mutated skill content (hash mismatch)
    const mvSkillTarget = path.join(mockMultivibeRoot, 'skills', 'just-works');
    fs.unlinkSync(mvSkillTarget); // unlink symlink
    fs.mkdirSync(mvSkillTarget, { recursive: true });
    fs.writeFileSync(path.join(mvSkillTarget, 'SKILL.md'), '# Drifted Modified Content\n');

    const driftMismatchCheck = spawnSync('node', [driftCheckMjs], { env: testEnv, encoding: 'utf8' });
    assert(driftMismatchCheck.status === 1, 'drift-check.mjs returns exit 1 when skill content hash drifts');
    assert(driftMismatchCheck.stderr.includes('Hash Mismatches') || driftMismatchCheck.stdout.includes('Hash Mismatches') || driftMismatchCheck.stderr.includes('Drift detected'), 'drift-check.mjs reports hash mismatch drift');

    // Restore clean state
    spawnSync('node', [syncMjs], { env: testEnv, encoding: 'utf8' });

    // Test 3: Drift via orphan skill in target
    const orphanSkillDir = path.join(mockMultivibeRoot, 'skills', 'rogue-orphan-skill');
    fs.mkdirSync(orphanSkillDir, { recursive: true });
    fs.writeFileSync(path.join(orphanSkillDir, 'SKILL.md'), '# Rogue\n');

    const driftOrphanCheck = spawnSync('node', [driftCheckMjs], { env: testEnv, encoding: 'utf8' });
    assert(driftOrphanCheck.status === 1, 'drift-check.mjs returns exit 1 on orphan skill');
    assert(driftOrphanCheck.stderr.includes('Orphan') || driftOrphanCheck.stdout.includes('Orphan'), 'drift-check.mjs reports orphan skill');

    // Restore clean state
    fs.rmSync(orphanSkillDir, { recursive: true, force: true });
    spawnSync('node', [syncMjs], { env: testEnv, encoding: 'utf8' });

    // Test 4: Drift via missing skill in target
    const targetToDelete = path.join(mockGrokHome, 'skills', 'auth');
    fs.unlinkSync(targetToDelete);

    const driftMissingCheck = spawnSync('node', [driftCheckMjs], { env: testEnv, encoding: 'utf8' });
    assert(driftMissingCheck.status === 1, 'drift-check.mjs returns exit 1 on missing skill');
    assert(driftMissingCheck.stderr.includes('Missing Skills') || driftMissingCheck.stdout.includes('Missing Skills') || driftMissingCheck.stderr.includes('Drift detected'), 'drift-check.mjs reports missing skill');

  } finally {
    fs.rmSync(mockBase, { recursive: true, force: true });
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
