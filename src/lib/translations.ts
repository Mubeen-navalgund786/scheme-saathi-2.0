import { SupportedLanguage } from '../types';

export interface TranslationStrings {
  appName: string;
  tagline: string;
  greeting: string;
  disclaimer: string;
  shortDisclaimer: string;
  startChatting: string;
  browseSchemes: string;
  checkEligibility: string;
  askPlaceholder: string;
  schemesLibrary: string;
  savedSchemes: string;
  notifications: string;
  profile: string;
  signOut: string;
  newChat: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  English: {
    appName: 'Scheme Saathi',
    tagline: 'Find government schemes you qualify for',
    greeting: 'Namaste! I am Scheme Saathi. Ask me about Indian government schemes, check your eligibility, or see required documents.',
    disclaimer: 'Scheme Saathi is an informational service. It is not a government website. Always apply on the official government portal.',
    shortDisclaimer: 'Informational only. Always apply on the official government portal.',
    startChatting: 'Start chatting',
    browseSchemes: 'Browse schemes',
    checkEligibility: 'Check eligibility',
    askPlaceholder: 'Ask about a scheme or service...',
    schemesLibrary: 'Scheme library',
    savedSchemes: 'Saved schemes',
    notifications: 'Notifications',
    profile: 'Profile',
    signOut: 'Sign out',
    newChat: 'New chat',
  },
  Hindi: {
    appName: 'स्कीम साथी',
    tagline: 'सरकारी योजनाएं खोजें जिनके आप पात्र हैं',
    greeting: 'नमस्ते! मैं स्कीम साथी हूँ। सरकारी योजनाओं, पात्रता जांच और आवश्यक दस्तावेजों के बारे में पूछें।',
    disclaimer: 'स्कीम साथी एक सूचनात्मक सेवा है। यह सरकारी वेबसाइट नहीं है। हमेशा आधिकारिक सरकारी पोर्टल पर ही आवेदन करें।',
    shortDisclaimer: 'केवल सूचनात्मक उद्देश्य। हमेशा आधिकारिक सरकारी पोर्टल पर आवेदन करें।',
    startChatting: 'बातचीत शुरू करें',
    browseSchemes: 'योजनाएं देखें',
    checkEligibility: 'पात्रता जांचें',
    askPlaceholder: 'किसी योजना या सेवा के बारे में पूछें...',
    schemesLibrary: 'योजना लाइब्रेरी',
    savedSchemes: 'सहेजी गई योजनाएं',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल',
    signOut: 'साइन आउट',
    newChat: 'नई चैट',
  },
  Kannada: {
    appName: 'ಸ್ಕೀಮ್ ಸಾಥಿ',
    tagline: 'ನೀವು ಅರ್ಹತೆ ಹೊಂದಿರುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ',
    greeting: 'ನಮಸ್ಕಾರ! ನಾನು ಸ್ಕೀಮ್ ಸಾಥಿ. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ನಿಮ್ಮ ಅರ್ಹತೆ ಪರಿಶೀಲನೆ ಅಥವಾ ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.',
    disclaimer: 'ಸ್ಕೀಮ್ ಸಾಥಿ ಕೇವಲ ಮಾಹಿತಿ ಸೇವೆಯಾಗಿದೆ. ಇದು ಸರ್ಕಾರಿ ಜಾಲತಾಣವಲ್ಲ. ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    shortDisclaimer: 'ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ. ಯಾವಾಗಲೂ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    startChatting: 'ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    browseSchemes: 'ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    checkEligibility: 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ',
    askPlaceholder: 'ಯೋಜನೆ ಅಥವಾ ಸೇವೆಯ ಬಗ್ಗೆ ಕೇಳಿ...',
    schemesLibrary: 'ಯೋಜನೆ ಸಂಗ್ರಹ',
    savedSchemes: 'ಉಳಿಸಿದ ಯೋಜನೆಗಳು',
    notifications: 'ಸೂಚನೆಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    newChat: 'ಹೊಸ ಚಾಟ್',
  },
  Tamil: {
    appName: 'ஸ்கீம் சாதி',
    tagline: 'நீங்கள் தகுதிபெறும் அரசுத் திட்டங்களைக் கண்டறியுங்கள்',
    greeting: 'வணக்கம்! நான் ஸ்கீம் சாதி. அரசுத் திட்டங்கள், உங்கள் தகுதி அல்லது தேவையான ஆவணங்கள் பற்றி கேளுங்கள்.',
    disclaimer: 'ஸ்கீம் சாதி ஒரு தகவல் வழங்கும் சேவையாகும். இது அரசு இணையதளம் அல்ல. எப்போதும் அதிகாரப்பூர்வ அரசு தளத்திலேயே விண்ணப்பிக்கவும்.',
    shortDisclaimer: 'தகவல் நோக்கத்திற்காக மட்டுமே. எப்போதும் அதிகாரப்பூர்வ அரசு தளத்தில் விண்ணப்பிக்கவும்.',
    startChatting: 'உரையாடலைத் தொடங்குங்கள்',
    browseSchemes: 'திட்டங்களை உலாவுக',
    checkEligibility: 'தகுதியைச் சரிபார்க்கவும்',
    askPlaceholder: 'திட்டம் அல்லது சேவை பற்றி கேளுங்கள்...',
    schemesLibrary: 'திட்ட நூலகம்',
    savedSchemes: 'சேமிக்கப்பட்ட திட்டங்கள்',
    notifications: 'அறிவிப்புகள்',
    profile: 'சுயவிவரம்',
    signOut: 'வெளியேறு',
    newChat: 'புதிய உரையாடல்',
  },
};
