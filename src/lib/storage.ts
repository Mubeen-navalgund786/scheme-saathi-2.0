import { 
  UserProfile, 
  ChatSession, 
  AppNotification, 
  NotificationSettings, 
  FeedbackData, 
  WrongAnswerReport, 
  SupportedLanguage 
} from '../types';

const KEYS = {
  USER: 'scheme_saathi_user',
  CHATS: 'scheme_saathi_chats',
  SAVED_SCHEMES: 'scheme_saathi_saved_schemes',
  NOTIFICATIONS: 'scheme_saathi_notifications',
  NOTIFICATION_SETTINGS: 'scheme_saathi_notification_settings',
  THEME: 'scheme_saathi_theme',
  LANGUAGE: 'scheme_saathi_language',
  FEEDBACKS: 'scheme_saathi_feedbacks',
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
    return getItem<ChatSession[]>(KEYS.CHATS, []);
  },
  setChats(chats: ChatSession[]): void {
    setItem(KEYS.CHATS, chats);
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
    if (lang === 'English' || lang === 'Hindi' || lang === 'Kannada' || lang === 'Tamil') {
      return lang;
    }
    return 'English';
  },
  setLanguage(lang: SupportedLanguage): void {
    localStorage.setItem(KEYS.LANGUAGE, lang);
  },

  getFeedbacks(): FeedbackData[] {
    return getItem<FeedbackData[]>(KEYS.FEEDBACKS, []);
  },
  saveFeedback(fb: FeedbackData): void {
    const list = this.getFeedbacks();
    list.push(fb);
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
