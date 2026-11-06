import { Scheme, UserProfile, ChatMessage, SupportedLanguage } from '../types';
import { MOCK_SCHEMES } from '../data/schemes';

export interface BotResponseResult {
  text: string;
  schemes?: Scheme[];
  actionButton?: {
    label: string;
    route: string;
  };
  isSafetyWarning?: boolean;
  intent?: string;
  targetSchemeId?: string;
  language?: SupportedLanguage;
}

/**
 * Normalizes text for matching keywords across scripts and aliases.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Searches for a scheme matching the query by ID, name, shortName, or aliases in any script.
 */
export function findSchemeInText(query: string, schemes: Scheme[] = MOCK_SCHEMES): Scheme | null {
  const norm = normalize(query);
  if (!norm) return null;

  // 1. Direct match on ID
  for (const s of schemes) {
    if (norm === s.id || norm.includes(s.id)) {
      return s;
    }
  }

  // 2. Exact or word-boundary matches on aliases
  const scoredSchemes: Array<{ scheme: Scheme; score: number }> = [];

  for (const s of schemes) {
    let bestScore = 0;

    // Check scheme name
    const normName = normalize(s.name);
    if (norm.includes(normName)) {
      bestScore = Math.max(bestScore, normName.length + 20);
    }

    // Check shortName
    if (s.shortName) {
      const normShort = normalize(s.shortName);
      if (norm.includes(normShort)) {
        bestScore = Math.max(bestScore, normShort.length + 15);
      }
    }

    // Check aliases (including Kannada, Hindi, Tamil, Telugu aliases)
    if (s.aliases) {
      for (const alias of s.aliases) {
        const normAlias = normalize(alias);
        if (norm.includes(normAlias)) {
          bestScore = Math.max(bestScore, normAlias.length + 12);
        }
      }
    }

    if (bestScore > 0) {
      scoredSchemes.push({ scheme: s, score: bestScore });
    }
  }

  if (scoredSchemes.length > 0) {
    scoredSchemes.sort((a, b) => b.score - a.score);
    return scoredSchemes[0].scheme;
  }

  return null;
}

/**
 * Identifies all schemes mentioned in a query.
 */
export function findMultipleSchemesInText(query: string, schemes: Scheme[] = MOCK_SCHEMES): Scheme[] {
  const norm = normalize(query);
  const found: Scheme[] = [];

  for (const s of schemes) {
    let matched = false;
    if (s.shortName && norm.includes(normalize(s.shortName))) {
      matched = true;
    } else if (s.aliases && s.aliases.some((a) => norm.includes(normalize(a)))) {
      matched = true;
    } else if (norm.includes(normalize(s.name))) {
      matched = true;
    }

    if (matched && !found.some((f) => f.id === s.id)) {
      found.push(s);
    }
  }

  return found;
}

/**
 * Resolves the currently active scheme from recent conversation history.
 */
export function resolveActiveSchemeFromHistory(
  history?: ChatMessage[],
  schemes: Scheme[] = MOCK_SCHEMES
): Scheme | null {
  if (!history || history.length === 0) return null;

  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];

    if (msg.targetSchemeId) {
      const found = schemes.find((s) => s.id === msg.targetSchemeId);
      if (found) return found;
    }

    if (msg.schemes && msg.schemes.length > 0) {
      const found = schemes.find((s) => s.id === msg.schemes![0].id);
      if (found) return found;
    }

    if (msg.schemeIds && msg.schemeIds.length > 0) {
      const found = schemes.find((s) => s.id === msg.schemeIds![0]);
      if (found) return found;
    }

    const textScheme = findSchemeInText(msg.text, schemes);
    if (textScheme) {
      return textScheme;
    }
  }

  return null;
}

/**
 * Multilingual category detector.
 */
function detectCategoryInQuery(query: string): string | null {
  const norm = normalize(query);

  // Farmers
  if (
    norm.includes('farmer') ||
    norm.includes('farm') ||
    norm.includes('kisan') ||
    norm.includes('agriculture') ||
    norm.includes('crop') ||
    norm.includes('ರೈತ') ||
    norm.includes('ಕೃಷಿ') ||
    norm.includes('ಬೆಳೆ') ||
    norm.includes('किसान') ||
    norm.includes('खेती') ||
    norm.includes('विவசாயி') ||
    norm.includes('రైతు')
  ) {
    return 'Farmers';
  }

  // Students
  if (
    norm.includes('student') ||
    norm.includes('scholarship') ||
    norm.includes('college') ||
    norm.includes('school') ||
    norm.includes('education') ||
    norm.includes('ವಿದ್ಯಾರ್ಥಿ') ||
    norm.includes('ಶಿಕ್ಷಣ') ||
    norm.includes('ವಿದ್ಯಾರ್ಥಿವೇತನ') ||
    norm.includes('छात्र') ||
    norm.includes('छात्रवृत्ति') ||
    norm.includes('மாணவர்') ||
    norm.includes('విద్యార్థి')
  ) {
    return 'Students';
  }

  // Women
  if (
    norm.includes('women') ||
    norm.includes('woman') ||
    norm.includes('girl') ||
    norm.includes('female') ||
    norm.includes('beti') ||
    norm.includes('ಮಹಿಳೆ') ||
    norm.includes('ಹೆಣ್ಣು') ||
    norm.includes('महिला') ||
    norm.includes('बेटी') ||
    norm.includes('பெண்') ||
    norm.includes('మహిళ')
  ) {
    return 'Women';
  }

  // Business
  if (
    norm.includes('business') ||
    norm.includes('entrepreneur') ||
    norm.includes('loan') ||
    norm.includes('vendor') ||
    norm.includes('shop') ||
    norm.includes('startup') ||
    norm.includes('ಉದ್ಯಮ') ||
    norm.includes('ವ್ಯಾಪಾರ') ||
    norm.includes('ಸಾಲ') ||
    norm.includes('व्यापार') ||
    norm.includes('व्यवसाय') ||
    norm.includes('लोन') ||
    norm.includes('வணிகம்') ||
    norm.includes('వ్యాపారం')
  ) {
    return 'Business';
  }

  // Health
  if (
    norm.includes('health') ||
    norm.includes('hospital') ||
    norm.includes('medical') ||
    norm.includes('treatment') ||
    norm.includes('ayushman') ||
    norm.includes('ಆರೋಗ್ಯ') ||
    norm.includes('ಆಸ್ಪತ್ರೆ') ||
    norm.includes('ಚಿಕಿತ್ಸೆ') ||
    norm.includes('स्वास्थ्य') ||
    norm.includes('अस्पताल') ||
    norm.includes('மருத்துவம்') ||
    norm.includes('ఆరోగ్య')
  ) {
    return 'Health';
  }

  // Housing
  if (
    norm.includes('house') ||
    norm.includes('housing') ||
    norm.includes('home') ||
    norm.includes('awas') ||
    norm.includes('shelter') ||
    norm.includes('ಮನೆ') ||
    norm.includes('ವಸತಿ') ||
    norm.includes('ಆವಾಸ್') ||
    norm.includes('मकान') ||
    norm.includes('आवास') ||
    norm.includes('வீடு') ||
    norm.includes('ఇల్లు')
  ) {
    return 'Housing';
  }

  // Seniors
  if (
    norm.includes('senior') ||
    norm.includes('elderly') ||
    norm.includes('pension') ||
    norm.includes('old age') ||
    norm.includes('retired') ||
    norm.includes('ಹಿರಿಯ') ||
    norm.includes('ಪಿಂಚಣಿ') ||
    norm.includes('ಪೆನ್ಷನ್') ||
    norm.includes('वरिष्ठ') ||
    norm.includes('पेंशन') ||
    norm.includes('ஓய்வூதியம்') ||
    norm.includes('పింఛను')
  ) {
    return 'Seniors';
  }

  return null;
}

/**
 * Core multilingual responder for Scheme Saathi.
 */
