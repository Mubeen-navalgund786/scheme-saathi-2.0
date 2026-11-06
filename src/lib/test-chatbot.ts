import { generateLocalReply } from './responder';
import { ChatMessage, UserProfile } from '../types';

const mockUser: UserProfile = {
  name: 'Ramesh Patel',
  state: 'Karnataka',
  language: 'English',
  categories: ['Farmer'],
  occupation: 'Farmer',
  ownsLand: true,
  age: 42,
  incomeRange: '1 to 3 lakh',
  notifyInApp: true,
  notifyEmail: false,
  signedIn: true,
  registered: true,
};

const conversationHistory: ChatMessage[] = [];

function ask(query: string, turnNumber: number) {
  console.log(`\n======================================================================`);
  console.log(`TURN ${turnNumber}: USER: "${query}"`);
  console.log(`======================================================================`);

  const res = generateLocalReply(query, mockUser, conversationHistory);
  console.log(`BOT RESPONSE:\n${res.text}\n`);
  if (res.schemes && res.schemes.length > 0) {
    console.log(`ATTACHED SCHEMES: ${res.schemes.map((s) => s.id).join(', ')}`);
  }
  if (res.actionButton) {
    console.log(`ACTION BUTTON: ${res.actionButton.label} -> ${res.actionButton.route}`);
  }

  // Record user & bot turns into history
  conversationHistory.push({
    id: `u-${turnNumber}`,
    role: 'user',
    text: query,
    createdAt: Date.now(),
  });
  conversationHistory.push({
    id: `b-${turnNumber}`,
    role: 'bot',
    text: res.text,
    schemeIds: res.schemes?.map((s) => s.id) || [],
    schemes: res.schemes,
    createdAt: Date.now(),
  });

  return res;
}

console.log('--- TESTING 9 REQUIRED CHATBOT QUESTIONS IN SEQUENCE ---');

// 1. Tell me about PM-KISAN.
const r1 = ask('Tell me about PM-KISAN.', 1);
if (!r1.text.includes('PM-KISAN') || !r1.schemes || r1.schemes[0].id !== 'pm-kisan') {
  throw new Error('Test 1 failed: PM-KISAN not found');
}

// 2. What are its benefits? (follow-up on PM-KISAN)
const r2 = ask('What are its benefits?', 2);
if (!r2.text.includes('6,000') || !r2.text.toLowerCase().includes('instalment')) {
  throw new Error('Test 2 failed: Benefits not properly explained');
}

// 3. Who is eligible? (follow-up on PM-KISAN)
const r3 = ask('Who is eligible?', 3);
if (!r3.text.toLowerCase().includes('cultivable') || !r3.text.toLowerCase().includes('land')) {
  throw new Error('Test 3 failed: Eligibility not properly explained');
}

// 4. What documents are required? (follow-up on PM-KISAN)
const r4 = ask('What documents are required?', 4);
if (!r4.text.toLowerCase().includes('aadhaar') || !r4.text.toLowerCase().includes('land')) {
  throw new Error('Test 4 failed: Documents not properly listed');
}

// 5. How can I apply? (follow-up on PM-KISAN)
const r5 = ask('How can I apply?', 5);
if (!r5.text.includes('https://pmkisan.gov.in') || !r5.text.toLowerCase().includes('farmer')) {
  throw new Error('Test 5 failed: Application procedure not explained');
}

// 6. Give me the official application link. (follow-up on PM-KISAN)
const r6 = ask('Give me the official application link.', 6);
if (!r6.text.includes('https://pmkisan.gov.in') || (r6.schemes && r6.schemes.length > 0)) {
  throw new Error('Test 6 failed: Link not provided directly or card spammed unnecessarily');
}

// 7. Am I eligible for this scheme? (personal eligibility assessment)
const r7 = ask('Am I eligible for this scheme?', 7);
if (!r7.text.toLowerCase().includes('disclaimer') || !r7.text.toLowerCase().includes('assessment')) {
  throw new Error('Test 7 failed: Personal eligibility assessment missing disclaimer or criteria');
}

// 8. What other schemes are available for farmers?
const r8 = ask('What other schemes are available for farmers?', 8);
if (!r8.schemes || r8.schemes.length < 2 || !r8.schemes.some((s) => s.id === 'pmfby' || s.id === 'kcc')) {
  throw new Error('Test 8 failed: Other farmer schemes not provided');
}

// 9. What documents are required for this scheme? (follow-up question on other scheme)
const r9 = ask('What documents are required for this scheme?', 9);
if (!r9.text.toLowerCase().includes('document') || !r9.text.toLowerCase().includes('aadhaar')) {
  throw new Error('Test 9 failed: Follow-up documents for scheme failed');
}

console.log('\n>>> ALL 9 ENGLISH CONVERSATIONAL TEST QUESTIONS PASSED SUCCESSFULLY! <<<\n');

console.log('--- TESTING KANNADA MULTILINGUAL CONVERSATION ---');
import { getLocalizedMessageText } from './responder';
import { SupportedLanguage } from '../types';

const kannadaHistory: ChatMessage[] = [];
function askLang(query: string, lang: SupportedLanguage) {
  console.log(`\n[${lang}] USER: "${query}"`);
  const res = generateLocalReply(query, mockUser, kannadaHistory, lang);
  console.log(`[${lang}] BOT:\n${res.text}\n`);

  kannadaHistory.push({
    id: `u-${Date.now()}`,
    role: 'user',
    text: query,
    createdAt: Date.now(),
    language: lang,
    intent: res.intent,
    targetSchemeId: res.schemes?.[0]?.id,
  });
  kannadaHistory.push({
    id: `b-${Date.now()}`,
    role: 'bot',
    text: res.text,
    schemeIds: res.schemes?.map((s) => s.id) || [],
    schemes: res.schemes,
    createdAt: Date.now(),
    language: lang,
    intent: res.intent,
    targetSchemeId: res.schemes?.[0]?.id,
  });
  return res;
}

