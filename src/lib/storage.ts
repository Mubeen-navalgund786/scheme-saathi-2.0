import { 
  UserProfile, 
  ChatSession, 
  AppNotification, 
  NotificationSettings, 
  FeedbackData, 
  WrongAnswerReport, 
  SupportedLanguage 
} from '../types';

import { MOCK_SCHEMES } from '../data/schemes';

const KEYS = {
  USER: 'scheme-saathi-user',
  CHATS: 'scheme-saathi-chats',
  OLD_CHATS: 'scheme_saathi_chats',
  SAVED_SCHEMES: 'scheme_saathi_saved_schemes',
  NOTIFICATIONS: 'scheme_saathi_notifications',
  NOTIFICATION_SETTINGS: 'scheme_saathi_notification_settings',
  THEME: 'scheme_saathi_theme',
  LANGUAGE: 'scheme_saathi_language',
  FEEDBACKS: 'scheme-saathi-feedback',
  OLD_FEEDBACKS: 'scheme_saathi_feedbacks',
  REPORTS: 'scheme_saathi_reports',
};

// Safe JSON parser
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving to localStorage key "${key}":`, e);
  }
}

export const Storage = {
  getUser(): UserProfile | null {
    return getItem<UserProfile | null>(KEYS.USER, null);
  },
  setUser(user: UserProfile | null): void {
    if (user === null) {
      localStorage.removeItem(KEYS.USER);
    } else {
      setItem(KEYS.USER, user);
    }
  },

  getChats(): ChatSession[] {
    const rawList = getItem<ChatSession[]>(KEYS.CHATS, []) || [];
    const list = rawList.length > 0 ? rawList : getItem<ChatSession[]>(KEYS.OLD_CHATS, []);
    
    // Hydrate scheme objects from schemeIds if needed and ensure role is 'user' | 'bot'
    return list.map((chat) => ({
      ...chat,
      messages: (chat.messages || []).map((msg) => {
        const role = (msg.role === 'assistant' ? 'bot' : msg.role) as 'user' | 'bot';
        const schemeIds = msg.schemeIds || (msg.schemes ? msg.schemes.map((s) => s.id) : []);
        const schemes = msg.schemes && msg.schemes.length > 0 
          ? msg.schemes 
          : MOCK_SCHEMES.filter((s) => schemeIds.includes(s.id));
        
        return {
          ...msg,
          role,
          schemeIds,
          schemes,
          createdAt: msg.createdAt || msg.timestamp || Date.now(),
        };
      }),
    }));
  },
  setChats(chats: ChatSession[]): void {
    // Ensure clean serialization as { id, role, text, schemeIds, createdAt }
    const formatted = chats.map((c) => ({
      ...c,
      messages: (c.messages || []).map((m) => ({
        id: m.id,
        role: (m.role === 'assistant' ? 'bot' : m.role) as 'user' | 'bot',
        text: m.text,
        schemeIds: m.schemeIds || (m.schemes ? m.schemes.map((s) => s.id) : []),
        createdAt: m.createdAt || m.timestamp || Date.now(),
        ...(m.actionButton ? { actionButton: m.actionButton } : {}),
        ...(m.feedback ? { feedback: m.feedback } : {}),
        ...(m.feedbackSubmitted ? { feedbackSubmitted: true } : {}),
      })),
    }));
    setItem(KEYS.CHATS, formatted);
  },

  getSavedSchemes(): string[] {
    return getItem<string[]>(KEYS.SAVED_SCHEMES, []);
  },
  setSavedSchemes(ids: string[]): void {
    setItem(KEYS.SAVED_SCHEMES, ids);
  },

  getNotifications(): AppNotification[] {
    return getItem<AppNotification[]>(KEYS.NOTIFICATIONS, []);
  },
  setNotifications(notifications: AppNotification[]): void {
    setItem(KEYS.NOTIFICATIONS, notifications);
  },

  getNotificationSettings(): NotificationSettings {
    return getItem<NotificationSettings>(KEYS.NOTIFICATION_SETTINGS, {
      inApp: true,
      email: true,
      paused: false,
      frequency: 'instant',
      categoryToggles: {
        Farmer: true,
        Student: true,
        Woman: true,
        'Senior citizen': true,
        'Small business owner': true,
        Other: true,
      },
    });
  },
  setNotificationSettings(settings: NotificationSettings): void {
    setItem(KEYS.NOTIFICATION_SETTINGS, settings);
  },

  getTheme(): 'light' | 'dark' | 'system' {
    const t = localStorage.getItem(KEYS.THEME);
    if (t === 'light' || t === 'dark' || t === 'system') return t;
    return 'system';
  },
  setTheme(theme: 'light' | 'dark' | 'system'): void {
    localStorage.setItem(KEYS.THEME, theme);
  },

  getLanguage(): SupportedLanguage {
    const lang = localStorage.getItem(KEYS.LANGUAGE);
    const validLanguages: SupportedLanguage[] = [
      'English',
      'Kannada',
      'Hindi',
      'Tamil',
      'Telugu',
      'Malayalam',
      'Marathi',
      'Bengali',
      'Gujarati',
      'Punjabi',
      'Odia',
      'Urdu',
    ];
    if (lang && validLanguages.includes(lang as SupportedLanguage)) {
      return lang as SupportedLanguage;
    }
    return 'English';
  },
  setLanguage(lang: SupportedLanguage): void {
    localStorage.setItem(KEYS.LANGUAGE, lang);
  },

  getFeedbacks(): FeedbackData[] {
    const list = getItem<FeedbackData[]>(KEYS.FEEDBACKS, []);
    return list.length > 0 ? list : getItem<FeedbackData[]>(KEYS.OLD_FEEDBACKS, []);
  },
  saveFeedback(fb: FeedbackData): void {
    const list = this.getFeedbacks();
    const cleanEntry: FeedbackData = {
      messageId: fb.messageId,
      rating: fb.rating,
      ...(fb.reason ? { reason: fb.reason } : {}),
      ...(fb.comment ? { comment: fb.comment } : {}),
    };
    list.push(cleanEntry);
    setItem(KEYS.FEEDBACKS, list);
  },

  getReports(): WrongAnswerReport[] {
    return getItem<WrongAnswerReport[]>(KEYS.REPORTS, []);
  },
  saveReport(report: WrongAnswerReport): void {
    const list = this.getReports();
    list.push(report);
    setItem(KEYS.REPORTS, list);
  },

  clearAll(): void {
    localStorage.clear();
  },
};