export function generateLocalReply(
  userQuery: string,
  userProfile?: UserProfile | null,
  conversationHistory?: ChatMessage[],
  language: SupportedLanguage = 'English'
): BotResponseResult {
  const raw = userQuery.trim();
  const norm = normalize(raw);

  // =========================================================================
  // 1. SAFETY FILTER (Always checked first)
  // =========================================================================
  const hasAadhaar =
    norm.includes('aadhaar') || norm.includes('aadhar') || norm.includes('ಆಧಾರ್') || norm.includes('आधार') || norm.includes('ஆதார்') || norm.includes('ఆధార్');
  const hasOtp = /\botp\b/i.test(raw) || norm.includes('ಒಟಿಪಿ') || norm.includes('ओटीपी') || norm.includes('ஓடிபி') || norm.includes('ఓటీపీ');
  const hasBankAccount =
    norm.includes('bank account') ||
    norm.includes('account number') ||
    norm.includes('acct number') ||
    norm.includes('ifsc') ||
    norm.includes('atm pin') ||
    norm.includes('ಖಾತೆ ಸಂಖ್ಯೆ') ||
    norm.includes('ಖಾತೆ ನಂಬರ್') ||
    norm.includes('खाता संख्या') ||
    norm.includes('வங்கி கணக்கு');
  const hasPassword =
    norm.includes('password') ||
    norm.includes('passcode') ||
    norm.includes('cvv') ||
    norm.includes('ಪಾಸ್‌ವರ್ಡ್') ||
    norm.includes('पासवर्ड') ||
    norm.includes('கடவுச்சொல்');

  if (
    norm.includes('aadhaar number') ||
    norm.includes('my aadhaar') ||
    norm.includes('ಆಧಾರ್ ಸಂಖ್ಯೆ') ||
    norm.includes('आधार नंबर') ||
    hasOtp ||
    hasBankAccount ||
    hasPassword ||
    (hasAadhaar && (norm.includes('number') || norm.includes('details') || norm.includes('card number') || norm.includes('ಸಂಖ್ಯೆ') || norm.includes('नंबर')))
  ) {
    return formatSafetyWarning(language);
  }

  // =========================================================================
  // 2. CONTEXT & SCHEME RESOLUTION
  // =========================================================================
  const directScheme = findSchemeInText(raw);
  const multipleSchemes = findMultipleSchemesInText(raw);
  const historyScheme = resolveActiveSchemeFromHistory(conversationHistory);

  const isFollowUpPattern =
    !directScheme &&
    (norm.includes('this scheme') ||
      norm.includes('the scheme') ||
      norm.includes('its') ||
      norm.includes('it') ||
      norm.includes('for this') ||
      norm.includes('of this') ||
      norm.includes('ಈ ಯೋಜನೆ') ||
      norm.includes('ಇದರ') ||
      norm.includes('ಇದಕ್ಕೆ') ||
      norm.includes('इस योजना') ||
      norm.includes('इसके') ||
      norm.includes('इसके लिए') ||
      norm.includes('இந்த திட்ட') ||
      norm.includes('దీనికి') ||
      norm.startsWith('who is eligible') ||
      norm.startsWith('what are its') ||
      norm.startsWith('what documents') ||
      norm.startsWith('how can i') ||
      norm.startsWith('give me the') ||
      norm.startsWith('am i eligible') ||
      norm.includes('ಯಾರು ಅರ್ಹರು') ||
      norm.includes('ಪ್ರಯೋಜನಗಳೇನು') ||
      norm.includes('ಯಾವ ದಾಖಲೆ') ||
      norm.includes('ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ') ||
      norm.includes('ಲಿಂಕ್ ನೀಡಿ') ||
      norm.includes('ನಾನು ಅರ್ಹನೇ') ||
      norm.includes('कौन पात्र है') ||
      norm.includes('लाभ क्या हैं') ||
      norm.includes('दस्तावेज क्या हैं') ||
      norm.includes('आवेदन कैसे करें') ||
      norm.includes('लिंक दें') ||
      norm.includes('क्या मैं पात्र हूँ'));

  const activeScheme: Scheme | null = directScheme || (isFollowUpPattern ? historyScheme : directScheme || historyScheme);

  // =========================================================================
  // 3. INTENT DETECTION (Cross-lingual)
  // =========================================================================

  // A. Scheme Comparison Intent
  const isComparison =
    multipleSchemes.length >= 2 ||
    ((norm.includes('compare') || norm.includes('difference between') || norm.includes('vs') || norm.includes('ಹೋಲಿಕೆ') || norm.includes('तुलना') || norm.includes('வித்தியாசம்')) &&
      (multipleSchemes.length >= 1 || (activeScheme && multipleSchemes.length >= 1)));

  if (isComparison) {
    const s1 = multipleSchemes[0] || activeScheme;
    const s2 = multipleSchemes[1] || (multipleSchemes[0]?.id !== activeScheme?.id ? activeScheme : null);

    if (s1 && s2 && s1.id !== s2.id) {
      return formatSchemeComparison(s1, s2, language);
    }
  }

  // B. Official Application Link Request Intent
  const isLinkRequest =
    norm.includes('link') ||
    norm.includes('website') ||
    norm.includes('url') ||
    norm.includes('portal') ||
    norm.includes('ಲಿಂಕ್') ||
    norm.includes('ವೆಬ್‌ಸೈಟ್') ||
    norm.includes('ಪೋರ್ಟಲ್') ||
    norm.includes('ಜಾಲತಾಣ') ||
    norm.includes('आधिकारिक लिंक') ||
    norm.includes('वेबसाइट') ||
    norm.includes('पोर्टल') ||
    norm.includes('இணைப்பு') ||
    norm.includes('வலைத்தளம்') ||
    norm.includes('లింక్');

  if (isLinkRequest && activeScheme) {
    return formatOfficialLinkResponse(activeScheme, language);
  }

  // C. Required Documents Request Intent
  const isDocumentsRequest =
    norm.includes('document') ||
    norm.includes('documents') ||
    norm.includes('paper') ||
    norm.includes('proof') ||
    norm.includes('ದಾಖಲೆ') ||
    norm.includes('ದಾಖಲೆಗಳು') ||
    norm.includes('ಪ್ರಮಾಣಪತ್ರ') ||
    norm.includes('ದಸ್ತಾವೇಜು') ||
    norm.includes('दस्तावेज') ||
    norm.includes('कागजात') ||
    norm.includes('प्रमाणपत्र') ||
    norm.includes('ஆவணம்') ||
    norm.includes('ஆவணங்கள்') ||
    norm.includes('పత్రాలు');

  if (isDocumentsRequest && activeScheme) {
    return formatDocumentsResponse(activeScheme, language);
  }

  // D. How to Apply / Application Procedure Intent
  const isApplyRequest =
    norm.includes('how to apply') ||
    norm.includes('how can i apply') ||
    norm.includes('application process') ||
    norm.includes('procedure') ||
    norm.includes('how to register') ||
    norm.includes('ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ') ||
    norm.includes('ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ') ||
    norm.includes('ನೋಂದಣಿ ಮಾಡುವುದು ಹೇಗೆ') ||
    norm.includes('आवेदन कैसे करें') ||
    norm.includes('आवेदन प्रक्रिया') ||
    norm.includes('पंजीकरण कैसे करें') ||
    norm.includes('விண்ணப்பிப்பது எப்படி') ||
    norm.includes('ఎలా దరఖాస్తు చేయాలి');

  if (isApplyRequest && activeScheme) {
    return formatApplicationProcessResponse(activeScheme, language);
  }

  // E. Personal Eligibility Assessment Intent ("Am I eligible...")
  const isPersonalEligibility =
    norm.includes('am i eligible') ||
    norm.includes('do i qualify') ||
    norm.includes('can i get') ||
    norm.includes('check my eligibility') ||
    norm.includes('ನಾನು ಅರ್ಹನೇ') ||
    norm.includes('ನಾನು ಅರ್ಹಳೇ') ||
    norm.includes('ನನಗೆ ಸಿಗುತ್ತಾ') ||
    norm.includes('ನನ್ನ ಅರ್ಹತೆ') ||
    norm.includes('क्या मैं पात्र हूँ') ||
    norm.includes('क्या मुझे मिलेगा') ||
    norm.includes('मेरी पात्रता') ||
    norm.includes('நான் தகுதியுடையவனா') ||
    norm.includes('నేను అర్హుడినా');

  if (isPersonalEligibility && activeScheme) {
    return formatPersonalEligibilityResponse(activeScheme, userProfile, language);
  }

  // F. Reasons for Ineligibility / Exclusions Intent
  const isIneligibilityRequest =
    norm.includes('ineligible') ||
    norm.includes('not eligible') ||
    norm.includes('who cannot apply') ||
    norm.includes('exclusions') ||
    norm.includes('ಯಾರು ಅರ್ಹರಲ್ಲ') ||
    norm.includes('ಅರ್ಹರಲ್ಲದವರು') ||
    norm.includes('ವಿನಾಯಿತಿ') ||
    norm.includes('अपात्र') ||
    norm.includes('कौन पात्र नहीं है') ||
    norm.includes('किसे लाभ नहीं मिलेगा') ||
    norm.includes('யார் தகுதியற்றவர்') ||
    norm.includes('ఎవరు అర్హులు కారు');

  if (isIneligibilityRequest && activeScheme) {
    return formatIneligibilityResponse(activeScheme, language);
  }

  // G. General Eligibility Requirements Intent ("Who is eligible?")
  const isGeneralEligibility =
    norm.includes('who is eligible') ||
    norm.includes('eligibility') ||
    norm.includes('criteria') ||
    norm.includes('condition') ||
    norm.includes('ಯಾರು ಅರ್ಹರು') ||
    norm.includes('ಅರ್ಹತಾ ಷರತ್ತು') ||
    norm.includes('ಅರ್ಹತೆ') ||
    norm.includes('कौन पात्र है') ||
    norm.includes('पात्रता') ||
    norm.includes('योग्यता') ||
    norm.includes('யார் தகுதியானவர்') ||
    norm.includes('தகுதி') ||
    norm.includes('ఎవరు అర్హులు') ||
    norm.includes('అర్హత');

  if (isGeneralEligibility && activeScheme) {
    return formatGeneralEligibilityResponse(activeScheme, language);
  }

  // H. Benefits and Financial Assistance Intent ("What are its benefits?", "How much money?")
  const isBenefitsRequest =
    norm.includes('benefit') ||
    norm.includes('benefits') ||
    norm.includes('financial') ||
    norm.includes('how much money') ||
    norm.includes('instalment') ||
    norm.includes('installment') ||
    norm.includes('payment') ||
    norm.includes('money') ||
    norm.includes('ಪ್ರಯೋಜನ') ||
    norm.includes('ಲಾಭ') ||
    norm.includes('ಎಷ್ಟು ಹಣ') ||
    norm.includes('ಕಂತು') ||
    norm.includes('ಸಹಾಯಧನ') ||
    norm.includes('लाभ') ||
    norm.includes('फायदे') ||
    norm.includes('कितना पैसा') ||
    norm.includes('किस्त') ||
    norm.includes('राशि') ||
    norm.includes('நன்மை') ||
    norm.includes('எவ்வளவு பணம்') ||
    norm.includes('ప్రయోజనం') ||
    norm.includes('ఎంత డబ్బు');

  if (isBenefitsRequest && activeScheme) {
    return formatBenefitsResponse(activeScheme, language);
  }

  // I. Recommendations by Category or "What other schemes are available..."
  const detectedCategory = detectCategoryInQuery(raw);
  const isOtherSchemesRequest =
    norm.includes('other scheme') ||
    norm.includes('more scheme') ||
    norm.includes('schemes are available') ||
    norm.includes('schemes for') ||
    norm.includes('ಬೇರೆ ಯೋಜನೆ') ||
    norm.includes('ಇತರ ಯೋಜನೆ') ||
    norm.includes('ಯೋಜನೆಗಳು') ||
    norm.includes('अन्य योजना') ||
    norm.includes('और योजना') ||
    norm.includes('योजनाएं') ||
    norm.includes('மற்ற திட்டங்கள்') ||
    norm.includes('ఇతర పథకాలు');

  if ((isOtherSchemesRequest || norm.includes('available')) && detectedCategory) {
    return formatCategoryRecommendations(detectedCategory, activeScheme?.id, language);
  }

  // J. General Scheme Information Intent ("Tell me about PM-KISAN", "What is PM-KISAN?", "PM-KISAN ಬಗ್ಗೆ ತಿಳಿಸಿ")
  const isGeneralSchemeQuestion =
    norm.includes('tell me about') ||
    norm.includes('what is') ||
    norm.includes('explain') ||
    norm.includes('information') ||
    norm.includes('details') ||
    norm.includes('ಬಗ್ಗೆ ತಿಳಿಸಿ') ||
    norm.includes('ಮಾಹಿತಿ ನೀಡಿ') ||
    norm.includes('ವಿವರಿಸಿ') ||
    norm.includes('ಏನು') ||
    norm.includes('के बारे में') ||
    norm.includes('बताइए') ||
    norm.includes('जानकारी दें') ||
    norm.includes('क्या है') ||
    norm.includes('பற்றி கூறு') ||
    norm.includes('గురించి చెప్పండి') ||
    (activeScheme && directScheme && norm.length < 50);

  if (activeScheme && (isGeneralSchemeQuestion || directScheme)) {
    return formatGeneralSchemeInfoResponse(activeScheme, language);
  }

  // K. Category keyword without specific scheme
  if (detectedCategory) {
    return formatCategoryRecommendations(detectedCategory, activeScheme?.id, language);
  }

  // L. Greetings
  if (
    norm === 'hi' ||
    norm === 'hello' ||
    norm === 'hey' ||
    norm.startsWith('hi ') ||
    norm.startsWith('hello ') ||
    norm.includes('namaste') ||
    norm.includes('vanakkam') ||
    norm.includes('namaskara') ||
    norm.includes('ನಮಸ್ಕಾರ') ||
    norm.includes('नमस्ते') ||
    norm.includes('வணக்கம்') ||
    norm.includes('నమస్కారం')
  ) {
    return formatGreetingResponse(userProfile, language);
  }

  // M. Eligibility check wizard shortcut
  if (
    norm.includes('check eligibility') ||
    norm.includes('eligibility tool') ||
    norm.includes('ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ') ||
    norm.includes('पात्रता जांचें')
  ) {
    return formatEligibilityCheckShortcut(language);
  }

  // N. Generic Explore
  if (
    norm === 'schemes' ||
    norm === 'all schemes' ||
    norm === 'ಯೋಜನೆಗಳು' ||
    norm === 'सभी योजनाएं' ||
    norm === 'திட்டங்கள்'
  ) {
    return formatGenericExplore(language);
  }

  // =========================================================================
  // 4. FALLBACK
  // =========================================================================
  return formatFallbackResponse(language);
}

// ===========================================================================
// MULTILINGUAL RESPONSE BUILDERS (Clean headings, verified URLs, accurate translations)
// ===========================================================================

