import { SupportedLanguage } from '../types';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'English', name: 'English', nativeName: 'English', label: 'English' },
  { code: 'Kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'Hindi', name: 'Hindi', nativeName: 'हिन्दी', label: 'हिन्दी (Hindi)' },
  { code: 'Tamil', name: 'Tamil', nativeName: 'தமிழ்', label: 'தமிழ் (Tamil)' },
  { code: 'Telugu', name: 'Telugu', nativeName: 'తెలుగు', label: 'తెలుగు (Telugu)' },
  { code: 'Malayalam', name: 'Malayalam', nativeName: 'മലയാളം', label: 'മലയാളം (Malayalam)' },
  { code: 'Marathi', name: 'Marathi', nativeName: 'मराठी', label: 'मराठी (Marathi)' },
  { code: 'Bengali', name: 'Bengali', nativeName: 'বাংলা', label: 'বাংলা (Bengali)' },
  { code: 'Gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', label: 'ગુજરાતી (Gujarati)' },
  { code: 'Punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'Odia', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'Urdu', name: 'Urdu', nativeName: 'اردو', label: 'اردو (Urdu)' },
];

export interface TranslationStrings {
  // Brand & Tagline
  appName: string;
  tagline: string;
  greeting: string;
  disclaimer: string;
  shortDisclaimer: string;

  // Sidebar & Navigation
  newChat: string;
  searchChats: string;
  savedSchemes: string;
  schemesLibrary: string;
  notifications: string;
  checkEligibility: string;
  recent: string;
  helpAndGrievance: string;
  profile: string;
  signOut: string;
  signIn: string;
  language: string;
  home: string;
  cancel: string;
  delete: string;
  rename: string;
  save: string;
  deleteChatTitle: string;
  deleteChatConfirm: string;
  noRecentChats: string;
  noChatsMatch: string;

  // Chat Interface
  howCanHelp: string;
  chatSubheading: string;
  askPlaceholder: string;
  sendMessage: string;
  stopStreaming: string;
  voiceComingSoon: string;
  wasThisHelpful: string;
  thanksFeedback: string;
  suggestionFarmer: string;
  suggestionEligibility: string;
  suggestionDocs: string;
  suggestionStudent: string;
  suggestionWomen: string;
  suggestionHealth: string;
  startEligibilityCheck: string;
  browseSchemeLibrary: string;
  takeFullEligibility: string;

  // Scheme Cards
  benefit: string;
  eligibility: string;
  documents: string;
  source: string;
  updated: string;
  applyOfficialWebsite: string;
  likelyEligible: string;
  checkEligibilityStatus: string;
  notEligible: string;
  eligibilityUnknown: string;
  centralScheme: string;
  stateScheme: string;
  viewDetails: string;
  saveScheme: string;
  removeSaved: string;
  resetFilters: string;
  noSchemesFoundDesc: string;

  // Sign In / Auth
  welcomeBack: string;
  createAccount: string;
  continueWithGoogle: string;
  orUseEmail: string;
  emailAddress: string;
  password: string;
  forgotPassword: string;
  alreadyHaveAccount: string;
  newHere: string;

  // Notifications
  markAllRead: string;
  yourAlertCategories: string;
  editInProfile: string;
  noNotificationsYet: string;
  viewScheme: string;
  newBadge: string;
  read: string;
  clickToMarkRead: string;
  loadingReply: string;

  // Landing Page
  landingHeroTitle: string;
  landingHeroSubtitle: string;
  startChatting: string;
  browseSchemes: string;
  checkYourEligibility: string;
  featuresHeading: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  popularSchemesHeading: string;

  // Library & Saved Pages
  libraryTitle: string;
  librarySubtitle: string;
  searchSchemesPlaceholder: string;
  allCategories: string;
  noSchemesFound: string;
  savedSchemesTitle: string;
  savedSchemesSubtitle: string;
  noSavedSchemes: string;
  browseToSave: string;

  // Eligibility Page
  eligibilityTitle: string;
  eligibilitySubtitle: string;
  stepOccupation: string;
  stepAge: string;
  stepState: string;
  stepIncome: string;
  stepLand: string;
  stepCategories: string;
  yes: string;
  no: string;
  next: string;
  previous: string;
  seeResults: string;
  eligibleResultsHeading: string;
  resetAnswers: string;

  // Profile Page
  profileTitle: string;
  profileSubtitle: string;
  fullName: string;
  state: string;
  occupation: string;
  incomeRange: string;
  preferredLanguage: string;
  saveChanges: string;
  savedSuccess: string;

  // Help & Grievance
  helpTitle: string;
  helpSubtitle: string;
  nationalHelpline: string;
  faqTitle: string;

  // Feedback Modal
  feedbackTitle: string;
  whatWasWrong: string;
  wrongScheme: string;
  outdatedInfo: string;
  unclear: string;
  otherReason: string;
  commentsOptional: string;
  submitFeedback: string;
}

const ENGLISH_STRINGS: TranslationStrings = {
  appName: 'Scheme Saathi',
  tagline: 'Find government schemes you qualify for',
  greeting: 'Namaste! I am Scheme Saathi. Ask me about Indian government schemes, check your eligibility, or see required documents.',
  disclaimer: 'Scheme Saathi is an informational service. It is not a government website. Always apply on the official government portal.',
  shortDisclaimer: 'Informational only. Always apply on the official government portal.',

  newChat: 'New chat',
  searchChats: 'Search chats...',
  savedSchemes: 'Saved schemes',
  schemesLibrary: 'Scheme library',
  notifications: 'Notifications',
  checkEligibility: 'Check eligibility',
  recent: 'Recent',
  helpAndGrievance: 'Help & grievance',
  profile: 'Profile',
  signOut: 'Sign out',
  signIn: 'Sign in',
  language: 'Language',
  home: 'Home',
  cancel: 'Cancel',
  delete: 'Delete',
  rename: 'Rename',
  save: 'Save',
  deleteChatTitle: 'Delete chat?',
  deleteChatConfirm: 'Are you sure you want to delete this chat session? This action cannot be undone.',
  noRecentChats: 'No recent chats yet',
  noChatsMatch: 'No chats match search',

  howCanHelp: 'How can Scheme Saathi help you today?',
  chatSubheading: 'Discover government schemes, check your eligibility and find the support you need.',
  askPlaceholder: 'Ask about a scheme or service...',
  sendMessage: 'Send message',
  stopStreaming: 'Stop',
  voiceComingSoon: 'Voice input is coming soon',
  wasThisHelpful: 'Was this helpful?',
  thanksFeedback: 'Thanks for your feedback',
  suggestionFarmer: 'Schemes for farmers',
  suggestionEligibility: 'Check my eligibility',
  suggestionDocs: 'Documents needed',
  suggestionStudent: 'Scholarships for students',
  suggestionWomen: 'Schemes for women entrepreneurs',
  suggestionHealth: 'Health schemes',
  startEligibilityCheck: 'Start eligibility check',
  browseSchemeLibrary: 'Browse scheme library',
  takeFullEligibility: 'Take full eligibility check',

  benefit: 'Benefit',
  eligibility: 'Eligibility',
  documents: 'Documents',
  source: 'Source',
  updated: 'Updated',
  applyOfficialWebsite: 'Apply on official website',
  likelyEligible: 'Likely eligible',
  checkEligibilityStatus: 'Check eligibility',
  notEligible: 'Not eligible',
  eligibilityUnknown: 'Eligibility unknown',
  centralScheme: 'Central Scheme',
  stateScheme: 'State Scheme',
  viewDetails: 'View details',
  saveScheme: 'Bookmark scheme',
  removeSaved: 'Remove saved',
  resetFilters: 'Reset filters',
  noSchemesFoundDesc: 'Try searching for general keywords like "farmer", "scholarship", or "loan".',

  welcomeBack: 'Welcome back',
  createAccount: 'Create your account',
  continueWithGoogle: 'Continue with Google',
  orUseEmail: 'or use email',
  emailAddress: 'Email address',
  password: 'Password',
  forgotPassword: 'Forgot password?',
  alreadyHaveAccount: 'Already have an account?',
  newHere: 'New here?',

  markAllRead: 'Mark all as read',
  yourAlertCategories: 'Your alert categories:',
  editInProfile: 'Edit in Profile',
  noNotificationsYet: 'No notifications yet.',
  viewScheme: 'View scheme',
  newBadge: 'New',
  read: 'Read',
  clickToMarkRead: 'Click card to mark as read',
  loadingReply: 'Thinking...',

  landingHeroTitle: 'Your trusted companion for Indian government schemes',
  landingHeroSubtitle: 'Discover welfare schemes you qualify for, understand financial benefits and required documents, and apply directly on verified official government portals.',
  startChatting: 'Start chatting',
  browseSchemes: 'Browse schemes',
  checkYourEligibility: 'Check your eligibility',
  featuresHeading: 'Why choose Scheme Saathi?',
  feature1Title: 'Verified official sources',
  feature1Desc: 'Only official .gov.in links and up-to-date government criteria.',
  feature2Title: 'Clear document checklists',
  feature2Desc: 'Know exactly which papers and certificates you need before applying.',
  feature3Title: 'Private & safe',
  feature3Desc: 'Never asks for your Aadhaar, bank OTP, or sensitive passwords.',
  popularSchemesHeading: 'Popular schemes available today',

  libraryTitle: 'Government Scheme Library',
  librarySubtitle: 'Browse and search verified central and state welfare programmes.',
  searchSchemesPlaceholder: 'Search schemes by name or keyword...',
  allCategories: 'All Categories',
  noSchemesFound: 'No schemes found matching your search.',
  savedSchemesTitle: 'Saved Schemes',
  savedSchemesSubtitle: 'Quick access to welfare schemes you have bookmarked for later review.',
  noSavedSchemes: "You haven't saved any schemes yet.",
  browseToSave: 'Browse the scheme library to find and bookmark schemes.',

  eligibilityTitle: 'Scheme Eligibility Check',
  eligibilitySubtitle: 'Answer a few simple questions to see which welfare schemes you may qualify for.',
  stepOccupation: 'What is your primary occupation?',
  stepAge: 'What is your age?',
  stepState: 'Which state or UT do you live in?',
  stepIncome: 'What is your family annual income?',
  stepLand: 'Do you or your family own cultivable agricultural land?',
  stepCategories: 'Select all categories that apply to you',
  yes: 'Yes',
  no: 'No',
  next: 'Next',
  previous: 'Previous',
  seeResults: 'See my eligible schemes',
  eligibleResultsHeading: 'Your Eligibility Results',
  resetAnswers: 'Reset answers',

  profileTitle: 'User Profile',
  profileSubtitle: 'Manage your personal details, preferences, and scheme categories.',
  fullName: 'Full Name',
  state: 'State',
  occupation: 'Occupation',
  incomeRange: 'Annual Income',
  preferredLanguage: 'Preferred Language',
  saveChanges: 'Save Changes',
  savedSuccess: 'Profile updated successfully!',

  helpTitle: 'Help & Grievance Support',
  helpSubtitle: 'Official government helplines, grievance portals, and Scheme Saathi assistance.',
  nationalHelpline: 'National Portals & Helplines',
  faqTitle: 'Frequently Asked Questions',

  feedbackTitle: 'Provide Feedback',
  whatWasWrong: 'What went wrong with this response?',
  wrongScheme: 'Wrong scheme',
  outdatedInfo: 'Outdated information',
  unclear: 'Unclear',
  otherReason: 'Other',
  commentsOptional: 'Additional comments (optional)',
  submitFeedback: 'Submit feedback',
};

const KANNADA_STRINGS: TranslationStrings = {
  appName: 'ಸ್ಕೀಮ್ ಸಾಥಿ',
  tagline: 'ನೀವು ಅರ್ಹತೆ ಹೊಂದಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ',
  greeting: 'ನಮಸ್ಕಾರ! ನಾನು ಸ್ಕೀಮ್ ಸಾಥಿ. ಭಾರತೀಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ನಿಮ್ಮ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ಅಥವಾ ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.',
  disclaimer: 'ಸ್ಕೀಮ್ ಸಾಥಿ ಕೇವಲ ಮಾಹಿತಿ ಸೇವೆಯಾಗಿದೆ. ಇದು ಸರ್ಕಾರಿ ಜಾಲತಾಣವಲ್ಲ. ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
  shortDisclaimer: 'ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ. ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',

  newChat: 'ಹೊಸ ಚಾಟ್',
  searchChats: 'ಚಾಟ್‌ಗಳನ್ನು ಹುಡುಕಿ...',
  savedSchemes: 'ಉಳಿಸಿದ ಯೋಜನೆಗಳು',
  schemesLibrary: 'ಯೋಜನೆ ಸಂಗ್ರಹ',
  notifications: 'ಸೂಚನೆಗಳು',
  checkEligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
  recent: 'ಇತ್ತೀಚಿನವು',
  helpAndGrievance: 'ಸಹಾಯ ಮತ್ತು ಕುಂದುಕೊರತೆ',
  profile: 'ಪ್ರೊಫೈಲ್',
  signOut: 'ಸೈನ್ ಔಟ್',
  signIn: 'ಸೈನ್ ಇನ್',
  language: 'ಭಾಷೆ',
  home: 'ಮುಖಪುಟ',
  cancel: 'ರದ್ದುಮಾಡಿ',
  delete: 'ಅಳಿಸಿ',
  rename: 'ಮರುಹೆಸರಿಸಿ',
  save: 'ಉಳಿಸಿ',
  deleteChatTitle: 'ಚಾಟ್ ಅಳಿಸುವುದೇ?',
  deleteChatConfirm: 'ಈ ಚಾಟ್ ಸಂಭಾಷಣೆಯನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.',
  noRecentChats: 'ಇನ್ನೂ ಇತ್ತೀಚಿನ ಚಾಟ್‌ಗಳಿಲ್ಲ',
  noChatsMatch: 'ಯಾವುದೇ ಚಾಟ್ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ',

  howCanHelp: 'ಸ್ಕೀಮ್ ಸಾಥಿ ನಿಮಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
  chatSubheading: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅಗತ್ಯ ಬೆಂಬಲವನ್ನು ಪಡೆಯಿರಿ.',
  askPlaceholder: 'ಯೋಜನೆ ಅಥವಾ ಸೇವೆಯ ಬಗ್ಗೆ ಕೇಳಿ...',
  sendMessage: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
  stopStreaming: 'ನಿಲ್ಲಿಸಿ',
  voiceComingSoon: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ',
  wasThisHelpful: 'ಇದು ಸಹಾಯಕವಾಗಿದೆಯೇ?',
  thanksFeedback: 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದಗಳು',
  suggestionFarmer: 'ರೈತರಿಗಾಗಿ ಯೋಜನೆಗಳು',
  suggestionEligibility: 'ನನ್ನ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
  suggestionDocs: 'ಬೇಕಾದ ದಾಖಲೆಗಳು',
  suggestionStudent: 'ವಿದ್ಯಾರ್ಥಿ ವೇತನಗಳು',
  suggestionWomen: 'ಮಹಿಳಾ ಉದ್ಯಮಿಗಳ ಯೋಜನೆಗಳು',
  suggestionHealth: 'ಆರೋಗ್ಯ ಯೋಜನೆಗಳು',
  startEligibilityCheck: 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ಪ್ರಾರಂಭಿಸಿ',
  browseSchemeLibrary: 'ಯೋಜನೆ ಸಂಗ್ರಹ ವೀಕ್ಷಿಸಿ',
  takeFullEligibility: 'ಸಂಪೂರ್ಣ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ನಡೆಸಿ',

  benefit: 'ಪ್ರಯೋಜನಗಳು',
  eligibility: 'ಅರ್ಹತೆ',
  documents: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
  source: 'ಮೂಲ',
  updated: 'ನವೀಕರಿಸಲಾಗಿದೆ',
  applyOfficialWebsite: 'ಅಧಿಕೃತ ಜಾಲತಾಣದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
  likelyEligible: 'ಅರ್ಹರಾಗಿರುವ ಸಾಧ್ಯತೆ ಇದೆ',
  checkEligibilityStatus: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
  notEligible: 'ಅರ್ಹರಲ್ಲ',
  eligibilityUnknown: 'ಅರ್ಹತೆ ಅಜ್ಞಾತ',
  centralScheme: 'ಕೇಂದ್ರ ಯೋಜನೆ',
  stateScheme: 'ರಾಜ್ಯ ಯೋಜನೆ',
  viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  saveScheme: 'ಯೋಜನೆ ಉಳಿಸಿ',
  removeSaved: 'ಉಳಿಸಿದ್ದನ್ನು ತೆಗೆದುಹಾಕಿ',
  resetFilters: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
  noSchemesFoundDesc: '"ರೈತ", "ವಿದ್ಯಾರ್ಥಿವೇತನ" ಅಥವಾ "ಸಾಲ" ಮುಂತಾದ ಸಾಮಾನ್ಯ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಹುಡುಕಿ ನೋಡಿ.',

  welcomeBack: 'ಮರಳಿ ಸ್ವಾಗತ',
  createAccount: 'ನಿಮ್ಮ ಖಾತೆಯನ್ನು ರಚಿಸಿ',
  continueWithGoogle: 'Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ',
  orUseEmail: 'ಅಥವಾ ಇಮೇಲ್ ಬಳಸಿ',
  emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ',
  password: 'ಪಾಸ್‌ವರ್ಡ್',
  forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
  alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಹೊಂದಿದ್ದೀರಾ?',
  newHere: 'ಹೊಸಬರೇ?',

  markAllRead: 'ಎಲ್ಲವನ್ನೂ ಓದಿದ್ದೀರಿ ಎಂದು ಗುರುತಿಸಿ',
  yourAlertCategories: 'ನಿಮ್ಮ ಎಚ್ಚರಿಕೆ ವರ್ಗಗಳು:',
  editInProfile: 'ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ತಿದ್ದುಪಡಿ ಮಾಡಿ',
  noNotificationsYet: 'ಇನ್ನೂ ಯಾವುದೇ ಸೂಚನೆಗಳಿಲ್ಲ.',
  viewScheme: 'ಯೋಜನೆ ವೀಕ್ಷಿಸಿ',
  newBadge: 'ಹೊಸದು',
  read: 'ಓದಲಾಗಿದೆ',
  clickToMarkRead: 'ಓದಿದ್ದೀರಿ ಎಂದು ಗುರುತಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
  loadingReply: 'ಉತ್ತರಿಸಲಾಗುತ್ತಿದೆ...',

  landingHeroTitle: 'ಭಾರತೀಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಮಾರ್ಗದರ್ಶಿ',
  landingHeroSubtitle: 'ನೀವು ಅರ್ಹತೆ ಹೊಂದಿರುವ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಆರ್ಥಿಕ ಪ್ರಯೋಜನಗಳು ಮತ್ತು ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳಲ್ಲಿ ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
  startChatting: 'ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
  browseSchemes: 'ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  checkYourEligibility: 'ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
  featuresHeading: 'ಸ್ಕೀಮ್ ಸಾಥಿಯನ್ನು ಏಕೆ ಆರಿಸಬೇಕು?',
  feature1Title: 'ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಮೂಲಗಳು',
  feature1Desc: 'ಕೇವಲ ಅಧಿಕೃತ .gov.in ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಪ್ರಸ್ತುತ ಸರ್ಕಾರದ ಮಾರ್ಗಸೂಚಿಗಳು.',
  feature2Title: 'ದಾಖಲೆಗಳ ಸ್ಪಷ್ಟ ಪಟ್ಟಿ',
  feature2Desc: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ನಿಮಗೆ ಬೇಕಾದ ದಾಖಲೆಗಳನ್ನು ನಿಖರವಾಗಿ ತಿಳಿದುಕೊಳ್ಳಿ.',
  feature3Title: 'ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತ',
  feature3Desc: 'ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ, ಬ್ಯಾಂಕ್ ಒಟಿಪಿ ಅಥವಾ ಗೌಪ್ಯ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.',
  popularSchemesHeading: 'ಇಂದು ಲಭ್ಯವಿರುವ ಪ್ರಮುಖ ಯೋಜನೆಗಳು',

  libraryTitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆ ಸಂಗ್ರಹ',
  librarySubtitle: 'ಪರಿಶೀಲಿಸಿದ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ ಮತ್ತು ಹುಡುಕಿ.',
  searchSchemesPlaceholder: 'ಹೆಸರು ಅಥವಾ ಕೀವರ್ಡ್ ಮೂಲಕ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...',
  allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
  noSchemesFound: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
  savedSchemesTitle: 'ಉಳಿಸಿದ ಯೋಜನೆಗಳು',
  savedSchemesSubtitle: 'ನಂತರ ಪರಿಶೀಲಿಸಲು ನೀವು ಗುರುತು ಹಾಕಿಕೊಂಡ ಯೋಜನೆಗಳನ್ನು ಸುಲಭವಾಗಿ ವೀಕ್ಷಿಸಿ.',
  noSavedSchemes: 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಯೋಜನೆಗಳನ್ನು ಉಳಿಸಿಲ್ಲ.',
  browseToSave: 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲು ಮತ್ತು ಉಳಿಸಲು ಯೋಜನೆ ಸಂಗ್ರಹವನ್ನು ವೀಕ್ಷಿಸಿ.',

  eligibilityTitle: 'ಯೋಜನೆ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ',
  eligibilitySubtitle: 'ನೀವು ಯಾವ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳಿಗೆ ಅರ್ಹರಾಗಬಹುದು ಎಂದು ತಿಳಿಯಲು ಕೆಲವು ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.',
  stepOccupation: 'ನಿಮ್ಮ ಮುಖ್ಯ ಉದ್ಯೋಗ ಯಾವುದು?',
  stepAge: 'ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?',
  stepState: 'ನೀವು ಯಾವ ರಾಜ್ಯದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?',
  stepIncome: 'ನಿಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಎಷ್ಟು?',
  stepLand: 'ನಿಮ್ಮ ಅಥವಾ ನಿಮ್ಮ ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಜಮೀನು ಇದೆಯೇ?',
  stepCategories: 'ನಿಮಗೆ ಅನ್ವಯವಾಗುವ ಎಲ್ಲಾ ವರ್ಗಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  yes: 'ಹೌದು',
  no: 'ಇಲ್ಲ',
  next: 'ಮುಂದೆ',
  previous: 'ಹಿಂದೆ',
  seeResults: 'ನನ್ನ ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  eligibleResultsHeading: 'ನಿಮ್ಮ ಅರ್ಹತೆಯ ಫಲಿತಾಂಶಗಳು',
  resetAnswers: 'ಉತ್ತರಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',

  profileTitle: 'ಬಳಕೆದಾರರ ಪ್ರೊಫೈಲ್',
  profileSubtitle: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳು ಮತ್ತು ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ನಿರ್ವಹಿಸಿ.',
  fullName: 'ಪೂರ್ಣ ಹೆಸರು',
  state: 'ರಾಜ್ಯ',
  occupation: 'ಉದ್ಯೋಗ',
  incomeRange: 'ವಾರ್ಷಿಕ ಆದಾಯ',
  preferredLanguage: 'ಆದ್ಯತೆಯ ಭಾಷೆ',
  saveChanges: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
  savedSuccess: 'ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!',

  helpTitle: 'ಸಹಾಯ ಮತ್ತು ಕುಂದುಕೊರತೆ ಬೆಂಬಲ',
  helpSubtitle: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸಹಾಯವಾಣಿಗಳು ಮತ್ತು ಸ್ಕೀಮ್ ಸಾಥಿ ನೆರವು.',
  nationalHelpline: 'ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್‌ಗಳು ಮತ್ತು ಸಹಾಯವಾಣಿಗಳು',
  faqTitle: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',

  feedbackTitle: 'ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ',
  whatWasWrong: 'ಈ ಉತ್ತರದಲ್ಲಿ ಏನು ತಪ್ಪಾಗಿದೆ?',
  wrongScheme: 'ತಪ್ಪು ಯೋಜನೆ',
  outdatedInfo: 'ಹಳೆಯ ಮಾಹಿತಿ',
  unclear: 'ಅಸ್ಪಷ್ಟವಾಗಿದೆ',
  otherReason: 'ಇತರೆ',
  commentsOptional: 'ಹೆಚ್ಚುವರಿ ಕಾಮೆಂಟ್‌ಗಳು (ಐಚ್ಛಿಕ)',
  submitFeedback: 'ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಸಿ',
};

const HINDI_STRINGS: TranslationStrings = {
  appName: 'स्कीम साथी',
  tagline: 'सरकारी योजनाएं खोजें जिनके आप पात्र हैं',
  greeting: 'नमस्ते! मैं स्कीम साथी हूँ। सरकारी योजनाओं, पात्रता जांच और आवश्यक दस्तावेजों के बारे में पूछें।',
  disclaimer: 'स्कीम साथी एक सूचनात्मक सेवा है। यह सरकारी वेबसाइट नहीं है। हमेशा आधिकारिक सरकारी पोर्टल पर ही आवेदन करें।',
  shortDisclaimer: 'केवल सूचनात्मक उद्देश्य। हमेशा आधिकारिक सरकारी पोर्टल पर आवेदन करें।',

  newChat: 'नई चैट',
  searchChats: 'चैट खोजें...',
  savedSchemes: 'सहेजी गई योजनाएं',
  schemesLibrary: 'योजना लाइब्रेरी',
  notifications: 'सूचनाएं',
  checkEligibility: 'पात्रता जांचें',
  recent: 'हालिया',
  helpAndGrievance: 'सहायता एवं शिकायत',
  profile: 'प्रोफ़ाइल',
  signOut: 'साइन आउट',
  signIn: 'साइन इन',
  language: 'भाषा',
  home: 'होम',
  cancel: 'रद्द करें',
  delete: 'हटाएं',
  rename: 'नाम बदलें',
  save: 'सहेजें',
  deleteChatTitle: 'चैट हटाएं?',
  deleteChatConfirm: 'क्या आप वाकई इस चैट सत्र को हटाना चाहते हैं? इसे वापस नहीं लाया जा सकता।',
  noRecentChats: 'अभी कोई हालिया चैट नहीं है',
  noChatsMatch: 'कोई चैट मेल नहीं खाती',

  howCanHelp: 'स्कीम साथी आज आपकी क्या मदद कर सकता है?',
  chatSubheading: 'सरकारी योजनाओं की खोज करें, अपनी पात्रता जांचें और आवश्यक सहायता प्राप्त करें।',
  askPlaceholder: 'किसी योजना या सेवा के बारे में पूछें...',
  sendMessage: 'संदेश भेजें',
  stopStreaming: 'रोकें',
  voiceComingSoon: 'वॉइस इनपुट जल्द आ रहा है',
  wasThisHelpful: 'क्या यह मददगार था?',
  thanksFeedback: 'आपकी प्रतिक्रिया के लिए धन्यवाद',
  suggestionFarmer: 'किसानों के लिए योजनाएं',
  suggestionEligibility: 'मेरी पात्रता जांचें',
  suggestionDocs: 'आवश्यक दस्तावेज',
  suggestionStudent: 'छात्रवृत्तियां',
  suggestionWomen: 'महिला उद्यमियों के लिए योजनाएं',
  suggestionHealth: 'स्वास्थ्य योजनाएं',
  startEligibilityCheck: 'पात्रता जांच शुरू करें',
  browseSchemeLibrary: 'योजना लाइब्रेरी देखें',
  takeFullEligibility: 'पूरी पात्रता जांच करें',

  benefit: 'लाभ',
  eligibility: 'पात्रता',
  documents: 'आवश्यक दस्तावेज',
  source: 'स्रोत',
  updated: 'अद्यतन',
  applyOfficialWebsite: 'आधिकारिक वेबसाइट पर आवेदन करें',
  likelyEligible: 'पात्र होने की संभावना है',
  checkEligibilityStatus: 'पात्रता जांचें',
  notEligible: 'पात्र नहीं हैं',
  eligibilityUnknown: 'पात्रता अज्ञात',
  centralScheme: 'केंद्रीय योजना',
  stateScheme: 'राज्य योजना',
  viewDetails: 'विवरण देखें',
  saveScheme: 'योजना सहेजें',
  removeSaved: 'सहेजा गया हटाएं',
  resetFilters: 'फ़िल्टर रीसेट करें',
  noSchemesFoundDesc: '"किसान", "छात्रवृत्ति" या "ऋण" जैसे सामान्य कीवर्ड खोजें।',

  welcomeBack: 'वापसी पर स्वागत है',
  createAccount: 'अपना खाता बनाएं',
  continueWithGoogle: 'Google के साथ जारी रखें',
  orUseEmail: 'या ईमेल का उपयोग करें',
  emailAddress: 'ईमेल पता',
  password: 'पासवर्ड',
  forgotPassword: 'पासवर्ड भूल गए?',
  alreadyHaveAccount: 'क्या आपके पास पहले से एक खाता मौजूद है?',
  newHere: 'यहाँ नए हैं?',

  markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
  yourAlertCategories: 'आपकी अलर्ट श्रेणियां:',
  editInProfile: 'प्रोफ़ाइल में संपादित करें',
  noNotificationsYet: 'अभी कोई सूचनाएं नहीं हैं।',
  viewScheme: 'योजना देखें',
  newBadge: 'नया',
  read: 'पढ़ा हुआ',
  clickToMarkRead: 'पढ़ा हुआ चिह्नित करने के लिए क्लिक करें',
  loadingReply: 'उत्तर तैयार कर रहा है...',

  landingHeroTitle: 'भारतीय सरकारी योजनाओं के लिए आपका विश्वसनीय साथी',
  landingHeroSubtitle: 'उन कल्याणकारी योजनाओं की खोज करें जिनके आप पात्र हैं, वित्तीय लाभों व आवश्यक दस्तावेजों को समझें और सीधे आधिकारिक सरकारी पोर्टलों पर आवेदन करें।',
  startChatting: 'बातचीत शुरू करें',
  browseSchemes: 'योजनाएं देखें',
  checkYourEligibility: 'अपनी पात्रता जांचें',
  featuresHeading: 'स्कीम साथी क्यों चुनें?',
  feature1Title: 'सत्यापित आधिकारिक स्रोत',
  feature1Desc: 'केवल आधिकारिक .gov.in लिंक और अद्यतन सरकारी नियम।',
  feature2Title: 'स्पष्ट दस्तावेज सूची',
  feature2Desc: 'आवेदन करने से पहले जानें कि आपको कौन से दस्तावेज चाहिए।',
  feature3Title: 'निजी और सुरक्षित',
  feature3Desc: 'कभी भी आपका आधार नंबर, बैंक ओटीपी या पासवर्ड नहीं मांगता।',
  popularSchemesHeading: 'आज उपलब्ध लोकप्रिय योजनाएं',

  libraryTitle: 'सरकारी योजना लाइब्रेरी',
  librarySubtitle: 'सत्यापित केंद्रीय और राज्य कल्याणकारी योजनाओं को खोजें और देखें।',
  searchSchemesPlaceholder: 'नाम या कीवर्ड द्वारा योजनाएं खोजें...',
  allCategories: 'सभी श्रेणियां',
  noSchemesFound: 'आपकी खोज से मेल खाती कोई योजना नहीं मिली।',
  savedSchemesTitle: 'सहेजी गई योजनाएं',
  savedSchemesSubtitle: 'बाद में समीक्षा के लिए सहेजी गई योजनाओं तक त्वरित पहुंच।',
  noSavedSchemes: 'आपने अभी तक कोई योजना नहीं सहेजी है।',
  browseToSave: 'योजनाओं को खोजने और सहेजने के लिए लाइब्रेरी देखें।',

  eligibilityTitle: 'योजना पात्रता जांच',
  eligibilitySubtitle: 'यह जानने के लिए कि आप किन योजनाओं के पात्र हो सकते हैं, कुछ सरल प्रश्नों के उत्तर दें।',
  stepOccupation: 'आपका मुख्य व्यवसाय क्या है?',
  stepAge: 'आपकी आयु क्या है?',
  stepState: 'आप किस राज्य में रहते हैं?',
  stepIncome: 'आपकी पारिवारिक वार्षिक आय क्या है?',
  stepLand: 'क्या आपके पास कृषि योग्य भूमि है?',
  stepCategories: 'उन सभी श्रेणियों का चयन करें जो आप पर लागू होती हैं',
  yes: 'हाँ',
  no: 'नहीं',
  next: 'आगे',
  previous: 'पीछे',
  seeResults: 'मेरी पात्र योजनाएं देखें',
  eligibleResultsHeading: 'आपके पात्रता परिणाम',
  resetAnswers: 'उत्तर रीसेट करें',

  profileTitle: 'उपयोगकर्ता प्रोफ़ाइल',
  profileSubtitle: 'अपने व्यक्तिगत विवरण और पसंदीदा भाषा का प्रबंधन करें।',
  fullName: 'पूरा नाम',
  state: 'राज्य',
  occupation: 'व्यवसाय',
  incomeRange: 'वार्षिक आय',
  preferredLanguage: 'पसंदीदा भाषा',
  saveChanges: 'बदलाव सहेजें',
  savedSuccess: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!',

  helpTitle: 'सहायता एवं शिकायत निवारण',
  helpSubtitle: 'आधिकारिक सरकारी हेल्पलाइन और स्कीम साथी सहायता।',
  nationalHelpline: 'राष्ट्रीय पोर्टल और हेल्पलाइन',
  faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',

  feedbackTitle: 'प्रतिक्रिया दें',
  whatWasWrong: 'इस उत्तर में क्या कमी थी?',
  wrongScheme: 'गलत योजना',
  outdatedInfo: 'पुरानी जानकारी',
  unclear: 'अस्पष्ट',
  otherReason: 'अन्य',
  commentsOptional: 'अतिरिक्त टिप्पणी (वैकल्पिक)',
  submitFeedback: 'प्रतिक्रिया सबमिट करें',
};

const TAMIL_STRINGS: TranslationStrings = {
  appName: 'ஸ்கீம் சாதி',
  tagline: 'நீங்கள் தகுதிபெறும் அரசுத் திட்டங்களைக் கண்டறியுங்கள்',
  greeting: 'வணக்கம்! நான் ஸ்கீம் சாதி. அரசுத் திட்டங்கள், உங்கள் தகுதி அல்லது தேவையான ஆவணங்கள் பற்றி கேளுங்கள்.',
  disclaimer: 'ஸ்கீம் சாதி ஒரு தகவல் வழங்கும் சேவையாகும். இது அரசு இணையதளம் அல்ல. எப்போதும் அதிகாரப்பூர்வ அரசு தளத்திலேயே விண்ணப்பிக்கவும்.',
  shortDisclaimer: 'தகவல் நோக்கத்திற்காக மட்டுமே. எப்போதும் அதிகாரப்பூர்வ அரசு தளத்தில் விண்ணப்பிக்கவும்.',

  newChat: 'புதிய உரையாடல்',
  searchChats: 'உரையாடல்களைத் தேடுங்கள்...',
  savedSchemes: 'சேமிக்கப்பட்ட திட்டங்கள்',
  schemesLibrary: 'திட்ட நூலகம்',
  notifications: 'அறிவிப்புகள்',
  checkEligibility: 'தகுதியைச் சரிபார்க்கவும்',
  recent: 'சமீபத்தியவை',
  helpAndGrievance: 'உதவி & குறைகள்',
  profile: 'சுயவிவரம்',
  signOut: 'வெளியேறு',
  signIn: 'உள்நுழைக',
  language: 'மொழி',
  home: 'முகப்பு',
  cancel: 'ரத்துசெய்',
  delete: 'நீக்கு',
  rename: 'மறுபெயரிடு',
  save: 'சேமிக்க',
  deleteChatTitle: 'உரையாடலை நீக்கவா?',
  deleteChatConfirm: 'இந்த உரையாடலை நிச்சயமாக நீக்க விரும்புகிறீர்களா?',
  noRecentChats: 'சமீபத்திய உரையாடல்கள் இல்லை',
  noChatsMatch: 'பொருந்தும் உரையாடல்கள் இல்லை',

  howCanHelp: 'ஸ்கீம் சாதி உங்களுக்கு இன்று எவ்வாறு உதவ முடியும்?',
  chatSubheading: 'அரசுத் திட்டங்களைக் கண்டறியுங்கள், உங்கள் தகுதியைச் சரிபார்த்து ஆதரவைப் பெறுங்கள்.',
  askPlaceholder: 'திட்டம் அல்லது சேவை பற்றி கேளுங்கள்...',
  sendMessage: 'செய்தி அனுப்பவும்',
  stopStreaming: 'நிறுத்து',
  voiceComingSoon: 'குரல் உள்ளீடு விரைவில் வருகிறது',
  wasThisHelpful: 'இது பயனுள்ளதாக இருந்ததா?',
  thanksFeedback: 'உங்கள் கருத்துக்கு நன்றி',
  suggestionFarmer: 'விவசாயிகளுக்கான திட்டங்கள்',
  suggestionEligibility: 'என் தகுதியைச் சரிபார்க்கவும்',
  suggestionDocs: 'தேவையான ஆவணங்கள்',
  suggestionStudent: 'மாணவர் கல்வித்தொகை',
  suggestionWomen: 'பெண் தொழில்முனைவோர் திட்டங்கள்',
  suggestionHealth: 'சுகாதாரத் திட்டங்கள்',
  startEligibilityCheck: 'தகுதி சோதனையைத் தொடங்குங்கள்',
  browseSchemeLibrary: 'திட்ட நூலகத்தை உலாவுக',
  takeFullEligibility: 'முழுமையான தகுதி சோதனை',

  benefit: 'நன்மை',
  eligibility: 'தகுதி',
  documents: 'ஆவணங்கள்',
  source: 'மூலம்',
  updated: 'புதுப்பிக்கப்பட்டது',
  applyOfficialWebsite: 'அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்கவும்',
  likelyEligible: 'தகுதி பெற வாய்ப்புள்ளது',
  checkEligibilityStatus: 'தகுதியைச் சரிபார்க்கவும்',
  notEligible: 'தகுதியற்றவர்',
  centralScheme: 'மத்திய அரசுத் திட்டம்',
  stateScheme: 'மாநில அரசுத் திட்டம்',
  viewDetails: 'விவரங்களைக் காண்க',
  saveScheme: 'திட்டத்தைச் சேமி',
  removeSaved: 'சேமித்ததை அகற்று',

  landingHeroTitle: 'இந்திய அரசுத் திட்டங்களுக்கான உங்கள் நம்பகமான வழிகாட்டி',
  landingHeroSubtitle: 'நீங்கள் தகுதிபெறும் நலத்திட்டங்களைக் கண்டறியுங்கள், நிதிப் பலன்களைப் புரிந்து கொள்ளுங்கள், அதிகாரப்பூர்வ போர்ட்டலில் விண்ணப்பியுங்கள்.',
  startChatting: 'உரையாடலைத் தொடங்குங்கள்',
  browseSchemes: 'திட்டங்களை உலாவுக',
  checkYourEligibility: 'உங்கள் தகுதியைச் சரிபார்க்கவும்',
  featuresHeading: 'ஸ்கீம் சாதியை ஏன் தேர்வு செய்ய வேண்டும்?',
  feature1Title: 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ தகவல்',
  feature1Desc: 'உண்மையான .gov.in தள இணைப்புகள் மற்றும் அரசு வழிகாட்டுதல்கள்.',
  feature2Title: 'தெளிவான ஆவணப் பட்டியல்',
  feature2Desc: 'விண்ணப்பிக்கும் முன் தேவையான ஆவணங்களை எளிதாக அறிந்துகொள்ளுங்கள்.',
  feature3Title: 'பாதுகாப்பானது & ரகசியமானது',
  feature3Desc: 'உங்கள் ஆதார் எண், வங்கி ஓடிபி அல்லது கடவுச்சொற்களை ஒருபோதும் கேட்காது.',
  popularSchemesHeading: 'இன்று கிடைக்கும் முக்கிய திட்டங்கள்',

  libraryTitle: 'அரசுத் திட்டங்களின் நூலகம்',
  librarySubtitle: 'மத்திய மற்றும் மாநில நலத்திட்டங்களை உலாவுக.',
  searchSchemesPlaceholder: 'பெயர் அல்லது முக்கிய வார்த்தை மூலம் தேடுங்கள்...',
  allCategories: 'அனைத்து பிரிவுகள்',
  noSchemesFound: 'திட்டங்கள் எதுவும் கிடைக்கவில்லை.',
  savedSchemesTitle: 'சேமிக்கப்பட்ட திட்டங்கள்',
  savedSchemesSubtitle: 'நீங்கள் பின்னர் பார்க்க சேமித்து வைத்த திட்டங்கள்.',
  noSavedSchemes: 'நீங்கள் இன்னும் எந்த திட்டத்தையும் சேமிக்கவில்லை.',
  browseToSave: 'திட்டங்களைச் சேமிக்க நூலகத்தை உலாவுக.',

  eligibilityTitle: 'திட்ட தகுதி சோதனை',
  eligibilitySubtitle: 'நீங்கள் தகுதிபெறும் திட்டங்களை அறிய சில எளிய கேள்விகளுக்குப் பதிலளிக்கவும்.',
  stepOccupation: 'உங்கள் தொழில் என்ன?',
  stepAge: 'உங்கள் வயது என்ன?',
  stepState: 'நீங்கள் எந்த மாநிலத்தில் வசிக்கிறீர்கள்?',
  stepIncome: 'குடும்ப ஆண்டு வருமானம் என்ன?',
  stepLand: 'விவசாய நிலம் உள்ளதா?',
  stepCategories: 'பொருந்தும் பிரிவுகளைத் தேர்ந்தெடுக்கவும்',
  yes: 'ஆம்',
  no: 'இல்லை',
  next: 'அடுத்து',
  previous: 'முந்தைய',
  seeResults: 'தகுதியான திட்டங்களைக் காட்டு',
  eligibleResultsHeading: 'உங்கள் தகுதி முடிவுகள்',
  resetAnswers: 'மீட்டமைக்கவும்',

  profileTitle: 'சுயவிவரம்',
  profileSubtitle: 'தனிப்பட்ட விவரங்கள் மற்றும் விருப்ப மொழியை நிர்வகிக்கவும்.',
  fullName: 'முழு பெயர்',
  state: 'மாநிலம்',
  occupation: 'தொழில்',
  incomeRange: 'ஆண்டு வருமானம்',
  preferredLanguage: 'விருப்பமான மொழி',
  saveChanges: 'மாற்றங்களைச் சேமிக்கவும்',
  savedSuccess: 'சுயவிவரம் புதுப்பிக்கப்பட்டது!',

  helpTitle: 'உதவி மற்றும் குறைதீர்ப்பு',
  helpSubtitle: 'அரசு உதவி எண்கள் மற்றும் வழிகாட்டுதல்.',
  nationalHelpline: 'தேசிய போர்ட்டல்கள் & உதவி எண்கள்',
  faqTitle: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',

  feedbackTitle: 'கருத்து தெரிவிக்கவும்',
  whatWasWrong: 'பதிலில் என்ன குறைபாடு?',
  wrongScheme: 'தவறான திட்டம்',
  outdatedInfo: 'பழைய தகவல்',
  unclear: 'தெளிவற்றது',
  otherReason: 'மற்றவை',
  commentsOptional: 'கூடுதல் கருத்துகள் (விருப்பம்)',
  submitFeedback: 'கருத்தைச் சமர்ப்பிக்கவும்',
};

const TELUGU_STRINGS: TranslationStrings = {
  appName: 'స్కీమ్ సాథీ',
  tagline: 'మీరు అర్హత సాధించే ప్రభుత్వ పథకాలను కనుగొనండి',
  greeting: 'నమస్కారం! నేను స్కీమ్ సాథీ. ప్రభుత్వ పథకాలు, మీ అర్హత మరియు అవసరమైన పత్రాల గురించి అడగండి.',
  disclaimer: 'స్కీమ్ సాథీ సమాచార సేవ మాత్రమే. ఇది ప్రభుత్వ వెబ్‌సైట్ కాదు. ఎల్లప్పుడూ అధికారిక ప్రభుత్వ పోర్టల్‌లోనే దరఖాస్తు చేసుకోండి.',
  shortDisclaimer: 'సమాచారం కొరకు మాత్రమే. అధికారిక పోర్టల్‌లోనే దరఖాస్తు చేయండి.',
  newChat: 'కొత్త చాట్',
  searchChats: 'చాట్‌లను వెతకండి...',
  savedSchemes: 'సేవ్ చేసిన పథకాలు',
  schemesLibrary: 'పథకాల లైబ్రరీ',
  notifications: 'నోటిఫికేషన్‌లు',
  checkEligibility: 'అర్హత తనిఖీ చేయండి',
  recent: 'ఇటీవలివి',
  helpAndGrievance: 'సహాయం & ఫిర్యాదులు',
  profile: 'ప్రొఫైల్',
  signOut: 'సైన్ అవుట్',
  signIn: 'సైన్ ఇన్',
  language: 'భాష',
  home: 'హోమ్',
  cancel: 'రద్దు చేయి',
  delete: 'తొలగించు',
  rename: 'పేరు మార్చు',
  save: 'సేవ్ చేయి',
  deleteChatTitle: 'చాట్ తొలగించాలా?',
  deleteChatConfirm: 'మీరు ఖచ్చితంగా ఈ చాట్‌ను తొలగించాలనుకుంటున్నారా?',
  noRecentChats: 'ఇటీవలి చాట్‌లు లేవు',
  noChatsMatch: 'చాట్‌లు ఏవీ సరిపోలలేదు',
  howCanHelp: 'స్కీమ్ సాథీ మీకు ఈరోజు ఎలా సహాయం చేయగలదు?',
  chatSubheading: 'ప్రభుత్వ పథకాలను కనుగొనండి, మీ అర్హతను తనిఖీ చేయండి మరియు మద్దతు పొందండి.',
  askPlaceholder: 'పథకం లేదా సేవ గురించి అడగండి...',
  sendMessage: 'సందేశం పంపు',
  stopStreaming: 'ఆపు',
  voiceComingSoon: 'వాయిస్ ఇన్‌పుట్ త్వరలో వస్తుంది',
  wasThisHelpful: 'ఇది ఉపయోగకరంగా ఉందా?',
  thanksFeedback: 'మీ ఫీడ్‌బ్యాక్‌కు ధన్యవాదాలు',
  suggestionFarmer: 'రైతుల పథకాలు',
  suggestionEligibility: 'నా అర్హత తనిఖీ చేయండి',
  suggestionDocs: 'అవసరమైన పత్రాలు',
  suggestionStudent: 'విద్యార్థి స్కాలర్‌షిప్‌లు',
  suggestionWomen: 'మహిళా వ్యవస్థాపక పథకాలు',
  suggestionHealth: 'ఆరోగ్య పథకాలు',
  startEligibilityCheck: 'అర్హత తనిఖీ ప్రారంభించండి',
  browseSchemeLibrary: 'పథకాల లైబ్రరీని చూడండి',
  takeFullEligibility: 'పూర్తి అర్హత తనిఖీ చేయండి',
  benefit: 'ప్రయోజనం',
  eligibility: 'అర్హత',
  documents: 'పత్రాలు',
  source: 'మూలం',
  updated: 'నవీకరించబడింది',
  applyOfficialWebsite: 'అధికారిక వెబ్‌సైట్‌లో దరఖాస్తు చేయండి',
  likelyEligible: 'అర్హత ఉండే అవకాశం ఉంది',
  checkEligibilityStatus: 'అర్హత తనిఖీ చేయండి',
  notEligible: 'అర్హత లేదు',
  centralScheme: 'కేంద్ర పథకం',
  stateScheme: 'రాష్ట్ర పథకం',
  viewDetails: 'వివరాలు చూడండి',
  saveScheme: 'పథకాన్ని సేవ్ చేయి',
  removeSaved: 'సేవ్ చేసినది తొలగించు',
  landingHeroTitle: 'భారత ప్రభుత్వ పథకాలకు మీ నమ్మకమైన మార్గదర్శి',
  landingHeroSubtitle: 'మీరు అర్హత సాధించే సంక్షేమ పథకాలను కనుగొనండి మరియు అధికారిక ప్రభుత్వ పోర్టల్‌లలో నేరుగా దరఖాస్తు చేసుకోండి.',
  startChatting: 'సంభాషణ ప్రారంభించండి',
  browseSchemes: 'పథకాలను చూడండి',
  checkYourEligibility: 'మీ అర్హతను తనిఖీ చేయండి',
  featuresHeading: 'స్కీమ్ సాథీని ఎందుకు ఎంచుకోవాలి?',
  feature1Title: 'ధృవీకరించబడిన అధికారిక వనరులు',
  feature1Desc: 'అధికారిక .gov.in లింక్‌లు మరియు ప్రస్తుత ప్రభుత్వ నిబంధనలు.',
  feature2Title: 'స్పష్టమైన పత్రాల జాబితా',
  feature2Desc: 'దరఖాస్తు చేయడానికి ముందు మీకు ఏ పత్రాలు అవసరమో ఖచ్చితంగా తెలుసుకోండి.',
  feature3Title: 'సురక్షితమైనది & ప్రైవేట్',
  feature3Desc: 'మీ ఆధార్ లేదా బ్యాంక్ ఓటీపీని ఎప్పుడూ అడగదు.',
  popularSchemesHeading: 'ఈరోజు అందుబాటులో ఉన్న ప్రముఖ పథకాలు',
  libraryTitle: 'ప్రభుత్వ పథకాల లైబ్రరీ',
  librarySubtitle: 'కేంద్ర మరియు రాష్ట్ర సంక్షేమ పథకాలను బ్రౌజ్ చేయండి.',
  searchSchemesPlaceholder: 'పేరు ద్వారా పథకాలను వెతకండి...',
  allCategories: 'అన్ని విభాగాలు',
  noSchemesFound: 'ఎలాంటి పథకాలు కనుగొనబడలేదు.',
  savedSchemesTitle: 'సేవ్ చేసిన పథకాలు',
  savedSchemesSubtitle: 'తర్వాత సమీక్షించడానికి మీరు సేవ్ చేసిన పథకాలు.',
  noSavedSchemes: 'మీరు ఇంకా ఏ పథకాన్ని సేవ్ చేయలేదు.',
  browseToSave: 'పథకాలను కనుగొని సేవ్ చేయడానికి లైబ్రరీని చూడండి.',
  eligibilityTitle: 'పథక అర్హత తనిఖీ',
  eligibilitySubtitle: 'మీరు ఏ పథకాలకు అర్హులవుతారో తెలుసుకోవడానికి కొన్ని సాధారణ ప్రశ్నలకు సమాధానం ఇవ్వండి.',
  stepOccupation: 'మీ ప్రధాన వృత్తి ఏమిటి?',
  stepAge: 'మీ వయస్సు ఎంత?',
  stepState: 'మీరు ఏ రాష్ట్రంలో నివసిస్తున్నారు?',
  stepIncome: 'మీ కుటుంబ వార్షిక ఆదాయం ఎంత?',
  stepLand: 'వ్యవసాయ భూమి ఉందా?',
  stepCategories: 'వర్తించే విభాగాలను ఎంచుకోండి',
  yes: 'అవును',
  no: 'కాదు',
  next: 'తరువాత',
  previous: 'మునుపటి',
  seeResults: 'నా అర్హత పథకాలను చూడండి',
  eligibleResultsHeading: 'మీ అర్హత ఫలితాలు',
  resetAnswers: 'సమాధానాలు రీసెట్ చేయి',
  profileTitle: 'వినియోగదారు ప్రొఫైల్',
  profileSubtitle: 'మీ వివరాలు మరియు ప్రాధాన్యత భాషను నిర్వహించండి.',
  fullName: 'పూర్తి పేరు',
  state: 'రాష్ట్రం',
  occupation: 'వృత్తి',
  incomeRange: 'వార్షిక ఆదాయం',
  preferredLanguage: 'ప్రాధాన్యత భాష',
  saveChanges: 'మార్పులను సేవ్ చేయి',
  savedSuccess: 'ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!',
  helpTitle: 'సహాయం మరియు ఫిర్యాదుల మద్దతు',
  helpSubtitle: 'అధికారిక ప్రభుత్వ హెల్ప్‌లైన్‌లు మరియు మద్దతు.',
  nationalHelpline: 'జాతీయ పోర్టల్‌లు & హెల్ప్‌లైన్‌లు',
  faqTitle: 'తరచుగా అడిగే ప్రశ్నలు',
  feedbackTitle: 'ఫీడ్‌బ్యాక్ ఇవ్వండి',
  whatWasWrong: 'ఈ సమాధానంలో లోపం ఏమిటి?',
  wrongScheme: 'తప్పుడు పథకం',
  outdatedInfo: 'పాత సమాచారం',
  unclear: 'అస్పష్టంగా ఉంది',
  otherReason: 'ఇతర',
  commentsOptional: 'అదనపు వ్యాఖ్యలు (ఐచ్ఛికం)',
  submitFeedback: 'ఫీడ్‌బ్యాక్ సమర్పించండి',
};

// Generates sensible fallback to English strings for any untranslated key
function createLanguageStrings(
  overrides: Partial<TranslationStrings>,
  fallback = ENGLISH_STRINGS
): TranslationStrings {
  return { ...fallback, ...overrides };
}

// Full 12 languages dictionary
export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  English: ENGLISH_STRINGS,
  Kannada: KANNADA_STRINGS,
  Hindi: HINDI_STRINGS,
  Tamil: TAMIL_STRINGS,
  Telugu: TELUGU_STRINGS,

  Malayalam: createLanguageStrings({
    appName: 'സ്കീം സാഥി',
    tagline: 'നിങ്ങൾക്ക് അർഹതയുള്ള സർക്കാർ പദ്ധതികൾ കണ്ടെത്തുക',
    greeting: 'നമസ്കാരം! ഞാൻ സ്കീം സാഥി. സർക്കാർ പദ്ധതികൾ, യോഗ്യത എന്നിവയെക്കുറിച്ച് ചോദിക്കുക.',
    shortDisclaimer: 'വിവരങ്ങൾക്കായി മാത്രം. എപ്പോഴും ഔദ്യോഗിക പോർട്ടലിൽ അപേക്ഷിക്കുക.',
    newChat: 'പുതിയ ചാറ്റ്',
    savedSchemes: 'സൂക്ഷിച്ച പദ്ധതികൾ',
    schemesLibrary: 'പദ്ധതി ശേഖരം',
    checkEligibility: 'യോഗ്യത പരിശോധിക്കുക',
    howCanHelp: 'സ്കീം സാഥിക്ക് ഇന്ന് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?',
    askPlaceholder: 'പദ്ധതിയെക്കുറിച്ച് ചോദിക്കുക...',
    benefit: 'ആനുകൂല്യം',
    eligibility: 'യോഗ്യത',
    documents: 'രേഖകൾ',
    applyOfficialWebsite: 'ഔദ്യോഗിക വെബ്സൈറ്റിൽ അപേക്ഷിക്കുക',
    likelyEligible: 'യോഗ്യനാകാൻ സാധ്യതയുണ്ട്',
    suggestionFarmer: 'കർഷകർക്കുള്ള പദ്ധതികൾ',
  }),

  Marathi: createLanguageStrings({
    appName: 'स्कीम साथी',
    tagline: 'तुम्ही पात्र असलेल्या सरकारी योजना शोधा',
    greeting: 'नमस्ते! मी स्कीम साथी आहे. सरकारी योजना, पात्रता आणि कागदपत्रांबद्दल विचारा.',
    shortDisclaimer: 'फक्त माहितीसाठी. नेहमी अधिकृत पोर्टलवर अर्ज करा.',
    newChat: 'नवीन चॅट',
    savedSchemes: 'जतन केलेल्या योजना',
    schemesLibrary: 'योजना लायब्ररी',
    checkEligibility: 'पात्रता तपासा',
    howCanHelp: 'स्कीम साथी आज तुम्हाला कशी मदत करू शकते?',
    askPlaceholder: 'योजना किंवा सेवेबद्दल विचारा...',
    benefit: 'लाभ',
    eligibility: 'पात्रता',
    documents: 'कागदपत्रे',
    applyOfficialWebsite: 'अधिकृत संकेतस्थळावर अर्ज करा',
    likelyEligible: 'पात्र असण्याची शक्यता आहे',
    suggestionFarmer: 'शेतकऱ्यांसाठी योजना',
  }),

  Bengali: createLanguageStrings({
    appName: 'স্কিম সাথী',
    tagline: 'আপনি যোগ্য সরকারি প্রকল্পগুলি খুঁজুন',
    greeting: 'নমস্কার! আমি স্কিম সাথী। সরকারি প্রকল্প, যোগ্যতা এবং প্রয়োজনীয় নথি সম্পর্কে জানুন।',
    shortDisclaimer: 'শুধুমাত্র তথ্যের জন্য। সর্বদা সরকারি পোর্টালে আবেদন করুন।',
    newChat: 'নতুন চ্যাট',
    savedSchemes: 'সংরক্ষিত প্রকল্প',
    schemesLibrary: 'প্রকল্প লাইব্রেরি',
    checkEligibility: 'যোগ্যতা যাচাই করুন',
    howCanHelp: 'স্কিম সাথী আজ আপনাকে কীভাবে সাহায্য করতে পারে?',
    askPlaceholder: 'প্রকল্প বা পরিষেবা সম্পর্কে জিজ্ঞাসা করুন...',
    benefit: 'সুবিধা',
    eligibility: 'যোগ্যতা',
    documents: 'নথিপত্র',
    applyOfficialWebsite: 'অফিসিয়াল ওয়েবসাইটে আবেদন করুন',
    likelyEligible: 'যোগ্য হওয়ার সম্ভাবনা রয়েছে',
    suggestionFarmer: 'কৃষকদের জন্য প্রকল্প',
  }),

  Gujarati: createLanguageStrings({
    appName: 'સ્કીમ સાથી',
    tagline: 'તમે પાત્ર છો તેવી સરકારી યોજનાઓ શોધો',
    greeting: 'નમસ્તે! હું સ્કીમ સાથી છું. સરકારી યોજનાઓ, યોગ્યતા અને જરૂરી દસ્તાવેજો વિશે પૂછો.',
    shortDisclaimer: 'માત્ર માહિતી માટે. હંમેશા સત્તાવાર પોર્ટલ પર અરજી કરો.',
    newChat: 'નવી ચેટ',
    savedSchemes: 'સાચવેલી યોજનાઓ',
    schemesLibrary: 'યોજના લાઈબ્રેરી',
    checkEligibility: 'પાત્રતા તપાસો',
    howCanHelp: 'સ્કીમ સાથી આજે તમને કેવી રીતે મદદ કરી શકે?',
    askPlaceholder: 'યોજના અથવા સેવા વિશે પૂછો...',
    benefit: 'લાભ',
    eligibility: 'પાત્રતા',
    documents: 'દસ્તાવેજો',
    applyOfficialWebsite: 'સત્તાવાર વેબસાઇટ પર અરજી કરો',
    likelyEligible: 'પાત્ર હોવાની સંભાવના છે',
    suggestionFarmer: 'ખેડૂતો માટેની યોજનાઓ',
  }),

  Punjabi: createLanguageStrings({
    appName: 'ਸਕੀਮ ਸਾਥੀ',
    tagline: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਲੱਭੋ ਜਿਨ੍ਹਾਂ ਦੇ ਤੁਸੀਂ ਯੋਗ ਹੋ',
    greeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਕੀਮ ਸਾਥੀ ਹਾਂ। ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਯੋਗਤਾ ਬਾਰੇ ਪੁੱਛੋ।',
    shortDisclaimer: 'ਸਿਰਫ ਜਾਣਕਾਰੀ ਲਈ। ਹਮੇਸ਼ਾ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਤੇ ਅਪਲਾਈ ਕਰੋ।',
    newChat: 'ਨਵੀਂ ਚੈਟ',
    savedSchemes: 'ਸੰਭਾਲੀਆਂ ਸਕੀਮਾਂ',
    schemesLibrary: 'ਸਕੀਮ ਲਾਇਬ੍ਰੇਰੀ',
    checkEligibility: 'ਯੋਗਤਾ ਜਾਂਚੋ',
    howCanHelp: 'ਸਕੀਮ ਸਾਥੀ ਅੱਜ ਤੁਹਾਡੀ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ?',
    askPlaceholder: 'ਕਿਸੇ ਸਕੀਮ ਬਾਰੇ ਪੁੱਛੋ...',
    benefit: 'ਲਾਭ',
    eligibility: 'ਯੋਗਤਾ',
    documents: 'ਦਸਤਾਵੇਜ਼',
    applyOfficialWebsite: 'ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ਤੇ ਅਪਲਾਈ ਕਰੋ',
    likelyEligible: 'ਯੋਗ ਹੋਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ',
    suggestionFarmer: 'ਕਿਸਾਨਾਂ ਲਈ ਸਕੀਮਾਂ',
  }),

  Odia: createLanguageStrings({
    appName: 'ସ୍କିମ୍ ସାଥୀ',
    tagline: 'ଆପଣ ଯୋଗ୍ୟ ଥିବା ସରକାରୀ ଯୋଜନା ଖୋଜନ୍ତୁ',
    greeting: 'ନମସ୍କାର! ମୁଁ ସ୍କିମ୍ ସାଥୀ। ସରକାରୀ ଯୋଜନା ଓ ଯୋଗ୍ୟତା ବିଷୟରେ ପଚାରନ୍ତୁ।',
    shortDisclaimer: 'କେବଳ ସୂଚନା ପାଇଁ। ସର୍ବଦା ଅଫିସିଆଲ୍ ପୋର୍ଟାଲରେ ଆବେଦନ କରନ୍ତୁ।',
    newChat: 'ନୂଆ ଚାଟ୍',
    savedSchemes: 'ସଂରକ୍ଷିତ ଯୋଜନା',
    schemesLibrary: 'ଯୋଜନା ଲାଇବ୍ରେରୀ',
    checkEligibility: 'ଯୋଗ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ',
    howCanHelp: 'ସ୍କିମ୍ ସାଥୀ ଆଜି ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବ?',
    askPlaceholder: 'ଯୋଜନା ବିଷୟରେ ପଚାରନ୍ତୁ...',
    benefit: 'ଲାଭ',
    eligibility: 'ଯୋଗ୍ୟତା',
    documents: 'ଦସ୍ତାବିଜ',
    applyOfficialWebsite: 'ଅଫିସିଆଲ୍ ୱେବସାଇଟରେ ଆବେଦନ କରନ୍ତୁ',
    likelyEligible: 'ଯୋଗ୍ୟ ହେବାର ସମ୍ଭାବନା ଅଛି',
    suggestionFarmer: 'କୃଷକଙ୍କ ପାଇଁ ଯୋଜନା',
  }),

  Urdu: createLanguageStrings({
    appName: 'اسکیم ساتھی',
    tagline: 'وہ سرکاری اسکیمیں تلاش کریں جن کے آپ اہل ہیں',
    greeting: 'آداب! میں اسکیم ساتھی ہوں۔ سرکاری اسکیموں اور اہلیت کے بارے میں پوچھیں۔',
    shortDisclaimer: 'صرف معلومات کے لیے۔ ہمیشہ سرکاری پورٹل پر درخواست دیں۔',
    newChat: 'نئی بات چیت',
    savedSchemes: 'محفوظ شدہ اسکیمیں',
    schemesLibrary: 'اسکیموں کی لائبریری',
    checkEligibility: 'اہلیت چیک کریں',
    howCanHelp: 'اسکیم ساتھی آج آپ کی کیا مدد کر سکتا ہے؟',
    askPlaceholder: 'کسی اسکیم کے بارے میں پوچھیں...',
    benefit: 'فوائد',
    eligibility: 'اہلیت',
    documents: 'دستاویزات',
    applyOfficialWebsite: 'سرکاری ویب سائٹ پر درخواست دیں',
    likelyEligible: 'اہل ہونے کا امکان ہے',
    suggestionFarmer: 'کسانوں کے لیے اسکیمیں',
  }),
};

export function getTranslations(lang: SupportedLanguage): TranslationStrings {
  return TRANSLATIONS[lang] || TRANSLATIONS.English;
}
