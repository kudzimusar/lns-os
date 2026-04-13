/**
 * test-attendance-pipeline.js
 * Isolated unit tests for the predictive risk logic in useAITriggers.
 * Runs with plain Node — no React, no build step required.
 */

// ─── Logic extracted from useAITriggers (Attendance branch) ─────────────────

const LATENESS_RISK_THRESHOLD = 2;

const mockLatenessHistory = {
  '3': 2, // Catherine Great — 2 late incidents
  '1': 1,
};

function detectPredictedRisk(students) {
  const pendingActions = [];
  const triggerId = `trigger-Attendance-${new Date().toLocaleDateString()}`;

  if (pendingActions.some(item => item.id === triggerId)) return null;

  const atRiskStudent = students.find((s) => {
    const lateCount = mockLatenessHistory[s.id] ?? 0;
    return lateCount >= LATENESS_RISK_THRESHOLD && s.status !== 'A';
  });

  if (!atRiskStudent) return null;

  const lateCount = mockLatenessHistory[atRiskStudent.id];
  return {
    id: triggerId,
    type: 'PREDICTED_ABSENCE_RISK',
    severity: 'MEDIUM',
    studentName: atRiskStudent.name,
    generatedAt: new Date().toISOString(),
    status: 'DRAFT',
    content: `AI Prediction: ${atRiskStudent.name} has been late ${lateCount} times this week. Pattern analysis indicates high risk of an upcoming absence. Recommend early parent contact now — before a 3rd incident is recorded.`,
    contentType: 'alert',
    recipient: { name: 'Guardian', id: 'g1', role: 'parent' },
    aiConfidence: 'MEDIUM',
    expiresAt: new Date(Date.now() + 172800000).toISOString(),
  };
}

// ─── Test harness ─────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(label, condition) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

const students = [
  { id: '1', name: 'Abraham Lincoln',   status: 'P' },
  { id: '2', name: 'Benjamin Franklin', status: 'P' },
  { id: '3', name: 'Catherine Great',   status: 'L' }, // ← 2 late incidents, should trigger
  { id: '4', name: 'David Copperfield', status: 'A' },
  { id: '5', name: 'Eleanor Roosevelt', status: 'P' },
];

// ─── Test 1: Fires for student at lateness threshold ─────────────────────────
console.log('\nTest 1: Fires for student at lateness threshold');
{
  const result = detectPredictedRisk(students);
  assert('returns a queue item',            result !== null);
  assert('type is PREDICTED_ABSENCE_RISK',  result?.type === 'PREDICTED_ABSENCE_RISK');
  assert('student is Catherine Great',      result?.studentName === 'Catherine Great');
  assert('severity is MEDIUM',              result?.severity === 'MEDIUM');
  assert('aiConfidence is MEDIUM',          result?.aiConfidence === 'MEDIUM');
  assert('status is DRAFT',                 result?.status === 'DRAFT');
  assert('content mentions lateness count', result?.content.includes('2 times'));
  assert('content is predictive not reactive', result?.content.includes('risk of an upcoming absence'));
}

// ─── Test 2: Does NOT fire when no student meets the threshold ────────────────
console.log('\nTest 2: Does NOT fire when no student meets threshold');
{
  const noRiskStudents = students.map(s => ({ ...s, id: `x${s.id}` })); // ids not in history
  const result = detectPredictedRisk(noRiskStudents);
  assert('returns null', result === null);
}

// ─── Test 3: Skips already-absent students ────────────────────────────────────
console.log('\nTest 3: Skips students already marked absent');
{
  const absentCatherine = students.map(s =>
    s.id === '3' ? { ...s, status: 'A' } : s
  );
  const result = detectPredictedRisk(absentCatherine);
  // Catherine is now absent — should not be flagged for predicted risk
  assert('does not flag already-absent student', result?.studentName !== 'Catherine Great');
}

// ─── Test 4: Below-threshold student is not flagged ──────────────────────────
console.log('\nTest 4: Student with only 1 late incident is not flagged');
{
  // Only Abraham (id=1, lateCount=1) remains after removing Catherine from history
  const limitedHistory = { '1': 1 };
  const originalHistory = Object.assign({}, mockLatenessHistory);
  Object.keys(mockLatenessHistory).forEach(k => delete mockLatenessHistory[k]);
  Object.assign(mockLatenessHistory, limitedHistory);

  const result = detectPredictedRisk(students);
  assert('returns null for sub-threshold lateness', result === null);

  // Restore
  Object.keys(mockLatenessHistory).forEach(k => delete mockLatenessHistory[k]);
  Object.assign(mockLatenessHistory, originalHistory);
}

// ─── Test 5: Output shape is valid ApprovalQueueItem ─────────────────────────
console.log('\nTest 5: Output shape matches ApprovalQueueItem contract');
{
  const result = detectPredictedRisk(students);
  const requiredKeys = ['id', 'type', 'severity', 'studentName', 'generatedAt',
                        'status', 'content', 'contentType', 'recipient',
                        'aiConfidence', 'expiresAt'];
  requiredKeys.forEach(key => {
    assert(`has field: ${key}`, result != null && key in result);
  });
  assert('recipient has name/id/role',
    result?.recipient && 'name' in result.recipient &&
    'id' in result.recipient && 'role' in result.recipient);
}

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
