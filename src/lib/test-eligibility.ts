import { runEligibilityUnitTests } from './eligibility';

const { allPassed, results } = runEligibilityUnitTests();
console.log(`Unit Tests Summary: ${allPassed ? 'ALL PASSED' : 'FAILURES OCCURRED'}`);
results.forEach((r, idx) => {
  console.log(`[${r.passed ? 'PASS' : 'FAIL'}] Test ${idx + 1}: ${r.testName} - ${r.message}`);
});

if (!allPassed) {
  process.exit(1);
}
