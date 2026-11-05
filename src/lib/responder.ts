import { Scheme, UserProfile } from '../types';
import { MOCK_SCHEMES } from '../data/schemes';

export interface BotResponseResult {
  text: string;
  schemes?: Scheme[];
  actionButton?: {
    label: string;
    route: string;
  };
  isSafetyWarning?: boolean;
}

/**
 * Local rule-based responder for Scheme Saathi, checked strictly in order.
 */
export function generateLocalReply(
  userQuery: string,
  userProfile?: UserProfile | null
): BotResponseResult {
  const query = userQuery.toLowerCase().trim();

  // Safety, checked first:
  // A request for an Aadhaar number, OTP, bank account number or password
  const hasAadhaar = query.includes('aadhaar');
  const hasOtp = /\botp\b/i.test(query);
  const hasBankAccount = query.includes('bank account') || query.includes('account number') || query.includes('acct number');
  const hasPassword = query.includes('password') || query.includes('pin code') || query.includes('passcode');

  if (
    query.includes('aadhaar number') ||
    query.includes('aadhaar no') ||
    query.includes('my aadhaar') ||
    query.includes('what is my aadhaar') ||
    hasOtp ||
    hasBankAccount ||
    hasPassword ||
    (hasAadhaar && (query.includes('number') || query.includes('details') || query.includes('card number')))
  ) {
    return {
      text: 'Please never share your Aadhaar number, OTP, bank account or passwords in chat. Scheme Saathi will never ask for them.',
      isSafetyWarning: true,
    };
  }

  // 1. Greeting (hi, hello, namaste)
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query.startsWith('hi ') ||
    query.startsWith('hello ') ||
    query.startsWith('hey ') ||
    query.includes('namaste') ||
    query.includes('vanakkam') ||
    query.includes('namaskara')
  ) {
    return {
      text: 'Namaste! I am Scheme Saathi. Ask me about Indian government schemes, check your eligibility, or see required documents.',
    };
  }

  // 2. Eligibility, "check my eligibility"
  if (
    query.includes('eligibility') ||
    query.includes('eligible') ||
    query.includes('check my') ||
    query.includes('qualify') ||
    query.includes('can i apply')
  ) {
    return {
      text: "Let's check. Answer a few questions and I'll show schemes you may qualify for.",
      actionButton: {
        label: 'Start eligibility check',
        route: '/eligibility',
      },
    };
  }

  // 3. Documents, papers, proof
  if (
    query.includes('document') ||
    query.includes('documents') ||
    query.includes('paper') ||
    query.includes('papers') ||
    query.includes('proof') ||
    query.includes('doc')
  ) {
    if (query.includes('kisan') || query.includes('pm-kisan') || query.includes('pm kisan')) {
      const pmKisan = MOCK_SCHEMES.find((s) => s.id === 'pm-kisan');
      return {
        text: `For PM-KISAN Samman Nidhi, the required documents are:
• Aadhaar (identity proof)
• Land records (confirming cultivable agricultural land)
• Bank passbook (with Aadhaar seeding and DBT enabled)

Please confirm details on the official site.`,
        schemes: pmKisan ? [pmKisan] : [],
      };
    }

    if (query.includes('scholarship') || query.includes('student') || query.includes('nsp')) {
      const nsp = MOCK_SCHEMES.find((s) => s.id === 'national-scholarship');
      return {
        text: `For the National Scholarship Portal, the required documents are:
• Aadhaar
• Marksheets / educational certificates
• Income certificate
• Bank passbook

Please confirm details on the official site.`,
        schemes: nsp ? [nsp] : [],
      };
    }

    if (query.includes('mudra') || query.includes('business') || query.includes('loan')) {
      const mudra = MOCK_SCHEMES.find((s) => s.id === 'pm-mudra');
      return {
        text: `For PM Mudra Yojana small business loans, the required documents are:
• Aadhaar
• PAN
• Business plan
• Bank statements

Please confirm details on the official site.`,
        schemes: mudra ? [mudra] : [],
      };
    }

    if (query.includes('ayushman') || query.includes('health') || query.includes('hospital')) {
      const ayushman = MOCK_SCHEMES.find((s) => s.id === 'ayushman-bharat');
      return {
        text: `For Ayushman Bharat (PM-JAY), the required documents are:
• Aadhaar
• Ration card
• Mobile number

Please confirm details on the official site.`,
        schemes: ayushman ? [ayushman] : [],
      };
    }

    if (query.includes('awas') || query.includes('house') || query.includes('housing')) {
      const awas = MOCK_SCHEMES.find((s) => s.id === 'pm-awas');
      return {
        text: `For PM Awas Yojana, the required documents are:
• Aadhaar
• Income certificate
• Bank passbook

Please confirm details on the official site.`,
        schemes: awas ? [awas] : [],
      };
    }

    if (query.includes('atal') || query.includes('pension')) {
      const apy = MOCK_SCHEMES.find((s) => s.id === 'atal-pension');
      return {
        text: `For Atal Pension Yojana, the required documents are:
• Aadhaar
• Bank account
• Mobile number

Please confirm details on the official site.`,
        schemes: apy ? [apy] : [],
      };
    }

    const isFarmer = userProfile?.categories?.includes('Farmer') || userProfile?.occupation === 'Farmer';
    const isStudent = userProfile?.categories?.includes('Student') || userProfile?.occupation === 'Student';
    const isBiz = userProfile?.categories?.includes('Small business owner') || userProfile?.occupation === 'Business owner';

    let specificText = '';
    if (isFarmer) {
      specificText = 'For farmer schemes like PM-KISAN: Aadhaar, land records, and an Aadhaar-linked bank passbook.\n\n';
    } else if (isStudent) {
      specificText = 'For student scholarships: Aadhaar, marksheets, income certificate, and bank passbook.\n\n';
    } else if (isBiz) {
      specificText = 'For small business & Mudra loans: Aadhaar, PAN, business plan, and bank statements.\n\n';
    }

    return {
      text: `${specificText}Common documents required for most central and state government schemes include:
• Aadhaar
• Bank passbook (with Aadhaar seeding/DBT enabled)
• Income proof / certificate
• Address proof / Ration card
• Land records (for agricultural schemes)

Please confirm details on the official site.`,
    };
  }

  // Profile category rule: If profile category is Farmer, show farmer schemes first for generic questions
  const isProfileFarmer = userProfile?.categories?.includes('Farmer') || userProfile?.occupation === 'Farmer';
  const isGenericSchemeQuery =
    query === 'schemes' ||
    query === 'all schemes' ||
    query === 'show schemes' ||
    query === 'what schemes' ||
    query === 'help me with schemes' ||
    query === 'government schemes';

  if (isProfileFarmer && isGenericSchemeQuery) {
    const pmKisan = MOCK_SCHEMES.find((s) => s.id === 'pm-kisan');
    return {
      text: `Based on your farmer profile, PM-KISAN Samman Nidhi provides direct income assistance to landholding farmer families. Farmers can also benefit from comprehensive crop insurance under PM Fasal Bima Yojana and concessional institutional credit through Kisan Credit Card.

Please confirm details on the official site.`,
      schemes: pmKisan ? [pmKisan] : [],
    };
  }

  // 4. Farmer, farm, kisan, land
  if (
    query.includes('farmer') ||
    query.includes('farm') ||
    query.includes('kisan') ||
    query.includes('land') ||
    query.includes('agriculture') ||
    query.includes('crop')
  ) {
    const pmKisan = MOCK_SCHEMES.find((s) => s.id === 'pm-kisan');
    return {
      text: `PM-KISAN Samman Nidhi provides direct income assistance to landholding farmer families. Farmers can also benefit from comprehensive crop insurance under PM Fasal Bima Yojana and concessional institutional credit through Kisan Credit Card.

Please confirm details on the official site.`,
      schemes: pmKisan ? [pmKisan] : [],
    };
  }

  // 5. Student, scholarship, education
  if (
    query.includes('student') ||
    query.includes('scholarship') ||
    query.includes('education') ||
    query.includes('college') ||
    query.includes('school') ||
    query.includes('fee')
  ) {
    const scholarship = MOCK_SCHEMES.find((s) => s.id === 'national-scholarship');
    return {
      text: `The National Scholarship Portal (NSP) serves as the central digital platform for pre-matric, post-matric, merit-cum-means, and higher education scholarships for students across India.

Please confirm details on the official site.`,
      schemes: scholarship ? [scholarship] : [],
    };
  }

  // 6. Woman, women, entrepreneur, mudra, business, loan
  if (
    query.includes('woman') ||
    query.includes('women') ||
    query.includes('entrepreneur') ||
    query.includes('mudra') ||
    query.includes('business') ||
    query.includes('loan') ||
    query.includes('startup') ||
    query.includes('shop')
  ) {
    const mudra = MOCK_SCHEMES.find((s) => s.id === 'pm-mudra');
    return {
      text: `Pradhan Mantri Mudra Yojana offers collateral-free loans for non-corporate, non-farm small businesses and women entrepreneurs.

Please confirm details on the official site.`,
      schemes: mudra ? [mudra] : [],
    };
  }

  // 7. Health, hospital, insurance, ayushman
  if (
    query.includes('health') ||
    query.includes('hospital') ||
    query.includes('insurance') ||
    query.includes('ayushman') ||
    query.includes('medical') ||
    query.includes('doctor')
  ) {
    const ayushman = MOCK_SCHEMES.find((s) => s.id === 'ayushman-bharat');
    return {
      text: `Ayushman Bharat (PM-JAY) provides cashless secondary and tertiary hospitalisation cover up to ₹5 Lakh per year for eligible low-income beneficiary families.

Please confirm details on the official site.`,
      schemes: ayushman ? [ayushman] : [],
    };
  }

  // 8. Housing, house, home, awas
  if (
    query.includes('housing') ||
    query.includes('house') ||
    query.includes('home') ||
    query.includes('awas') ||
    query.includes('shelter') ||
    query.includes('pucca')
  ) {
    const awas = MOCK_SCHEMES.find((s) => s.id === 'pm-awas');
    return {
      text: `Pradhan Mantri Awas Yojana provides financial assistance and interest subventions to help families without a pucca house build or buy a home.

Please confirm details on the official site.`,
      schemes: awas ? [awas] : [],
    };
  }

  // 9. Senior, pension, old age
  if (
    query.includes('senior') ||
    query.includes('pension') ||
    query.includes('old age') ||
    query.includes('elderly') ||
    query.includes('atal')
  ) {
    const pension = MOCK_SCHEMES.find((s) => s.id === 'atal-pension');
    return {
      text: `Atal Pension Yojana provides a guaranteed monthly pension after 60 years of age for unorganised-sector workers who subscribe between the ages of 18 and 40.

Please confirm details on the official site.`,
      schemes: pension ? [pension] : [],
    };
  }

  // 10. Otherwise: Fallback
  return {
    text: `I'm not sure about that from the records I have. Try a scheme name, browse the Scheme library, or check the official portal.

Please confirm details on the official site.`,
    actionButton: {
      label: 'Browse scheme library',
      route: '/library',
    },
  };
}