function formatSafetyWarning(language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ಪ್ರಮುಖ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ\n\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ, ಬ್ಯಾಂಕ್ ಒಟಿಪಿ (OTP), ಖಾತೆ ವಿವರಗಳು ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಚಾಟ್‌ನಲ್ಲಿ **ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ**.\n\nಸ್ಕೀಮ್ ಸಾಥಿ ಕೇವಲ ಮಾಹಿತಿ ನೀಡುವ ಮಾರ್ಗದರ್ಶಿಯಾಗಿದೆ ಮತ್ತು **ಯಾವುದೇ ಗೌಪ್ಯ ಬ್ಯಾಂಕಿಂಗ್ ಅಥವಾ ವೈಯಕ್ತಿಕ ರುಜುವಾತುಗಳನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ**. ಯಾವಾಗಲೂ ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಿ.`,
      isSafetyWarning: true,
      intent: 'SAFETY',
      language,
    };
  }
  if (language === 'Hindi') {
    return {
      text: `### महत्वपूर्ण सुरक्षा चेतावनी\n\nकृपया अपना आधार नंबर, बैंक ओटीपी (OTP), खाता विवरण या पासवर्ड चैट में **कभी साझा न करें**।\n\nस्कीम साथी एक सूचनात्मक पोर्टल है और **कभी भी संवेदनशील व्यक्तिगत या बैंकिंग क्रेडेंशियल नहीं मांगता है**। हमेशा अपने पहचान विवरण को सुरक्षित रखें।`,
      isSafetyWarning: true,
      intent: 'SAFETY',
      language,
    };
  }
  if (language === 'Tamil') {
    return {
      text: `### முக்கிய பாதுகாப்பு எச்சரிக்கை\n\nதயவுசெய்து உங்கள் ஆதார் எண், வங்கி ஓடிபி (OTP), கணக்கு விவரங்கள் அல்லது கடவுச்சொற்களை **பகிர வேண்டாம்**.\n\nஸ்கீம் சாதி ஒரு தகவல் வழங்கும் சேவையாகும், இது தனிப்பட்ட வங்கி சான்றுகளை ஒருபோதும் கேட்காது.`,
      isSafetyWarning: true,
      intent: 'SAFETY',
      language,
    };
  }
  if (language === 'Telugu') {
    return {
      text: `### ముఖ్యమైన భద్రతా హెచ్చరిక\n\nదయచేసి మీ ఆధార్ నంబర్, బ్యాంక్ ఓటీపీ (OTP), ఖాతా వివరాలు లేదా పాస్‌వర్డ్‌లను చాట్‌లో **ఎప్పుడూ పంచుకోవద్దు**.\n\nస్కీమ్ సాథీ సురక్షితమైన సమాచార పోర్టల్ మరియు ఎప్పుడూ సున్నితమైన ఆధారాలను అడగదు.`,
      isSafetyWarning: true,
      intent: 'SAFETY',
      language,
    };
  }

  return {
    text: `### Important Safety Warning\n\nPlease **never share** your Aadhaar number, OTP, bank account details, PIN, or passwords in chat.\n\nScheme Saathi is an informational portal and will **never ask for sensitive personal or banking credentials**. Always keep your identity credentials confidential.`,
    isSafetyWarning: true,
    intent: 'SAFETY',
    language,
  };
}

function formatGeneralSchemeInfoResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} (${scheme.shortName || scheme.name})`,
      '',
      `**ಯೋಜನೆಯ ವಿವರ**\n${isPmKisan ? 'ಕೇಂದ್ರ ಸರ್ಕಾರದ 100% ಧನಸಹಾಯದ ಯೋಜನೆಯಾಗಿದ್ದು, ಭಾರತದ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ನೇರ ಆದಾಯ ಬೆಂಬಲ ನೀಡುತ್ತದೆ.' : scheme.summary || scheme.benefit}`,
      '',
      `**ಮುಖ್ಯ ಉದ್ದೇಶ**\n${isPmKisan ? 'ಕೃಷಿ ಪರಿಕರಗಳನ್ನು ಖರೀದಿಸಲು ಮತ್ತು ಕೃಷಿ ವೆಚ್ಚಗಳನ್ನು ಭರಿಸಲು ರೈತ ಕುಟುಂಬಗಳಿಗೆ ಪೂರಕ ಆದಾಯ ನೆರವು ಒದಗಿಸುವುದು.' : scheme.purpose || 'ಅರ್ಹ ನಾಗರಿಕರಿಗೆ ಆರ್ಥಿಕ ನೆರವು ನೀಡುವುದು.'}`,
      '',
      `**ಫಲಾನುಭವಿಗಳು**\n${isPmKisan ? 'ತಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಮಾಡಬಹುದಾದ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತ ಕುಟುಂಬಗಳು.' : scheme.beneficiaries || scheme.category}`,
      '',
      `**ಆರ್ಥಿಕ ಪ್ರಯೋಜನಗಳು**\n${isPmKisan ? 'ವರ್ಷಕ್ಕೆ ₹6,000 ಹಣವನ್ನು 3 ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ (ತಲಾ ₹2,000) ನೇರವಾಗಿ ರೈತರ ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಡಿಬಿಟಿ (DBT) ಮೂಲಕ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ.' : scheme.financialDetails || scheme.benefit}`,
      '',
      `**ಯೋಜನೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ**\n${isPmKisan ? 'ರಾಜ್ಯ ಸರ್ಕಾರಗಳು ಭೂ ದಾಖಲೆಗಳ ಆಧಾರದ ಮೇಲೆ ಅರ್ಹ ರೈತರನ್ನು ಗುರುತಿಸುತ್ತವೆ. ಕಡ್ಡಾಯ ಇ-ಕೆವೈಸಿ (e-KYC) ಪೂರ್ಣಗೊಂಡ ನಂತರ ಹಣ ನೇರವಾಗಿ ಖಾತೆಗೆ ವರ್ಗಾವಣೆಯಾಗುತ್ತದೆ.' : scheme.howItWorks || 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಮೂಲಕ ನೇರ ಸೌಲಭ್ಯ ಒದಗಿಸಲಾಗುತ್ತದೆ.'}`,
      '',
      `**ಅರ್ಹತಾ ಷರತ್ತುಗಳು**`,
      ...(isPmKisan
        ? [
            '• ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಮಾಡಬಹುದಾದ ಕೃಷಿ ಭೂಮಿ ನೋಂದಾಯಿತವಾಗಿರಬೇಕು.',
            '• ಪಹಣಿ (RTC) / ಖಾತೆ ದಾಖಲೆಗಳು ನವೀಕೃತವಾಗಿರಬೇಕು.',
            '• ಬ್ಯಾಂಕ್ ಖಾತೆಯು ಆಧಾರ್‌ನೊಂದಿಗೆ ಸೀಡಿಂಗ್ ಮತ್ತು ಡಿಬಿಟಿ (DBT) ಸಕ್ರಿಯವಾಗಿರಬೇಕು.',
            '• ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕಡ್ಡಾಯ ಇ-ಕೆವೈಸಿ (e-KYC) ಪೂರ್ಣಗೊಂಡಿರಬೇಕು.',
          ]
        : (scheme.eligibilityCriteria || [scheme.eligibility]).map((c) => `• ${c}`)),
      '',
      `**ಅಗತ್ಯ ದಾಖಲೆಗಳು**`,
      ...(isPmKisan
        ? [
            '• ಆಧಾರ್ ಕಾರ್ಡ್ (ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ಇ-ಕೆವೈಸಿಗಾಗಿ ಕಡ್ಡಾಯ)',
            '• ಕೃಷಿ ಜಮೀನಿನ ಪಹಣಿ (RTC) / ಖಾತೆ ದಾಖಲೆಗಳು',
            '• ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ಆಧಾರ್ ಲಿಂಕ್ ಮತ್ತು ಡಿಬಿಟಿ ಸಕ್ರಿಯವಾಗಿರುವ ಖಾತೆ)',
            '• ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಒಟಿಪಿ ದೃಢೀಕರಣಕ್ಕಾಗಿ)',
          ]
        : scheme.documents.map((d) => `• ${d}`)),
      '',
      `**ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ**`,
      ...(isPmKisan
        ? [
            '1. ಅಧಿಕೃತ ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ: https://pmkisan.gov.in',
            '2. ಮುಖಪುಟದಲ್ಲಿ "Farmers Corner" ಅಡಿಯಲ್ಲಿ "New Farmer Registration" ಕ್ಲಿಕ್ ಮಾಡಿ.',
            '3. ಆಧಾರ್ ಸಂಖ್ಯೆ, ರಾಜ್ಯ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.',
            '4. ಮೊಬೈಲ್‌ಗೆ ಬರುವ ಒಟಿಪಿ (OTP) ಮೂಲಕ ದೃಢೀಕರಿಸಿ.',
            '5. ವೈಯಕ್ತಿಕ ವಿವರಗಳು, ಜಮೀನಿನ ಸರ್ವೆ ನಂಬರ್, ವಿಸ್ತೀರ್ಣ ನಮೂದಿಸಿ ಭೂ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
            '6. ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ ಮತ್ತು ಅರ್ಜಿ ಸಂಖ್ಯೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿಕೊಳ್ಳಿ.',
            '',
            '*ಆಫ್‌ಲೈನ್ ನೆರವು:* ರೈತರು ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್ / ಸಾಮಾನ್ಯ ಸೇವಾ ಕೇಂದ್ರ (CSC) ಅಥವಾ ಸ್ಥಳೀಯ ಕೃಷಿ ಇಲಾಖೆ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.',
          ]
        : (scheme.applicationSteps || ['ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.'])),
      '',
      `**ಅಧಿಕೃತ ಜಾಲತಾಣ ಮತ್ತು ಪೋರ್ಟಲ್**\nನೇರ ಅಧಿಕೃತ ಪೋರ್ಟಲ್: [${scheme.officialUrl}](${scheme.officialUrl}) *(ಮೂಲ: ${scheme.source})*`,
      '',
      `*ಸೂಚನೆ: ಸ್ಕೀಮ್ ಸಾಥಿ ಕೇವಲ ಮಾರ್ಗದರ್ಶಿಯಾಗಿದೆ. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವಿವರಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.*`,
    ];

    return {
      text: lines.join('\n'),
      schemes: [scheme],
      intent: 'GENERAL_INFO',
      targetSchemeId: scheme.id,
      language,
    };
  }

  if (language === 'Hindi') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} (${scheme.shortName || scheme.name})`,
      '',
      `**योजना का विवरण**\n${isPmKisan ? 'भारत सरकार की शत-प्रतिशत वित्त पोषित योजना जो देश के सभी भूमिधारक किसान परिवारों को प्रत्यक्ष आय सहायता प्रदान करती है।' : scheme.summary || scheme.benefit}`,
      '',
      `**मुख्य उद्देश्य**\n${isPmKisan ? 'कृषि इनपुट खरीदने और घरेलू जरूरतों को पूरा करने के लिए किसान परिवारों को पूरक आय सहायता प्रदान करना।' : scheme.purpose || 'पात्र नागरिकों को वित्तीय एवं सामाजिक सुरक्षा प्रदान करना।'}`,
      '',
      `**किसे लाभ मिलेगा**\n${isPmKisan ? 'सभी भूमिधारक किसान परिवार जिनके नाम पर कृषि योग्य भूमि है।' : scheme.beneficiaries || scheme.category}`,
      '',
      `**वित्तीय लाभ**\n${isPmKisan ? 'प्रति वर्ष ₹6,000 की वित्तीय सहायता ₹2,000 की तीन समान किस्तों में सीधे आधार-सीडेड बैंक खाते में डीबीटी (DBT) के माध्यम से भेजी जाती है।' : scheme.financialDetails || scheme.benefit}`,
      '',
      `**योजना कैसे काम करती है**\n${isPmKisan ? 'राज्य सरकारें भूलेखों के आधार पर पात्र किसानों की पहचान करती हैं। अनिवार्य ई-केवाईसी (e-KYC) के बाद राशि सीधे बैंक खाते में भेजी जाती है।' : scheme.howItWorks || 'सीधे बैंक हस्तांतरण या अधिकृत संस्थागत माध्यम से।'}}`,
      '',
      `**पात्रता शर्तें**`,
      ...(isPmKisan
        ? [
            '• परिवार के नाम पर कृषि योग्य भूमि का मालिकाना हक होना चाहिए।',
            '• भूलेख (खसरा/खतौनी) राज्य के भू-अभिलेख पोर्टल पर सत्यापित होना चाहिए।',
            '• बैंक खाता आधार से लिंक और डीबीटी (DBT) सक्षम होना चाहिए।',
            '• पीएम-किसान पोर्टल पर अनिवार्य ई-केवाईसी (e-KYC) पूरी होनी चाहिए।',
          ]
        : (scheme.eligibilityCriteria || [scheme.eligibility]).map((c) => `• ${c}`)),
      '',
      `**आवश्यक दस्तावेज**`,
      ...(isPmKisan
        ? [
            '• आधार कार्ड (पहचान और ई-केवाईसी हेतु अनिवार्य)',
            '• कृषि भूमि के दस्तावेज (खसरा/खतौनी की नकल)',
            '• बैंक पासबुक (आधार से जुड़ा और डीबीटी सक्रिय खाता)',
            '• आधार से जुड़ा सक्रिय मोबाइल नंबर',
          ]
        : scheme.documents.map((d) => `• ${d}`)),
      '',
      `**आवेदन कैसे करें**`,
      ...(isPmKisan
        ? [
            '1. आधिकारिक पोर्टल https://pmkisan.gov.in पर जाएं।',
            '2. "Farmers Corner" में जाकर "New Farmer Registration" पर क्लिक करें।',
            '3. आधार नंबर, राज्य और मोबाइल नंबर दर्ज करें।',
            '4. आधार ओटीपी से सत्यापन पूरा करें।',
            '5. भूमि विवरण (खसरा नंबर, क्षेत्रफल) भरें और दस्तावेज अपलोड करें।',
            '6. आवेदन सबमिट करें और पंजीकरण संख्या सुरक्षित रखें।',
            '',
            '*ऑफलाइन सहायता:* किसान नजदीकी सीएससी (CSC) या ब्लॉक कृषि कार्यालय जाकर भी पंजीकरण करा सकते हैं।',
          ]
        : (scheme.applicationSteps || ['आधिकारिक पोर्टल पर आवेदन करें।'])),
      '',
      `**आधिकारिक वेबसाइट एवं पोर्टल**\nप्रत्यक्ष आधिकारिक पोर्टल: [${scheme.officialUrl}](${scheme.officialUrl}) *(स्रोत: ${scheme.source})*`,
      '',
      `*सूचना: स्कीम साथी केवल सूचनात्मक मार्गदर्शन प्रदान करता है। हमेशा आधिकारिक सरकारी पोर्टल पर विवरण सत्यापित करें।*`,
    ];

    return {
      text: lines.join('\n'),
      schemes: [scheme],
      intent: 'GENERAL_INFO',
      targetSchemeId: scheme.id,
      language,
    };
  }

  // English (default)
  const headings = [
    `### ${scheme.name} (${scheme.shortName || scheme.name})`,
    '',
    `**What the Scheme Is**\n${scheme.summary || scheme.benefit}`,
    '',
    `**Main Purpose**\n${scheme.purpose || 'To provide welfare and financial assistance to eligible citizens.'}`,
    '',
    `**Who Can Benefit**\n${scheme.beneficiaries || scheme.eligibility}`,
    '',
    `**Financial Benefits**\n${scheme.financialDetails || scheme.benefit}`,
    '',
    `**How the Scheme Works**\n${scheme.howItWorks || 'Administered centrally with direct fund transfers or authorized institutional delivery.'}`,
    '',
    `**Eligibility Requirements**`,
    ...(scheme.eligibilityCriteria || [scheme.eligibility]).map((crit) => `• ${crit}`),
    '',
    `**Required Documents**`,
    ...scheme.documents.map((doc) => `• ${doc}`),
    '',
    `**How to Apply**`,
    ...(scheme.applicationSteps || ['Apply through the official portal.']),
    ...(scheme.offlineApplication ? ['', `*Offline assistance:* ${scheme.offlineApplication}`] : []),
    '',
    `**Official Website & Portal**\nDirect official portal: [${scheme.officialUrl}](${scheme.officialUrl}) *(Source: ${scheme.source})*`,
    '',
    `*Note: Scheme Saathi provides informational guidance. Always verify official notifications on the respective government portal before applying.*`,
  ];

  return {
    text: headings.join('\n'),
    schemes: [scheme],
    intent: 'GENERAL_INFO',
    targetSchemeId: scheme.id,
    language,
  };
}

function formatBenefitsResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} ಯೋಜನೆಯ ಆರ್ಥಿಕ ಪ್ರಯೋಜನಗಳು`,
      '',
      `**ಪಾವತಿ ಮತ್ತು ಹಣಕಾಸಿನ ನೆರವು:**\n${isPmKisan ? 'ಪ್ರತಿ ಆರ್ಥಿಕ ವರ್ಷಕ್ಕೆ ₹6,000 ಹಣವನ್ನು 3 ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ (ತಲಾ ₹2,000) ರೈತರ ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಡಿಬಿಟಿ (DBT) ಮೂಲಕ ನೇರವಾಗಿ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ.' : scheme.financialDetails || scheme.benefit}`,
      '',
      `**ಪ್ರಯೋಜನದ ಸಾರಾಂಶ:**\n• **ಮುಖ್ಯ ನೆರವು:** ${scheme.benefit}\n• **ಫಲಾನುಭವಿ ವರ್ಗ:** ${scheme.beneficiaries || scheme.category}\n• **ಪಾವತಿ ವಿಧಾನ:** ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT)`,
      '',
      `**ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಜಾಲತಾಣ:** [${scheme.officialUrl}](${scheme.officialUrl}) · ನವೀಕರಿಸಲಾಗಿದೆ ${scheme.lastUpdated}`,
    ];
    return { text: lines.join('\n'), intent: 'BENEFITS', targetSchemeId: scheme.id, language };
  }

  if (language === 'Hindi') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} के वित्तीय लाभ`,
      '',
      `**भुगतान एवं वित्तीय सहायता विवरण:**\n${isPmKisan ? 'प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता ₹2,000 की तीन समान किस्तों में (अप्रैल-जुलाई, अगस्त-नवंबर, दिसंबर-मार्च) सीधे आधार से जुड़े बैंक खाते में डीबीटी द्वारा भेजी जाती है।' : scheme.financialDetails || scheme.benefit}`,
      '',
      `**लाभ का सारांश:**\n• **मुख्य लाभ:** ${scheme.benefit}\n• **लक्षित लाभार्थी:** ${scheme.beneficiaries || scheme.category}\n• **हस्तांतरण माध्यम:** प्रत्यक्ष लाभ अंतरण (DBT)`,
      '',
      `**सत्यापित आधिकारिक पोर्टल:** [${scheme.officialUrl}](${scheme.officialUrl}) · अद्यतन ${scheme.lastUpdated}`,
    ];
    return { text: lines.join('\n'), intent: 'BENEFITS', targetSchemeId: scheme.id, language };
  }

  // English
  const lines = [
    `### Financial Benefits of ${scheme.name}`,
    '',
    `**Payment & Assistance Details**\n${scheme.financialDetails || scheme.benefit}`,
    '',
    `**Summary of Assistance**\n• **Core Benefit:** ${scheme.benefit}\n• **Beneficiary Group:** ${scheme.beneficiaries || scheme.category}\n• **Disbursement Mode:** Direct Benefit Transfer (DBT) / direct institutional facility`,
    '',
    `**Official Source**\nVerified on [${scheme.officialUrl}](${scheme.officialUrl}) · Updated ${scheme.lastUpdated}`,
  ];

  return { text: lines.join('\n'), intent: 'BENEFITS', targetSchemeId: scheme.id, language };
}

function formatGeneralEligibilityResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} ಯೋಜನೆಯ ಅರ್ಹತಾ ಷರತ್ತುಗಳು`,
      '',
      `**ಯಾರು ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು:**`,
      ...(isPmKisan
        ? [
            '• ತಮ್ಮ ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ಸಾಗುವಳಿ ಮಾಡಬಹುದಾದ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ಎಲ್ಲಾ ರೈತರು.',
            '• ಕೃಷಿ ಭೂಮಿಯ ಪಹಣಿ (RTC) ನವೀಕೃತವಾಗಿರಬೇಕು.',
            '• ಬ್ಯಾಂಕ್ ಖಾತೆಯು ಆಧಾರ್ ಸೀಡಿಂಗ್ ಮತ್ತು ಡಿಬಿಟಿ ಸಕ್ರಿಯವಾಗಿರಬೇಕು.',
            '• ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕಡ್ಡಾಯ ಇ-ಕೆವೈಸಿ (e-KYC) ಪೂರ್ಣಗೊಂಡಿರಬೇಕು.',
          ]
        : (scheme.eligibilityCriteria || [scheme.eligibility]).map((item) => `• ${item}`)),
      '',
      `**ಪ್ರಮುಖ ಅನರ್ಹತೆ ಮತ್ತು ವಿನಾಯಿತಿ ನಿಯಮಗಳು:**`,
      ...(isPmKisan
        ? [
            '• ಸಾಂವಿಧಾನಿಕ ಹುದ್ದೆಗಳನ್ನು ಹೊಂದಿರುವವರು ಅಥವಾ ಹೊಂದಿದ್ದವರು.',
            '• ಸರ್ಕಾರಿ ನೌಕರರು ಮತ್ತು ಮಾಸಿಕ ₹10,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪಿಂಚಣಿ ಪಡೆಯುವವರು.',
            '• ಕಳೆದ ವರ್ಷ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿಸಿದ ವ್ಯಕ್ತಿಗಳು.',
            '• ವೈದ್ಯರು, ಇಂಜಿನಿಯರ್‌ಗಳು, ವಕೀಲರು ಮುಂತಾದ ವೃತ್ತಿಪರರು.',
          ]
        : (scheme.ineligibilityReasons || []).map((item) => `• ${item}`)),
      '',
      `**ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಮಾಹಿತಿ:** [${scheme.officialUrl}](${scheme.officialUrl}) *(ಮೂಲ: ${scheme.source})*`,
    ];
    return { text: lines.join('\n'), intent: 'ELIGIBILITY', targetSchemeId: scheme.id, language };
  }

  if (language === 'Hindi') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} के लिए पात्रता आवश्यकताएं`,
      '',
      `**कौन आवेदन कर सकता है:**`,
      ...(isPmKisan
        ? [
            '• परिवार के नाम पर कृषि योग्य भूमि का मालिकाना हक होना चाहिए।',
            '• राज्य भू-अभिलेख पोर्टल पर खसरा/खतौनी सत्यापित होनी चाहिए।',
            '• बैंक खाता आधार से लिंक और डीबीटी (DBT) सक्रिय होना चाहिए।',
            '• पीएम-किसान पोर्टल पर अनिवार्य ई-केवाईसी पूरी होनी चाहिए।',
          ]
        : (scheme.eligibilityCriteria || [scheme.eligibility]).map((item) => `• ${item}`)),
      '',
      `**प्रमुख अपात्रता एवं बहिष्करण नियम:**`,
      ...(isPmKisan
        ? [
            '• संवैधानिक पद धारक (वर्तमान या पूर्व)।',
            '• सरकारी कर्मचारी और ₹10,000 से अधिक मासिक पेंशन पाने वाले सेवानिवृत्त।',
            '• पिछले निर्धारण वर्ष में आयकर का भुगतान करने वाले व्यक्ति।',
            '• डॉक्टर, इंजीनियर, वकील और सीए जैसे पंजीकृत पेशेवर।',
          ]
        : (scheme.ineligibilityReasons || []).map((item) => `• ${item}`)),
      '',
      `**सत्यापित आधिकारिक पोर्टल:** [${scheme.officialUrl}](${scheme.officialUrl}) *(स्रोत: ${scheme.source})*`,
    ];
    return { text: lines.join('\n'), intent: 'ELIGIBILITY', targetSchemeId: scheme.id, language };
  }

  // English
  const criteria = scheme.eligibilityCriteria || [scheme.eligibility];
  const ineligibility = scheme.ineligibilityReasons || [];

  const lines = [
    `### Eligibility Requirements for ${scheme.name}`,
    '',
    `**Who Can Apply:**`,
    ...criteria.map((item) => `• ${item}`),
  ];

  if (ineligibility.length > 0) {
    lines.push('', `**Key Ineligibility & Exclusion Rules:**`, ...ineligibility.map((item) => `• ${item}`));
  }

  lines.push(
    '',
    `**Verification Source**\nDetails confirmed from [${scheme.officialUrl}](${scheme.officialUrl}) *(Source: ${scheme.source})*. Official state/central nodal verification applies during application processing.`
  );

  return { text: lines.join('\n'), intent: 'ELIGIBILITY', targetSchemeId: scheme.id, language };
}

function formatDocumentsResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} ಯೋಜನೆಗೆ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು`,
      '',
      `ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮುನ್ನ ಕೆಳಗಿನ ಪರಿಶೀಲಿಸಿದ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ:`,
      '',
      ...(isPmKisan
        ? [
            '• **ಆಧಾರ್ ಕಾರ್ಡ್** (ಗುರುತಿನ ಪುರಾವೆ ಮತ್ತು ಇ-ಕೆವೈಸಿಗಾಗಿ ಕಡ್ಡಾಯ)',
            '• **ಕೃಷಿ ಜಮೀನಿನ ಪಹಣಿ (RTC) / ಖಾತೆ ದಾಖಲೆಗಳು** (ಅರ್ಜಿದಾರರ ಹೆಸರಿನಲ್ಲಿರುವ ಭೂಮಿ)',
            '• **ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್** (ಆಧಾರ್ ಸೀಡಿಂಗ್ ಮತ್ತು ಡಿಬಿಟಿ ಸಕ್ರಿಯವಾಗಿರಬೇಕು)',
            '• **ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ** (ಆಧಾರ್ ಒಟಿಪಿ ದೃಢೀಕರಣಕ್ಕಾಗಿ)',
          ]
        : scheme.documents.map((doc) => `• **${doc}**`)),
      '',
      `**ಪ್ರಮುಖ ಸಲ್ಲಿಕೆ ಸಲಹೆಗಳು:**\n• ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರು ಒಂದೇ ರೀತಿಯಾಗಿರಬೇಕು.\n• ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಡಿಬಿಟಿ (DBT) ಲಿಂಕ್ ಆಗಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.`,
      '',
      `**ಅಧಿಕೃತ ಅರ್ಜಿ ಪೋರ್ಟಲ್:** [${scheme.officialUrl}](${scheme.officialUrl})`,
    ];
    return { text: lines.join('\n'), intent: 'DOCUMENTS', targetSchemeId: scheme.id, language };
  }

  if (language === 'Hindi') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ${scheme.name} के लिए आवश्यक दस्तावेज`,
      '',
      `आवेदन शुरू करने से पहले कृपया निम्नलिखित सत्यापित दस्तावेज तैयार रखें:`,
      '',
      ...(isPmKisan
        ? [
            '• **आधार कार्ड** (पहचान एवं अनिवार्य ई-केवाईसी हेतु)',
            '• **कृषि भूमि के दस्तावेज** (खसरा / खतौनी / जमाबंदी नकल)',
            '• **बैंक पासबुक** (आधार सीडेड और डीबीटी सक्रिय खाता)',
            '• **सक्रिय मोबाइल नंबर** (आधार ओटीपी सत्यापन हेतु)',
          ]
        : scheme.documents.map((doc) => `• **${doc}**`)),
      '',
      `**महत्वपूर्ण सुझाव:**\n• आधार और बैंक पासबुक में नाम बिल्कुल समान होना चाहिए।\n• बैंक खाता डीबीटी सक्षम होना आवश्यक है।`,
      '',
      `**आधिकारिक आवेदन पोर्टल:** [${scheme.officialUrl}](${scheme.officialUrl})`,
    ];
    return { text: lines.join('\n'), intent: 'DOCUMENTS', targetSchemeId: scheme.id, language };
  }

  // English
  const lines = [
    `### Required Documents for ${scheme.name}`,
    '',
    `Please prepare the following verified documents before starting your application:`,
    '',
    ...scheme.documents.map((doc) => `• **${doc}**`),
    '',
    `**Important Submission Tips:**\n• Ensure your name and personal details match identically on your Aadhaar and bank passbook.\n• Bank accounts must have active Aadhaar seeding and Direct Benefit Transfer (DBT) enabled.\n• Check specific file size requirements (usually PDF/JPG under 200KB) when uploading to the official portal.`,
    '',
    `**Official Application Portal:** [${scheme.officialUrl}](${scheme.officialUrl})`,
  ];

  return { text: lines.join('\n'), intent: 'DOCUMENTS', targetSchemeId: scheme.id, language };
}

function formatApplicationProcessResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    const lines = [
      `### ${scheme.name} ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಹಂತ-ಹಂತದ ವಿಧಾನ`,
      '',
      `**ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಹಂತಗಳು:**`,
      `1. ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ: ${scheme.officialUrl}`,
      '2. ಹೊಸ ರೈತ/ಫಲಾನುಭವಿ ನೋಂದಣಿ ("New Registration") ಆಯ್ಕೆಮಾಡಿ.',
      '3. ಆಧಾರ್ ಸಂಖ್ಯೆ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಒಟಿಪಿ ದೃಢೀಕರಿಸಿ.',
      '4. ಅಗತ್ಯ ವೈಯಕ್ತಿಕ ಮತ್ತು ದಾಖಲೆ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
      '5. ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ ಸ್ವೀಕೃತಿ ರಸೀದಿಯನ್ನು ಮುದ್ರಿಸಿಕೊಳ್ಳಿ.',
      '',
      `**ಆಫ್‌ಲೈನ್ / ಸಹಾಯಕ ಮಾರ್ಗ:**`,
      'ಹತ್ತಿರದ ಸಾಮಾನ್ಯ ಸೇವಾ ಕೇಂದ್ರ (CSC / ಗ್ರಾಮ ಒನ್) ಅಥವಾ ಸ್ಥಳೀಯ ಇಲಾಖಾ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.',
      '',
      `**ಅಧಿಕೃತ ಜಾಲತಾಣ ಲಿಂಕ್:** [${scheme.officialUrl}](${scheme.officialUrl})`,
    ];
    return { text: lines.join('\n'), intent: 'APPLICATION_PROCESS', targetSchemeId: scheme.id, language };
  }

  if (language === 'Hindi') {
    const lines = [
      `### ${scheme.name} के लिए चरणबद्ध आवेदन प्रक्रिया`,
      '',
      `**ऑनलाइन आवेदन के चरण:**`,
      `1. आधिकारिक पोर्टल पर जाएं: ${scheme.officialUrl}`,
      '2. "New Registration" विकल्प का चयन करें।',
      '3. आधार संख्या और मोबाइल नंबर दर्ज कर ओटीपी से सत्यापन करें।',
      '4. व्यक्तिगत एवं आवश्यक दस्तावेज विवरण भरें।',
      '5. फॉर्म सबमिट करें और पंजीकरण पर्ची सुरक्षित रखें।',
      '',
      `**ऑफलाइन सहायता:**`,
      'अपने नजदीकी कॉमन सर्विस सेंटर (CSC) या ब्लॉक कार्यालय जाकर भी आवेदन कर सकते हैं।',
      '',
      `**आधिकारिक पोर्टल लिंक:** [${scheme.officialUrl}](${scheme.officialUrl})`,
    ];
    return { text: lines.join('\n'), intent: 'APPLICATION_PROCESS', targetSchemeId: scheme.id, language };
  }

  // English
  const steps = scheme.applicationSteps || [
    `1. Visit the official portal at ${scheme.officialUrl}`,
    '2. Register using your Aadhaar and mobile number.',
    '3. Upload required documents and submit.',
  ];

  const lines = [
    `### Step-by-Step Application Guide for ${scheme.name}`,
    '',
    `**Online Application Steps:**`,
    ...steps,
  ];

  if (scheme.offlineApplication) {
    lines.push('', `**Offline / Assisted Route:**`, scheme.offlineApplication);
  }

  lines.push(
    '',
    `**Official Portal Link:**\nApply directly on [${scheme.officialUrl}](${scheme.officialUrl}) *(Verified Government Domain)*`
  );

  return { text: lines.join('\n'), intent: 'APPLICATION_PROCESS', targetSchemeId: scheme.id, language };
}

function formatOfficialLinkResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ${scheme.name} ಅಧಿಕೃತ ಜಾಲತಾಣ ಲಿಂಕ್\n\nನೀವು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅನ್ನು ನೇರವಾಗಿ ಇಲ್ಲಿ ಪ್ರವೇಶಿಸಬಹುದು:\n\n🌐 **ಅಧಿಕೃತ ಜಾಲತಾಣ:** [${scheme.officialUrl}](${scheme.officialUrl})\n\n**ಪೋರ್ಟಲ್ ವಿವರಗಳು:**\n• **ಡೊಮೇನ್:** ${scheme.source}\n• **ಆಡಳಿತ:** ಭಾರತ ಸರ್ಕಾರ\n• **ಪರಿಶೀಲಿಸಿದ ದಿನಾಂಕ:** ${scheme.lastUpdated}\n\n*ಸುರಕ್ಷತಾ ಸೂಚನೆ: ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸುವ ಮೊದಲು ವೆಬ್ ವಿಳಾಸವು https:// ನೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗುವುದನ್ನು ಮತ್ತು .gov.in ಡೊಮೇನ್ ಹೊಂದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.*`,
      intent: 'OFFICIAL_LINK',
      targetSchemeId: scheme.id,
      language,
    };
  }

  if (language === 'Hindi') {
    return {
      text: `### ${scheme.name} के लिए आधिकारिक पोर्टल लिंक\n\nआप सीधे आधिकारिक सरकारी पोर्टल पर यहां जा सकते हैं:\n\n🌐 **आधिकारिक वेबसाइट:** [${scheme.officialUrl}](${scheme.officialUrl})\n\n**पोर्टल विवरण:**\n• **डोमेन:** ${scheme.source}\n• **प्रशासन:** भारत सरकार / केंद्रीय क्षेत्र\n• **सत्यापित तिथि:** ${scheme.lastUpdated}\n\n*सुरक्षा सुझाव: व्यक्तिगत विवरण दर्ज करने से पहले हमेशा सुनिश्चित करें कि वेबसाइट पता https:// से शुरू होता है और .gov.in डोमेन पर है।*`,
      intent: 'OFFICIAL_LINK',
      targetSchemeId: scheme.id,
      language,
    };
  }

  // English
  return {
    text: `### Official Portal Link for ${scheme.name}\n\nYou can access the official, verified government portal directly at:\n\n🌐 **Official Website:** [${scheme.officialUrl}](${scheme.officialUrl})\n\n**Official Portal Details:**\n• **Domain:** ${scheme.source}\n• **Administration:** Government of India / Central Sector\n• **Last Verified Date:** ${scheme.lastUpdated}\n\n*Security Note: Always ensure the web address begins with https:// and ends in an authorized government domain (such as .gov.in or .nic.in) before submitting personal details.*`,
    intent: 'OFFICIAL_LINK',
    targetSchemeId: scheme.id,
    language,
  };
}