// Kannada Test 1: General scheme info
const k1 = askLang('PM-KISAN ಬಗ್ಗೆ ತಿಳಿಸಿ', 'Kannada');
if (!k1.text.includes('ಯೋಜನೆ') || !k1.text.includes('https://pmkisan.gov.in')) {
  throw new Error('Kannada Test 1 failed: PM-KISAN not in Kannada or missing link');
}

// Kannada Test 2: Benefits follow-up
const k2 = askLang('ಪ್ರಯೋಜನಗಳೇನು?', 'Kannada');
if (!k2.text.includes('6,000') || !k2.text.includes('ಪ್ರಯೋಜನ')) {
  throw new Error('Kannada Test 2 failed: Benefits not answered in Kannada');
}

// Kannada Test 3: Eligibility
const k3 = askLang('ಅರ್ಹತೆ ಏನು?', 'Kannada');
if ((!k3.text.includes('ಅರ್ಹತೆ') && !k3.text.includes('ಅರ್ಹತಾ')) || !k3.text.includes('ಭೂಮಿ')) {
  throw new Error('Kannada Test 3 failed: Eligibility not answered in Kannada');
}

// Kannada Test 4: Documents
const k4 = askLang('ದಾಖಲೆಗಳು ಯಾವುವು?', 'Kannada');
if (!k4.text.includes('ದಾಖಲೆ') || !k4.text.includes('ಆಧಾರ್')) {
  throw new Error('Kannada Test 4 failed: Documents not answered in Kannada');
}

// Kannada Test 5: Official Link
const k5 = askLang('ಅಧಿಕೃತ ಲಿಂಕ್ ನೀಡಿ', 'Kannada');
if (!k5.text.includes('https://pmkisan.gov.in')) {
  throw new Error('Kannada Test 5 failed: Official link not returned in Kannada');
}

console.log('>>> KANNADA CONVERSATION PASSED SUCCESSFULLY! <<<\n');

console.log('--- TESTING HINDI MULTILINGUAL CONVERSATION ---');
const hindiHistory: ChatMessage[] = [];
function askHindi(query: string) {
  console.log(`\n[Hindi] USER: "${query}"`);
  const res = generateLocalReply(query, mockUser, hindiHistory, 'Hindi');
  console.log(`[Hindi] BOT:\n${res.text}\n`);
  hindiHistory.push({
    id: `u-${Date.now()}`,
    role: 'user',
    text: query,
    createdAt: Date.now(),
    language: 'Hindi',
    intent: res.intent,
    targetSchemeId: res.schemes?.[0]?.id,
  });
  hindiHistory.push({
    id: `b-${Date.now()}`,
    role: 'bot',
    text: res.text,
    createdAt: Date.now(),
    language: 'Hindi',
    intent: res.intent,
    targetSchemeId: res.schemes?.[0]?.id,
  });
  return res;
}

// Hindi Test 1: General Info
const h1 = askHindi('PM-KISAN के बारे में बताइए');
if (!h1.text.includes('योजना') || !h1.text.includes('https://pmkisan.gov.in')) {
  throw new Error('Hindi Test 1 failed: PM-KISAN not in Hindi');
}

// Hindi Test 2: Benefits
const h2 = askHindi('इसके क्या लाभ हैं?');
if (!h2.text.includes('6,000') || !h2.text.includes('किस्तों')) {
  throw new Error('Hindi Test 2 failed: Benefits not answered in Hindi');
}

// Hindi Test 3: Documents
const h3 = askHindi('आवश्यक दस्तावेज क्या हैं?');
if (!h3.text.includes('दस्तावेज') || !h3.text.includes('आधार')) {
  throw new Error('Hindi Test 3 failed: Documents not answered in Hindi');
}

console.log('>>> HINDI CONVERSATION PASSED SUCCESSFULLY! <<<\n');

console.log('--- TESTING DYNAMIC CHAT HISTORY LANGUAGE SWITCHING ---');
// Take an English message from earlier and localize it to Kannada and Hindi
const sampleEnglishBotMsg: ChatMessage = {
  id: 'b-sample',
  role: 'bot',
  text: r2.text, // Benefits of PM-KISAN in English
  language: 'English',
  intent: 'benefits',
  targetSchemeId: 'pm-kisan',
  createdAt: Date.now(),
};

const localizedKannada = getLocalizedMessageText(sampleEnglishBotMsg, 'Kannada');
console.log('Localized to Kannada:\n', localizedKannada.slice(0, 150));
if (!localizedKannada.includes('ಪ್ರಯೋಜನ') || !localizedKannada.includes('6,000')) {
  throw new Error('Dynamic localization to Kannada failed');
}

const localizedHindi = getLocalizedMessageText(sampleEnglishBotMsg, 'Hindi');
console.log('Localized to Hindi:\n', localizedHindi.slice(0, 150));
if (!localizedHindi.includes('लाभ') || !localizedHindi.includes('6,000')) {
  throw new Error('Dynamic localization to Hindi failed');
}

console.log('\n>>> ALL MULTILINGUAL TESTS PASSED WITH 100% ACCURACY! <<<');

