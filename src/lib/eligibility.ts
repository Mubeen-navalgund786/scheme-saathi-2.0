import { Scheme, EligibilityAnswers, EligibilityResult, EligibilityStatus } from '../types';
import { MOCK_SCHEMES } from '../data/schemes';

/**
 * Pure function to evaluate a citizen's eligibility across all schemes.
 */
export function evaluateEligibility(
  answers: EligibilityAnswers,
  schemes: Scheme[] = MOCK_SCHEMES
): EligibilityResult[] {
  const results: EligibilityResult[] = [];

  for (const scheme of schemes) {
    let status: EligibilityStatus = 'Check eligibility';
    const reasons: string[] = [];
    let score = 2; // base score for Check eligibility

    switch (scheme.id) {
      case 'pm-kisan': {
        const isFarmer = answers.occupation === 'Farmer';
        const ownsLand = answers.ownsAgriculturalLand === true;
        const hasFarmerCategory = answers.categories?.includes('Farmer');

        if (isFarmer || ownsLand) {
          status = 'Likely eligible';
          score = 3;
          if (isFarmer && ownsLand) {
            reasons.push('You indicated farming as your occupation and ownership of agricultural land.');
          } else if (ownsLand) {
            reasons.push('You own agricultural land, meeting the core PM-KISAN family requirement.');
          } else {
            reasons.push('You work in farming; land records and e-KYC will qualify your family.');
          }
        } else {
          status = 'Not eligible';
          score = 1;
          reasons.push('PM-KISAN strictly requires holding cultivable agricultural land.');
        }

        if (hasFarmerCategory) score += 0.5;
        break;
      }

      case 'national-scholarship': {
        const isStudent = answers.occupation === 'Student';
        const hasStudentCat = answers.categories?.includes('Student');
        const age = answers.age;

        if (isStudent && age !== undefined && age >= 15 && age <= 35) {
          status = 'Likely eligible';
          score = 3;
          reasons.push(`You are a student aged ${age}, within the recognized 15 to 35 scholarship bracket.`);
        } else if (isStudent) {
          status = 'Check eligibility';
          score = 2;
          if (age === undefined) {
            reasons.push('You are a student; confirm your age matches specific state or central scholarship guidelines.');
          } else {
            reasons.push(`At age ${age}, verify if specific higher education or research scholarships apply.`);
          }
        } else if (hasStudentCat) {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Student category selected; requires enrollment in an accredited institution.');
        } else {
          status = 'Not eligible';
          score = 1;
          reasons.push('Active enrollment as a student in a recognized institution is required.');
        }

        if (hasStudentCat) score += 0.5;
        break;
      }

      case 'pm-mudra': {
        const isBiz = answers.occupation === 'Business owner';
        const isOther = answers.occupation === 'Other';
        const hasBizCat = answers.categories?.includes('Small business owner');
        const hasWomanCat = answers.categories?.includes('Woman');

        if (isBiz || isOther) {
          status = 'Likely eligible';
          score = 3;
          reasons.push('Mudra loans provide collateral-free credit up to ₹10 Lakh for small enterprise & trade.');
          if (hasWomanCat) {
            reasons.push('Special interest concessions and Mudra Tarun/Kishor schemes favor women entrepreneurs.');
          }
        } else if (hasBizCat) {
          status = 'Likely eligible';
          score = 3;
          reasons.push('Small business category selected; eligible across Shishu, Kishor, and Tarun loan tiers.');
        } else {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Eligible if planning to establish a non-farm manufacturing, trading, or service enterprise.');
        }

        if (hasBizCat) score += 0.5;
        break;
      }

      case 'atal-pension': {
        const age = answers.age;
        const hasSeniorCat = answers.categories?.includes('Senior citizen');

        if (age !== undefined) {
          if (age >= 18 && age <= 40) {
            status = 'Likely eligible';
            score = 3;
            reasons.push(`At age ${age}, you are in the 18 to 40 subscriber window to guarantee ₹1,000–₹5,000 monthly pension at 60.`);
          } else if (age > 40) {
            status = 'Not eligible';
            score = 1;
            reasons.push(`At age ${age}, you exceed the strict maximum entry age limit of 40 years for APY.`);
          } else {
            status = 'Not eligible';
            score = 1;
            reasons.push(`At age ${age}, you must be at least 18 years old to subscribe.`);
          }
        } else {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Requires entry age between 18 and 40 years and a savings bank account.');
        }

        if (hasSeniorCat && status !== 'Not eligible') score += 0.5;
        break;
      }

      case 'ayushman-bharat': {
        const income = answers.incomeRange;
        const isAbove3Lakh = income === '3 to 8 lakh' || income === 'above 8 lakh';

        if (income === 'below 1 lakh' || income === '1 to 3 lakh') {
          status = 'Likely eligible';
          score = 3;
          reasons.push('Your stated annual income is ₹3 Lakh or below, meeting low-income health cover guidelines.');
        } else if (isAbove3Lakh) {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Income exceeds ₹3 Lakh; coverage depends on state-specific top-up criteria or SECC inclusion.');
        } else {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Eligibility is verified through ration card and official SECC beneficiary database.');
        }
        break;
      }

      case 'pm-awas': {
        const income = answers.incomeRange;
        const isAbove3Lakh = income === '3 to 8 lakh' || income === 'above 8 lakh';

        if (income === 'below 1 lakh' || income === '1 to 3 lakh') {
          status = 'Likely eligible';
          score = 3;
          reasons.push('Income qualifies under EWS/LIG assistance for pucca housing subsidies.');
        } else if (isAbove3Lakh) {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Income is above ₹3 Lakh; subsidy depends on MIG interest subvention tiers and not owning a pucca house.');
        } else {
          status = 'Check eligibility';
          score = 2;
          reasons.push('Applicant family must not own an existing pucca house anywhere in India.');
        }
        break;
      }

      default:
        status = 'Check eligibility';
        score = 2;
        reasons.push('Review specific guidelines on the official portal.');
    }

    results.push({
      scheme,
      status,
      reasons,
      score,
    });
  }

  // Rank by score descending, with Likely eligible first, then Check eligibility, then Not eligible
  return results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.scheme.name.localeCompare(b.scheme.name);
  });
}