function formatPersonalEligibilityResponse(
  scheme: Scheme,
  userProfile?: UserProfile | null,
  language: SupportedLanguage = 'English'
): BotResponseResult {
  if (language === 'Kannada') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### ಅರ್ಹತಾ ಮೌಲ್ಯಮಾಪನ: ${scheme.name}`,
      '',
      `**ಮುಖ್ಯ ಅರ್ಹತಾ ಷರತ್ತುಗಳು:**`,
      ...(isPmKisan
        ? [
            '• ಸಾಗುವಳಿ ಮಾಡಬಹುದಾದ ಕೃಷಿ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬ.',
            '• ರಾಜ್ಯ ಭೂ ದಾಖಲೆಗಳಲ್ಲಿ ಪಹಣಿ (RTC) ನವೀಕರಣ.',
            '• ಆಧಾರ್ ಲಿಂಕ್ ಮತ್ತು ಡಿಬಿಟಿ ಸಕ್ರಿಯವಾದ ಬ್ಯಾಂಕ್ ಖಾತೆ.',
            '• ಕಡ್ಡಾಯ ಇ-ಕೆವೈಸಿ (e-KYC) ಪೂರ್ಣಗೊಂಡಿರಬೇಕು.',
          ]
        : (scheme.eligibilityCriteria || [scheme.eligibility]).map((c) => `• ${c}`)),
      '',
      `**ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ವಿವರಗಳು:**`,
      userProfile?.occupation ? `• ಉದ್ಯೋಗ: ${userProfile.occupation}` : '• ಉದ್ಯೋಗ: ನಿರ್ದಿಷ್ಟಪಡಿಸಿಲ್ಲ',
      userProfile?.state ? `• ರಾಜ್ಯ: ${userProfile.state}` : '',
      userProfile?.ownsLand !== undefined ? `• ಕೃಷಿ ಜಮೀನು ಇದೆಯೇ: ${userProfile.ownsLand ? 'ಹೌದು' : 'ಇಲ್ಲ'}` : '',
      '',
      `**ಅರ್ಹತೆ ದೃಢೀಕರಿಸಲು ಅಗತ್ಯವಿರುವ ಮಾಹಿತಿ:**`,
      '❓ ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಜಮೀನಿನ ಪಹಣಿ (RTC) ಇದೆಯೇ?',
      '❓ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಡಿಬಿಟಿ (DBT) ಸಕ್ರಿಯವಾಗಿದೆಯೇ?',
      '❓ ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಾ?',
      '❓ ನೀವು ಅಥವಾ ನಿಮ್ಮ ಕುಟುಂಬದವರು ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರೇ? (ಇಲ್ಲ ಎಂದಿರಬೇಕು)',
      '',
      `⚠️ **ಮುಖ್ಯ ಸೂಚನೆ ಮತ್ತು ಎಚ್ಚರಿಕೆ:**\nಸ್ಕೀಮ್ ಸಾಥಿ ಪ್ರಾಥಮಿಕ ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. **ಈ ಚಾಟ್‌ಬಾಟ್‌ನಿಂದ ಅರ್ಹತೆಯನ್ನು ಎಂದಿಗೂ ಖಾತರಿಪಡಿಸಲಾಗುವುದಿಲ್ಲ.** ಅಧಿಕೃತ ಅನುಮೋದನೆಯನ್ನು ಕೃಷಿ ಇಲಾಖೆ ಮತ್ತು [${scheme.officialUrl}](${scheme.officialUrl}) ಪೋರ್ಟಲ್ ಮಾತ್ರ ನಿರ್ಧರಿಸುತ್ತದೆ.`,
    ].filter(Boolean);

    return {
      text: lines.join('\n'),
      actionButton: {
        label: 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ನಡೆಸಿ',
        route: '/eligibility',
      },
      intent: 'PERSONAL_ELIGIBILITY',
      targetSchemeId: scheme.id,
      language,
    };
  }

  if (language === 'Hindi') {
    const isPmKisan = scheme.id === 'pm-kisan';
    const lines = [
      `### पात्रता मूल्यांकन: ${scheme.name}`,
      '',
      `**मुख्य पात्रता शर्तें:**`,
      ...(isPmKisan
        ? [
            '• परिवार के नाम पर कृषि योग्य भूमि का स्वामित्व होना चाहिए।',
            '• राज्य भूलेख में खसरा/खतौनी सत्यापित होनी चाहिए।',
            '• बैंक खाता आधार सीडेड और डीबीटी सक्षम होना चाहिए।',
            '• अनिवार्य ई-केवाईसी पूरी होनी चाहिए।',
          ]
        : (scheme.eligibilityCriteria || [scheme.eligibility]).map((c) => `• ${c}`)),
      '',
      `**आपके प्रोफाइल विवरण:**`,
      userProfile?.occupation ? `• व्यवसाय: ${userProfile.occupation}` : '• व्यवसाय: निर्दिष्ट नहीं',
      userProfile?.state ? `• राज्य: ${userProfile.state}` : '',
      userProfile?.ownsLand !== undefined ? `• क्या कृषि भूमि है: ${userProfile.ownsLand ? 'हाँ' : 'नहीं'}` : '',
      '',
      `**पात्रता पुष्टि के लिए आवश्यक जानकारी:**`,
      '❓ क्या आपके नाम पर कृषि भूमि का खसरा/खतौनी है?',
      '❓ क्या बैंक खाते में डीबीटी (DBT) सक्रिय है?',
      '❓ क्या आपने ई-केवाईसी पूरी कर ली है?',
      '❓ क्या आप आयकर दाता हैं? (नहीं होना चाहिए)',
      '',
      `⚠️ **महत्वपूर्ण सूचना एवं अस्वीकरण:**\nस्कीम साथी केवल प्रारंभिक मार्गदर्शन प्रदान करता है। **इस चैटबॉट द्वारा पात्रता की गारंटी कभी नहीं दी जा सकती।** अंतिम स्वीकृति आधिकारिक सरकारी विभाग द्वारा [${scheme.officialUrl}](${scheme.officialUrl}) पर दी जाती है।`,
    ].filter(Boolean);

    return {
      text: lines.join('\n'),
      actionButton: {
        label: 'पूरी पात्रता जांच करें',
        route: '/eligibility',
      },
      intent: 'PERSONAL_ELIGIBILITY',
      targetSchemeId: scheme.id,
      language,
    };
  }

  // English
  const knownDetails: string[] = [];
  const missingQuestions: string[] = [];

  const occupation = userProfile?.occupation;
  const ownsLand = userProfile?.ownsLand ?? userProfile?.landOwned;
  const age = userProfile?.age;
  const incomeRange = userProfile?.incomeRange;
  const state = userProfile?.state;

  if (state) knownDetails.push(`State of Residence: ${state}`);
  if (occupation) knownDetails.push(`Occupation: ${occupation}`);
  if (age !== undefined) knownDetails.push(`Age: ${age} years`);
  if (incomeRange) knownDetails.push(`Income Range: ${incomeRange}`);
  if (ownsLand !== undefined) knownDetails.push(`Owns Agricultural Land: ${ownsLand ? 'Yes' : 'No'}`);

  if (scheme.id === 'pm-kisan') {
    if (ownsLand === undefined) {
      missingQuestions.push('Do you or your family hold cultivable agricultural land registered in your name?');
    }
    missingQuestions.push('Is your bank account seeded with Aadhaar and enabled for DBT (Direct Benefit Transfer)?');
    missingQuestions.push('Have you completed mandatory e-KYC on the PM-KISAN portal?');
    missingQuestions.push('Are you or any family member an income tax payer, government employee, or monthly pensioner over ₹10,000? (Must be NO)');
  } else {
    missingQuestions.push('Do you satisfy the published eligibility criteria on the official portal?');
  }

  const lines = [
    `### Eligibility Assessment: ${scheme.name}`,
    '',
    `**Core Eligibility Criteria:**`,
    ...(scheme.eligibilityCriteria || [scheme.eligibility]).map((c) => `• ${c}`),
    '',
    `**Your Stated Profile Details:**`,
    ...(knownDetails.length > 0 ? knownDetails.map((d) => `• ${d}`) : ['• No detailed profile information provided yet.']),
    '',
    `**Information Needed to Confirm Eligibility:**`,
    ...missingQuestions.map((q) => `❓ ${q}`),
    '',
    `⚠️ **Important Notice & Disclaimer:**\nScheme Saathi provides preliminary informational guidance. **Eligibility can never be officially guaranteed by this chatbot.** Final approval is subject to document scrutiny and biometric e-KYC verification by designated government authorities at [${scheme.officialUrl}](${scheme.officialUrl}).`,
  ];

  return {
    text: lines.join('\n'),
    actionButton: {
      label: 'Take full eligibility check',
      route: '/eligibility',
    },
    intent: 'PERSONAL_ELIGIBILITY',
    targetSchemeId: scheme.id,
    language,
  };
}

function formatIneligibilityResponse(scheme: Scheme, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ${scheme.name} ಯೋಜನೆಯ ಅನರ್ಹತಾ ನಿಯಮಗಳು\n\nಅಧಿಕೃತ ನಿಯಮಗಳ ಪ್ರಕಾರ, ಕೆಳಗಿನ ಷರತ್ತುಗಳನ್ನು ಹೊಂದಿರುವವರು **ಅರ್ಹತೆ ಹೊಂದಿರುವುದಿಲ್ಲ**:\n\n• ಸಾಂವಿಧಾನಿಕ ಹುದ್ದೆಗಳನ್ನು ಹೊಂದಿರುವವರು ಅಥವಾ ಹೊಂದಿದ್ದವರು.\n• ಸರ್ಕಾರಿ ನೌಕರರು ಮತ್ತು ಮಾಸಿಕ ₹10,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಪಿಂಚಣಿ ಪಡೆಯುವವರು.\n• ಕಳೆದ ವರ್ಷ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿಸಿದವರು.\n• ನೋಂದಾಯಿತ ವೃತ್ತಿಪರರು (ವೈದ್ಯರು, ಇಂಜಿನಿಯರ್‌ಗಳು, ವಕೀಲರು).\n\nಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳು: [${scheme.officialUrl}](${scheme.officialUrl})`,
      intent: 'INELIGIBILITY',
      targetSchemeId: scheme.id,
      language,
    };
  }

  if (language === 'Hindi') {
    return {
      text: `### ${scheme.name} के लिए अपात्रता के कारण\n\nसरकारी नियमों के अनुसार, निम्नलिखित श्रेणियों के आवेदक **अपात्र होंगे**:\n\n• संवैधानिक पद धारक।\n• सरकारी कर्मचारी और ₹10,000 से अधिक मासिक पेंशन पाने वाले सेवानिवृत्त।\n• पिछले वर्ष आयकर का भुगतान करने वाले।\n• पेशेवर डॉक्टर, इंजीनियर, वकील और सीए।\n\nआधिकारिक दिशानिर्देश: [${scheme.officialUrl}](${scheme.officialUrl})`,
      intent: 'INELIGIBILITY',
      targetSchemeId: scheme.id,
      language,
    };
  }

  const ineligibility = scheme.ineligibilityReasons || [
    'Failure to provide valid identity or address documents.',
    'Exceeding specified income or property thresholds.',
  ];

  const lines = [
    `### Reasons for Ineligibility: ${scheme.name}`,
    '',
    `Under official statutory guidelines, an applicant **cannot qualify or will be excluded** if they meet any of the following conditions:`,
    '',
    ...ineligibility.map((reason) => `❌ **${reason}**`),
    '',
    `Official guidelines: [${scheme.officialUrl}](${scheme.officialUrl})`,
  ];

  return { text: lines.join('\n'), intent: 'INELIGIBILITY', targetSchemeId: scheme.id, language };
}

