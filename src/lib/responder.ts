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
 * Local rule-based responder for Scheme Saathi
 */
export function generateLocalReply(
  userQuery: string,
  userProfile?: UserProfile | null
): BotResponseResult {
  const query = userQuery.toLowerCase().trim();

  // Safety rule check: Aadhaar number, OTP, bank account number, or password
  const sensitivePatterns = [
    /aadhaar(\s+card|\s+number|\s+no|\s+details)?/i,
    /\botp\b/i,
    /bank\s*(account|acct|details|number|no|passcode)/i,
    /password|pin\s*code|cvv|secret/i,
  ];

  // If user asks for or pastes sensitive credentials
  const asksForCredentials = sensitivePatterns.some((regex) => regex.test(query));
  // Specifically trigger if it asks for OTP, password, account or aadhaar number
  if (
    query.includes('aadhaar number') ||
    query.includes('aadhaar no') ||
    query.includes('my aadhaar') ||
    query.includes('otp') ||
    query.includes('bank account') ||
    query.includes('password') ||
    query.includes('pin') ||
    asksForCredentials && (query.includes('number') || query.includes('otp') || query.includes('pass') || query.includes('card'))
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
    query.startsWith('hi ') ||
    query.startsWith('hello ') ||
    query.includes('namaste') ||
    query.includes('vanakkam') ||
    query.includes('namaskara') ||
    query === 'hey' ||
    query.startsWith('hey ')
  ) {
    const userName = userProfile?.name ? ` ${userProfile.name}` : '';
    return {
      text: `Namaste${userName}! I am Scheme Saathi. You can ask me about schemes for your profession or family, check your eligibility in a few quick steps, or ask for the documents needed. Try tapping any suggestion chip below to begin.`,
    };
  }

  // 2. Eligibility or "check my eligibility"
  if (
    query.includes('eligibility') ||
    query.includes('eligible') ||
    query.includes('check my') ||
    query.includes('qualify') ||
    query.includes('check eligibility') ||
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

  // 3. Documents ("documents", "papers", "proof")
  if (
    query.includes('document') ||
    query.includes('documents') ||
    query.includes('paper') ||
    query.includes('papers') ||
    query.includes('proof') ||
    query.includes('doc')
  ) {
    const isFarmer = userProfile?.categories?.includes('Farmer') || userProfile?.occupation === 'Farmer';
    const isStudent = userProfile?.categories?.includes('Student') || userProfile?.occupation === 'Student';
    const isBiz = userProfile?.categories?.includes('Small business owner') || userProfile?.occupation === 'Business owner';

    let specificText = '';
    if (isFarmer) {
      specificText = 'For farmer schemes like PM-KISAN: Aadhaar card, updated land ownership records (Khata/Khasra), and an active Aadhaar-linked bank passbook.\n\n';
    } else if (isStudent) {
      specificText = 'For student scholarships: Aadhaar card, current educational marksheets, student ID/admission receipt, family income certificate, and bank passbook.\n\n';
    } else if (isBiz) {
      specificText = 'For small business & Mudra loans: Aadhaar card, PAN card, business enterprise plan, and recent bank statements.\n\n';
    }

    return {
      text: `${specificText}Common documents required for most central and state government schemes include:\n• Aadhaar card (identity proof)\n• Bank passbook (with Aadhaar seeding/DBT enabled)\n• Income certificate (issued by Tehsildar or revenue authority)\n• Address proof / Ration card\n• Land ownership records (for agricultural schemes)\n\nPlease confirm details on the official site.`,
    };
  }

  // Profile preference rule: If the user's profile says farmer and they ask a generic scheme question, prefer farmer schemes first.
  const isProfileFarmer = userProfile?.categories?.includes('Farmer') || userProfile?.occupation === 'Farmer';
  const isGenericSchemeQuery = query === 'schemes' || query === 'all schemes' || query === 'show schemes' || query === 'help me with schemes';

  if (isProfileFarmer && isGenericSchemeQuery) {
    const pmKisan = MOCK_SCHEMES.find((s) => s.id === 'pm-kisan');
    return {
      text: `Based on your farmer profile, PM-KISAN Samman Nidhi provides direct income assistance to landholding families. You can also explore Pradhan Mantri Fasal Bima Yojana (crop insurance) and Kisan Credit Card (concessional credit) on official agriculture portals.\n\nPlease confirm details on the official site.`,
      schemes: pmKisan ? [pmKisan] : [],
    };
  }

  // 4. Farmer / farm / kisan / land
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
      text: `Here is the primary central scheme for farmers: PM-KISAN Samman Nidhi. In addition to PM-KISAN, farmers can also benefit from Pradhan Mantri Fasal Bima Yojana (comprehensive crop insurance) and Kisan Credit Card (low-interest institutional credit).\n\nPlease confirm details on the official site.`,
      schemes: pmKisan ? [pmKisan] : [],
    };
  }

  // 5. Student / scholarship / education
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
      text: `The National Scholarship Portal (NSP) serves as the central digital platform for pre-matric, post-matric, merit-cum-means, and higher education scholarships for students across India.\n\nPlease confirm details on the official site.`,
      schemes: scholarship ? [scholarship] : [],
    };
  }

  // 6. Woman / women / entrepreneur / mudra / business / loan
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
      text: `Pradhan Mantri Mudra Yojana offers collateral-free loans up to ₹10 Lakh in three tiers (Shishu, Kishor, and Tarun) for non-corporate, non-farm small businesses and women entrepreneurs.\n\nPlease confirm details on the official site.`,
      schemes: mudra ? [mudra] : [],
    };
  }

  // 7. Health / hospital / insurance / ayushman
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
      text: `Ayushman Bharat (PM-JAY) provides cashless secondary and tertiary hospitalisation cover up to ₹5 Lakh per year for eligible low-income beneficiary families.\n\nPlease confirm details on the official site.`,
      schemes: ayushman ? [ayushman] : [],
    };
  }

  // 8. Housing / house / home / awas
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
      text: `Pradhan Mantri Awas Yojana (PMAY) provides financial assistance and interest subvention for constructing or purchasing a pucca house for families in rural and urban areas.\n\nPlease confirm details on the official site.`,
      schemes: awas ? [awas] : [],
    };
  }

  // 9. Senior / pension / old age
  if (
    query.includes('senior') ||
    query.includes('pension') ||
    query.includes('old age') ||
    query.includes('elderly') ||
    query.includes('atal')
  ) {
    const pension = MOCK_SCHEMES.find((s) => s.id === 'atal-pension');
    return {
      text: `Atal Pension Yojana (APY) provides a guaranteed monthly pension ranging from ₹1,000 to ₹5,000 after reaching 60 years of age for all Indian citizens in the unorganised sector.\n\nPlease confirm details on the official site.`,
      schemes: pension ? [pension] : [],
    };
  }

  // Fallback
  return {
    text: `I'm not sure about that from the records I have. Please try a scheme name, or check the official portal. You can also browse the Scheme library.\n\nPlease confirm details on the official site.`,
    actionButton: {
      label: 'Browse scheme library',
      route: '/library',
    },
  };
}