/**
 * Unit test suite for eligibility pure function
 */
export function runEligibilityUnitTests(): {
  allPassed: boolean;
  results: Array<{ testName: string; passed: boolean; message: string }>;
} {
  const tests: Array<{ testName: string; passed: boolean; message: string }> = [];

  // Test 1: Farmer with land -> PM-KISAN Likely eligible
  const t1 = evaluateEligibility({
    occupation: 'Farmer',
    ownsAgriculturalLand: true,
    categories: ['Farmer'],
  });
  const pmKisan1 = t1.find((r) => r.scheme.id === 'pm-kisan');
  tests.push({
    testName: 'Farmer with land -> PM-KISAN Likely eligible',
    passed: pmKisan1?.status === 'Likely eligible',
    message: `Expected "Likely eligible", got "${pmKisan1?.status}"`,
  });

  // Test 2: Non-farmer without land -> PM-KISAN Not eligible
  const t2 = evaluateEligibility({
    occupation: 'Student',
    ownsAgriculturalLand: false,
    categories: ['Student'],
  });
  const pmKisan2 = t2.find((r) => r.scheme.id === 'pm-kisan');
  tests.push({
    testName: 'Student without land -> PM-KISAN Not eligible',
    passed: pmKisan2?.status === 'Not eligible',
    message: `Expected "Not eligible", got "${pmKisan2?.status}"`,
  });

  // Test 3: Student aged 20 -> Scholarship Likely eligible
  const t3 = evaluateEligibility({
    occupation: 'Student',
    age: 20,
    categories: ['Student'],
  });
  const scholarship3 = t3.find((r) => r.scheme.id === 'national-scholarship');
  tests.push({
    testName: 'Student aged 20 -> National Scholarship Likely eligible',
    passed: scholarship3?.status === 'Likely eligible',
    message: `Expected "Likely eligible", got "${scholarship3?.status}"`,
  });

  // Test 4: Business owner -> PM Mudra Likely eligible
  const t4 = evaluateEligibility({
    occupation: 'Business owner',
    categories: ['Small business owner'],
  });
  const mudra4 = t4.find((r) => r.scheme.id === 'pm-mudra');
  tests.push({
    testName: 'Business owner -> PM Mudra Likely eligible',
    passed: mudra4?.status === 'Likely eligible',
    message: `Expected "Likely eligible", got "${mudra4?.status}"`,
  });

  // Test 5: Age 28 -> Atal Pension Likely eligible (18-40)
  const t5 = evaluateEligibility({
    age: 28,
    categories: ['Senior citizen'],
  });
  const ap5 = t5.find((r) => r.scheme.id === 'atal-pension');
  tests.push({
    testName: 'Age 28 -> Atal Pension Likely eligible',
    passed: ap5?.status === 'Likely eligible',
    message: `Expected "Likely eligible", got "${ap5?.status}"`,
  });

  // Test 6: Age 55 -> Atal Pension Not eligible (>40)
  const t6 = evaluateEligibility({
    age: 55,
    categories: ['Senior citizen'],
  });
  const ap6 = t6.find((r) => r.scheme.id === 'atal-pension');
  tests.push({
    testName: 'Age 55 -> Atal Pension Not eligible (over 40)',
    passed: ap6?.status === 'Not eligible',
    message: `Expected "Not eligible", got "${ap6?.status}"`,
  });

  // Test 7: Income above 3 lakh -> Health & Housing Check eligibility
  const t7 = evaluateEligibility({
    incomeRange: '3 to 8 lakh',
    categories: ['Other'],
  });
  const health7 = t7.find((r) => r.scheme.id === 'ayushman-bharat');
  const housing7 = t7.find((r) => r.scheme.id === 'pm-awas');
  tests.push({
    testName: 'Income 3 to 8 lakh -> Health Check eligibility',
    passed: health7?.status === 'Check eligibility',
    message: `Expected "Check eligibility", got "${health7?.status}"`,
  });
  tests.push({
    testName: 'Income 3 to 8 lakh -> Housing Check eligibility',
    passed: housing7?.status === 'Check eligibility',
    message: `Expected "Check eligibility", got "${housing7?.status}"`,
  });

  // Test 8: Income below 1 lakh -> Health & Housing Likely eligible
  const t8 = evaluateEligibility({
    incomeRange: 'below 1 lakh',
    categories: ['Other'],
  });
  const health8 = t8.find((r) => r.scheme.id === 'ayushman-bharat');
  const housing8 = t8.find((r) => r.scheme.id === 'pm-awas');
  tests.push({
    testName: 'Income below 1 lakh -> Health Likely eligible',
    passed: health8?.status === 'Likely eligible',
    message: `Expected "Likely eligible", got "${health8?.status}"`,
  });
  tests.push({
    testName: 'Income below 1 lakh -> Housing Likely eligible',
    passed: housing8?.status === 'Likely eligible',
    message: `Expected "Likely eligible", got "${housing8?.status}"`,
  });

  const allPassed = tests.every((t) => t.passed);
  return { allPassed, results: tests };
}
