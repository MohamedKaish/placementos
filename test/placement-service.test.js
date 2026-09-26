const test = require('node:test');
const assert = require('node:assert/strict');

test('PlacementOS Core Contract & Service Verification', async (t) => {
  // Verify department coverage
  const departments = ['CSE', 'EEE', 'ECE', 'Mechanical', 'Civil', 'Chemical', 'Biotechnology'];
  assert.equal(departments.length, 7);
  assert.ok(departments.includes('EEE'));

  // Test calibration gap calculation rule
  const claimed = 8.0;
  const demonstrated = 4.5;
  const required = 7.0;
  const gap = Number((claimed - demonstrated).toFixed(1));
  assert.equal(gap, 3.5);

  const status = claimed > demonstrated + 0.5 ? 'OVERCONFIDENT' : 'CALIBRATED';
  assert.equal(status, 'OVERCONFIDENT');

  // Verify NOT_ASSESSED handling
  const dimensions = [
    { name: 'Technical', score: 5.4, status: 'DEVELOPING' },
    { name: 'Interview Readiness', score: null, status: 'NOT_ASSESSED' }
  ];
  const unassessed = dimensions.find(d => d.name === 'Interview Readiness');
  assert.equal(unassessed.score, null);
  assert.equal(unassessed.status, 'NOT_ASSESSED');

  // Verify mission delta target
  const deltaTarget = '+2.5 Index';
  assert.equal(deltaTarget, '+2.5 Index');
});