function formatSchemeComparison(s1: Scheme, s2: Scheme, language: SupportedLanguage): BotResponseResult {
  const lines = [
    `### Scheme Comparison: ${s1.shortName || s1.name} vs ${s2.shortName || s2.name}`,
    '',
    `| Feature | ${s1.shortName || s1.name} | ${s2.shortName || s2.name} |`,
    `| :--- | :--- | :--- |`,
    `| **Category** | ${s1.category} | ${s2.category} |`,
    `| **Benefit** | ${s1.benefit} | ${s2.benefit} |`,
    `| **Eligibility** | ${s1.eligibility} | ${s2.eligibility} |`,
    `| **Official Portal** | [${s1.source}](${s1.officialUrl}) | [${s2.source}](${s2.officialUrl}) |`,
  ];

  return {
    text: lines.join('\n'),
    schemes: [s1, s2],
    intent: 'COMPARISON',
    language,
  };
}

function formatCategoryRecommendations(
  category: string,
  excludeSchemeId?: string,
  language: SupportedLanguage = 'English'
): BotResponseResult {
  const allCategorySchemes = MOCK_SCHEMES.filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );

  const displaySchemes = excludeSchemeId
    ? allCategorySchemes.filter((s) => s.id !== excludeSchemeId)
    : allCategorySchemes;

  const targetSchemes = displaySchemes.length > 0 ? displaySchemes : allCategorySchemes;

  if (language === 'Kannada') {
    const lines = [
      `### ${category === 'Farmers' ? 'ರೈತರಿಗಾಗಿ' : category} ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು`,
      '',
      `ಇಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾದ ಕೇಂದ್ರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಲಭ್ಯವಿವೆ:`,
      '',
      ...targetSchemes.map((s) => {
        let localizedDesc = s.benefit;
        if (s.id === 'pmfby') localizedDesc = 'ಬೆಳೆ ಹಾನಿಗೆ ಸಮಗ್ರ ಬೆಳೆ ವಿಮೆ ರಕ್ಷಣೆ (ಖಾರೀಫ್ 2%, ರಬಿ 1.5% ಕಂತು ದರ).';
        if (s.id === 'kcc') localizedDesc = 'ಕೇವಲ 4% ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರದಲ್ಲಿ ₹3 ಲಕ್ಷದವರೆಗೆ ಕೃಷಿ ಮತ್ತು ಬೆಳೆ ಸಾಲ.';
        if (s.id === 'pm-kmy') localizedDesc = '60 ವರ್ಷ ತುಂಬಿದ ನಂತರ ತಿಂಗಳಿಗೆ ₹3,000 ಖಾತರಿಯ ಮಾಸಿಕ ಪಿಂಚಣಿ.';
        return `• **${s.name} (${s.shortName || s.name})**\n  - **ಪ್ರಯೋಜನ:** ${localizedDesc}\n  - **ಅರ್ಹತೆ:** ${s.eligibility}\n  - **ಅಧಿಕೃತ ಜಾಲತಾಣ:** [${s.officialUrl}](${s.officialUrl})`;
      }),
      '',
      `*ಯಾವುದೇ ಯೋಜನೆಯ ದಾಖಲೆಗಳು ಅಥವಾ ಅರ್ಜಿ ವಿಧಾನದ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ಕೇಳಬಹುದು.*`,
    ];

    return {
      text: lines.join('\n'),
      schemes: targetSchemes,
      intent: 'RECOMMENDED_SCHEMES',
      targetSchemeId: targetSchemes[0]?.id,
      language,
    };
  }

  if (language === 'Hindi') {
    const lines = [
      `### ${category === 'Farmers' ? 'किसानों के लिए' : category} सरकारी योजनाएं`,
      '',
      `यहाँ सत्यापित केंद्रीय कल्याणकारी योजनाएं उपलब्ध हैं:`,
      '',
      ...targetSchemes.map((s) => {
        let localizedDesc = s.benefit;
        if (s.id === 'pmfby') localizedDesc = 'फसल नुकसान और प्राकृतिक आपदाओं के लिए व्यापक फसल बीमा।';
        if (s.id === 'kcc') localizedDesc = '4% की रियायती ब्याज दर पर ₹3 लाख तक का कृषि ऋण।';
        if (s.id === 'pm-kmy') localizedDesc = '60 वर्ष की आयु के बाद ₹3,000 प्रति माह की गारंटीकृत पेंशन।';
        return `• **${s.name} (${s.shortName || s.name})**\n  - **लाभ:** ${localizedDesc}\n  - **पात्रता:** ${s.eligibility}\n  - **आधिकारिक पोर्टल:** [${s.officialUrl}](${s.officialUrl})`;
      }),
      '',
      `*किसी भी योजना के दस्तावेज या आवेदन प्रक्रिया के बारे में निसंकोच पूछें।*`,
    ];

    return {
      text: lines.join('\n'),
      schemes: targetSchemes,
      intent: 'RECOMMENDED_SCHEMES',
      targetSchemeId: targetSchemes[0]?.id,
      language,
    };
  }

  // English
  const lines = [
    `### Government Schemes for ${category}`,
    '',
    `Here are verified central government schemes available for **${category}**:`,
    '',
    ...targetSchemes.map(
      (s) =>
        `• **${s.name} (${s.shortName || s.name})**\n  - **Benefit:** ${s.benefit}\n  - **Eligibility:** ${s.eligibility}\n  - **Official Portal:** [${s.officialUrl}](${s.officialUrl})`
    ),
    '',
    `*Ask me any follow-up question (e.g. "What documents are required for PM Fasal Bima Yojana?" or "How can I apply for Kisan Credit Card?").*`,
  ];

  return {
    text: lines.join('\n'),
    schemes: targetSchemes,
    intent: 'RECOMMENDED_SCHEMES',
    targetSchemeId: targetSchemes[0]?.id,
    language,
  };
}

function formatGreetingResponse(userProfile: UserProfile | null | undefined, language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ನಮಸ್ಕಾರ! ಸ್ಕೀಮ್ ಸಾಥಿಗೆ ಸ್ವಾಗತ\n\nನಾನು ಭಾರತೀಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗಾಗಿ ನಿಮ್ಮ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಮಾರ್ಗದರ್ಶಿ.\n\nನೀವು ಈ ಕೆಳಗಿನವುಗಳನ್ನು ಕೇಳಬಹುದು:\n• **ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ** (ರೈತರು, ವಿದ್ಯಾರ್ಥಿಗಳು, ಆರೋಗ್ಯ, ವಸತಿ, ವ್ಯವಹಾರ, ಹಿರಿಯ ನಾಗರಿಕರು)\n• **ಅರ್ಹತಾ ಷರತ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ**\n• **ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಪಡೆಯಿರಿ**\n• **ಹಂತ-ಹಂತದ ಅರ್ಜಿ ವಿಧಾನ ಮತ್ತು ಅಧಿಕೃತ ಲಿಂಕ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ**\n\nನಾನು ನಿಮಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`,
      intent: 'GREETING',
      language,
    };
  }

  if (language === 'Hindi') {
    return {
      text: `### नमस्ते! स्कीम साथी में आपका स्वागत है\n\nमैं भारतीय सरकारी योजनाओं के लिए आपका डिजिटल गाइड हूँ।\n\nआप मुझसे पूछ सकते हैं:\n• **श्रेणी अनुसार योजनाएं** (किसान, छात्र, स्वास्थ्य, आवास, व्यापार, वरिष्ठ नागरिक)\n• **पात्रता आवश्यकताएं**\n• **आवश्यक दस्तावेजों की सूची**\n• **चरणबद्ध आवेदन प्रक्रिया और आधिकारिक लिंक**\n\nआज मैं आपकी क्या मदद कर सकता हूँ?`,
      intent: 'GREETING',
      language,
    };
  }

  return {
    text: `### Namaste! Welcome to Scheme Saathi\n\nI am your verified digital guide for Indian government schemes and citizen services.\n\nYou can ask me to:\n• **Explore schemes** by category (Farmers, Students, Health, Housing, Business, Seniors)\n• **Check eligibility requirements** for any specific scheme\n• **View complete document checklists**\n• **Learn step-by-step application procedures** and get direct official .gov.in links\n\nHow can I help you today?`,
    intent: 'GREETING',
    language,
  };
}

function formatEligibilityCheckShortcut(language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ಯೋಜನೆ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ\n\nನಮ್ಮ ಹಂತ-ಹಂತದ ಅರ್ಹತಾ ಪರಿಶೀಲನಾ ಸಾಧನದ ಮೂಲಕ ನೀವು ಎಲ್ಲಾ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.\n\nಕೆಲವು ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ತಕ್ಷಣದ ವೈಯಕ್ತಿಕ ಮೌಲ್ಯಮಾಪನ ಪಡೆಯಿರಿ.`,
      actionButton: {
        label: 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ಪ್ರಾರಂಭಿಸಿ',
        route: '/eligibility',
      },
      intent: 'ELIGIBILITY_TOOL',
      language,
    };
  }

  return {
    text: `### Scheme Eligibility Check\n\nYou can check your eligibility across all central and state welfare programmes through our structured step-by-step tool.\n\nAnswer a few simple questions regarding your occupation, age, state, and category to receive an instant personalised eligibility assessment.`,
    actionButton: {
      label: 'Start eligibility check',
      route: '/eligibility',
    },
    intent: 'ELIGIBILITY_TOOL',
    language,
  };
}

function formatGenericExplore(language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ\n\nಸ್ಕೀಮ್ ಸಾಥಿ ಪ್ರಮುಖ ನಾಗರಿಕ ವರ್ಗಗಳ ಪರಿಶೀಲಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಒಳಗೊಂಡಿದೆ:\n\n• **ರೈತರು:** ಪಿಎಂ-ಕಿಸಾನ್, ಪಿಎಂ ಫಸಲ್ ಬಿಮಾ, ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್\n• **ಆರೋಗ್ಯ:** ಆಯುಷ್ಮಾನ್ ಭಾರತ್ (PM-JAY)\n• **ವಸತಿ:** ಪಿಎಂ ಆವಾಸ್ ಯೋಜನೆ (PMAY)\n• **ವಿದ್ಯಾರ್ಥಿಗಳು:** ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (NSP)\n• **ವ್ಯವಹಾರ:** ಪಿಎಂ ಮುದ್ರಾ ಯೋಜನೆ, ಪಿಎಂ ಸ್ವನಿಧಿ\n• **ಪಿಂಚಣಿ:** ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ (APY)\n\nಯಾವುದೇ ಯೋಜನೆಯ ಬಗ್ಗೆ ವಿವರಗಳನ್ನು ಕೇಳಿ ಅಥವಾ ಯೋಜನೆ ಸಂಗ್ರಹವನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.`,
      schemes: MOCK_SCHEMES.slice(0, 4),
      actionButton: {
        label: 'ಯೋಜನೆ ಸಂಗ್ರಹ ವೀಕ್ಷಿಸಿ',
        route: '/library',
      },
      intent: 'EXPLORE_ALL_SCHEMES',
      language,
    };
  }

  return {
    text: `### Explore Government Schemes\n\nScheme Saathi maintains verified information across key citizen categories:\n\n• **Farmers**: PM-KISAN Samman Nidhi, PM Fasal Bima Yojana, Kisan Credit Card, PM Kisan Maan-Dhan\n• **Health**: Ayushman Bharat (PM-JAY)\n• **Housing**: PM Awas Yojana (PMAY-G & PMAY-U)\n• **Students**: National Scholarship Portal (NSP)\n• **Business & Self-Employed**: PM Mudra Yojana, PM SVANidhi\n• **Seniors & Pensioners**: Atal Pension Yojana (APY)\n• **Women & Girls**: Sukanya Samriddhi Yojana (SSY)\n\nAsk about any scheme above, or browse the complete scheme library.`,
    schemes: MOCK_SCHEMES.slice(0, 4),
    actionButton: {
      label: 'Browse scheme library',
      route: '/library',
    },
    intent: 'EXPLORE_ALL_SCHEMES',
    language,
  };
}

function formatFallbackResponse(language: SupportedLanguage): BotResponseResult {
  if (language === 'Kannada') {
    return {
      text: `### ಸ್ಕೀಮ್ ಸಾಥಿ ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶಿ\n\nನಮ್ಮ ಪರಿಶೀಲಿಸಿದ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಶಬ್ದಗಳಿಗೆ ಸರಿಹೊಂದುವ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆಯನ್ನು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.\n\nನಿಖರವಾದ ಮಾಹಿತಿಗಾಗಿ ಹೀಗೆ ಪ್ರಯತ್ನಿಸಿ:\n• ಯೋಜನೆಯ ಹೆಸರು ತಿಳಿಸಿ (ಉದಾ: **PM-KISAN**, **ಆಯುಷ್ಮಾನ್ ಭಾರತ್**, **ಪಿಎಂ ಆವಾಸ್**, **ಮುದ್ರಾ ಸಾಲ**)\n• ವರ್ಗದ ಮೂಲಕ ಕೇಳಿ (ಉದಾ: *"ರೈತರಿಗೆ ಯಾವ ಯೋಜನೆಗಳಿವೆ?"*, *"ವಿದ್ಯಾರ್ಥಿ ವೇತನಗಳು"*)\n• ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಉದಾ: *"ಪಿಎಂ-ಕಿಸಾನ್ ಪ್ರಯೋಜನಗಳೇನು?"*, *"ಆಯುಷ್ಮಾನ್ ಕಾರ್ಡ್‌ಗೆ ಯಾವ ದಾಖಲೆ ಬೇಕು?"*)\n\nಅಥವಾ ಸಂಪೂರ್ಣ ಯೋಜನೆ ಸಂಗ್ರಹವನ್ನು ವೀಕ್ಷಿಸಿ:`,
      actionButton: {
        label: 'ಯೋಜನೆ ಸಂಗ್ರಹ ವೀಕ್ಷಿಸಿ',
        route: '/library',
      },
      intent: 'FALLBACK',
      language,
    };
  }

  if (language === 'Hindi') {
    return {
      text: `### स्कीम साथी सूचनात्मक गाइड\n\nहमारे सत्यापित डेटाबेस में आपके शब्दों से मेल खाती कोई विशिष्ट योजना नहीं मिली।\n\nसटीक जानकारी के लिए ऐसे पूछें:\n• योजना का नाम बताएं (जैसे: **PM-KISAN**, **आयुष्मान भारत**, **पीएम आवास**, **मुद्रा लोन**)\n• श्रेणी के अनुसार पूछें (जैसे: *"किसानों के लिए योजनाएं"*, *"छात्रवृत्तियां"*)\n• विशिष्ट प्रश्न पूछें (जैसे: *"पीएम-किसान के क्या लाभ हैं?"*, *"आयुष्मान के लिए कौन से दस्तावेज चाहिए?"*)\n\nया पूरी योजना लाइब्रेरी देखें:`,
      actionButton: {
        label: 'योजना लाइब्रेरी देखें',
        route: '/library',
      },
      intent: 'FALLBACK',
      language,
    };
  }

  return {
    text: `### Scheme Saathi Information Guide\n\nI could not find a specific scheme matching your exact words in our verified government database.\n\nTo help you accurately, try:\n• Mentioning a scheme name (e.g. **PM-KISAN**, **Ayushman Bharat**, **PM Awas**, **PM Mudra**, **Atal Pension**, **NSP Scholarship**)\n• Asking by category (e.g. *"What schemes are available for farmers?"*, *"Scholarships for students"*)\n• Asking a specific question (e.g. *"What are the benefits of PM-KISAN?"*, *"What documents are needed for Ayushman Bharat?"*)\n\nYou can also browse the full verified scheme library:`,
    actionButton: {
      label: 'Browse scheme library',
      route: '/library',
    },
    intent: 'FALLBACK',
    language,
  };
}

/**
 * Phase 4: Dynamic Localization for Existing Chat History Messages
 * When the user switches language, previously displayed messages are translated
 * into the newly selected language without altering message IDs, timestamps, or context.
 */
export function getLocalizedMessageText(msg: ChatMessage, targetLang: SupportedLanguage): string {
  if (!msg.text) return '';

  // For user messages: translate recognized queries or return original
  if (msg.role === 'user') {
    const norm = normalize(msg.text);
    if (norm.includes('pm kisan') || norm.includes('pm-kisan') || norm.includes('ಪಿಎಂ ಕಿಸಾನ್') || norm.includes('पीएम किसान')) {
      if (norm.includes('benefit') || norm.includes('ಪ್ರಯೋಜನ') || norm.includes('लाभ')) {
        if (targetLang === 'Kannada') return 'PM-KISAN ನ ಪ್ರಯೋಜನಗಳೇನು?';
        if (targetLang === 'Hindi') return 'PM-KISAN के क्या लाभ हैं?';
        return 'What are its benefits?';
      }
      if (norm.includes('eligible') || norm.includes('ಅರ್ಹ') || norm.includes('पात्र')) {
        if (norm.includes('am i') || norm.includes('ನಾನು') || norm.includes('क्या मैं')) {
          if (targetLang === 'Kannada') return 'ನಾನು ಈ ಯೋಜನೆಗೆ ಅರ್ಹನೇ?';
          if (targetLang === 'Hindi') return 'क्या मैं इस योजना के लिए पात्र हूँ?';
          return 'Am I eligible for this scheme?';
        }
        if (targetLang === 'Kannada') return 'ಯಾರು ಅರ್ಹರು?';
        if (targetLang === 'Hindi') return 'कौन पात्र है?';
        return 'Who is eligible?';
      }
      if (norm.includes('document') || norm.includes('ದಾಖಲೆ') || norm.includes('दस्तावेज')) {
        if (targetLang === 'Kannada') return 'ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?';
        if (targetLang === 'Hindi') return 'कौन से दस्तावेज चाहिए?';
        return 'What documents are required?';
      }
      if (norm.includes('apply') || norm.includes('ಅರ್ಜಿ') || norm.includes('आवेदन')) {
        if (targetLang === 'Kannada') return 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?';
        if (targetLang === 'Hindi') return 'आवेदन कैसे करें?';
        return 'How can I apply?';
      }
      if (norm.includes('link') || norm.includes('ಲಿಂಕ್') || norm.includes('लिंक')) {
        if (targetLang === 'Kannada') return 'ಅಧಿಕೃತ ಅರ್ಜಿ ಲಿಂಕ್ ನೀಡಿ.';
        if (targetLang === 'Hindi') return 'आधिकारिक आवेदन लिंक दें।';
        return 'Give me the official application link.';
      }
      if (targetLang === 'Kannada') return 'PM-KISAN ಬಗ್ಗೆ ತಿಳಿಸಿ.';
      if (targetLang === 'Hindi') return 'PM-KISAN के बारे में बताइए।';
      return 'Tell me about PM-KISAN.';
    }

    if (norm.includes('farmer') || norm.includes('ರೈತ') || norm.includes('किसान')) {
      if (targetLang === 'Kannada') return 'ರೈತರಿಗೆ ಬೇರೆ ಯಾವ ಯೋಜನೆಗಳಿವೆ?';
      if (targetLang === 'Hindi') return 'किसानों के लिए अन्य योजनाएं क्या हैं?';
      return 'What other schemes are available for farmers?';
    }

    if (norm.includes('document') || norm.includes('ದಾಖಲೆ') || norm.includes('दस्तावेज')) {
      if (targetLang === 'Kannada') return 'ಈ ಯೋಜನೆಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?';
      if (targetLang === 'Hindi') return 'इस योजना के लिए कौन से दस्तावेज चाहिए?';
      return 'What documents are required for this scheme?';
    }

    return msg.text;
  }

  // For bot messages: resolve the message in target language
  const scheme =
    msg.schemes?.[0] ||
    (msg.targetSchemeId ? MOCK_SCHEMES.find((s) => s.id === msg.targetSchemeId) : null) ||
    (msg.schemeIds?.[0] ? MOCK_SCHEMES.find((s) => s.id === msg.schemeIds![0]) : null) ||
    findSchemeInText(msg.text);
  const textNorm = normalize(msg.text);

  if (msg.isSafetyWarning || textNorm.includes('safety') || textNorm.includes('ಸುರಕ್ಷತಾ') || textNorm.includes('सुरक्षा')) {
    return formatSafetyWarning(targetLang).text;
  }

  if (textNorm.includes('namaste') || textNorm.includes('ನಮಸ್ಕಾರ') || textNorm.includes('नमस्ते')) {
    return formatGreetingResponse(null, targetLang).text;
  }

  if (scheme) {
    if (textNorm.includes('financial') || textNorm.includes('benefit') || textNorm.includes('ಪ್ರಯೋಜನ') || textNorm.includes('लाभ') || textNorm.includes('6 000')) {
      return formatBenefitsResponse(scheme, targetLang).text;
    }
    if (textNorm.includes('document') || textNorm.includes('ದಾಖಲೆ') || textNorm.includes('दस्तावेज')) {
      return formatDocumentsResponse(scheme, targetLang).text;
    }
    if (textNorm.includes('apply') || textNorm.includes('application') || textNorm.includes('ಅರ್ಜಿ') || textNorm.includes('आवेदन')) {
      return formatApplicationProcessResponse(scheme, targetLang).text;
    }
    if (textNorm.includes('link') || textNorm.includes('ಲಿಂಕ್') || textNorm.includes('लिंक') || textNorm.includes('website')) {
      return formatOfficialLinkResponse(scheme, targetLang).text;
    }
    if (textNorm.includes('assessment') || textNorm.includes('ಮೌಲ್ಯಮಾಪನ') || textNorm.includes('मूल्यांकन')) {
      return formatPersonalEligibilityResponse(scheme, null, targetLang).text;
    }
    if (textNorm.includes('who can apply') || textNorm.includes('eligible') || textNorm.includes('ಅರ್ಹತಾ') || textNorm.includes('पात्रता')) {
      return formatGeneralEligibilityResponse(scheme, targetLang).text;
    }
    return formatGeneralSchemeInfoResponse(scheme, targetLang).text;
  }

  if (textNorm.includes('farmers') || textNorm.includes('ರೈತ') || textNorm.includes('किसान')) {
    return formatCategoryRecommendations('Farmers', undefined, targetLang).text;
  }

  return msg.text;
}
