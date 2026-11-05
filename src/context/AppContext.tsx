import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  UserProfile, 
  ChatSession, 
  ChatMessage, 
  AppNotification, 
  NotificationSettings, 
  SupportedLanguage,
  Scheme,
  FeedbackData
} from '../types';
import { Storage } from '../lib/storage';
import { 
  getUser, 
  saveUser, 
  signOut as sessionSignOut, 
  clearUserAccount, 
  UserSession 
} from '../lib/session';
import { TRANSLATIONS, TranslationStrings } from '../lib/translations';

interface ToastState {
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isRegistered: boolean;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationStrings;
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  
  // Auth & Profile
  signInAsAsha: (emailOverride?: string) => UserSession;
  registerUser: (data: { name: string; state: string; language: SupportedLanguage; categories: string[]; notifyInApp: boolean; notifyEmail: boolean }) => UserSession;
  updateProfile: (updates: Partial<UserSession>) => void;
  signOut: () => void;
  deleteAccount: () => void;

  // Saved Schemes
  savedSchemeIds: string[];
  toggleSaveScheme: (schemeId: string) => boolean;
  isSchemeSaved: (schemeId: string) => boolean;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: NotificationSettings) => void;

  // Chats
  chats: ChatSession[];
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  createNewChat: () => string;
  updateChatTitle: (chatId: string, newTitle: string) => void;
  deleteChat: (chatId: string) => void;
  deleteAllChats: () => void;
  appendMessage: (chatId: string, message: ChatMessage) => void;
  updateFeedback: (chatId: string, messageId: string, feedback: FeedbackData) => void;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => Storage.getTheme());
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Track system dark mode change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: 'light' | 'dark' = theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    Storage.setTheme(theme);
  }, [theme, resolvedTheme]);

  const setTheme = (t: 'light' | 'dark' | 'system') => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const current = prev === 'system' ? (systemIsDark ? 'dark' : 'light') : prev;
      return current === 'dark' ? 'light' : 'dark';
    });
  };

  // User state from session.ts
  const [user, setUser] = useState<UserSession | null>(() => getUser());
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = Storage.getLanguage();
    return saved;
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    Storage.setLanguage(lang);
    if (user) {
      const updated = { ...user, language: lang };
      setUser(updated);
      saveUser(updated);
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.English;

  // Saved Schemes
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => Storage.getSavedSchemes());

  const toggleSaveScheme = useCallback((schemeId: string): boolean => {
    let nowSaved = false;
    setSavedSchemeIds((prev) => {
      let next: string[];
      if (prev.includes(schemeId)) {
        next = prev.filter((id) => id !== schemeId);
        nowSaved = false;
      } else {
        next = [...prev, schemeId];
        nowSaved = true;
      }
      Storage.setSavedSchemes(next);
      return next;
    });
    return nowSaved;
  }, []);

  const isSchemeSaved = useCallback((schemeId: string) => {
    return savedSchemeIds.includes(schemeId);
  }, [savedSchemeIds]);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => Storage.getNotifications());
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => Storage.getNotificationSettings());

  const seedNotifications = useCallback((userCategories: string[]) => {
    const current = Storage.getNotifications();
    if (current.length > 0) return; // already seeded

    const seeded: AppNotification[] = [];
    const now = Date.now();

    if (userCategories.includes('Farmer')) {
      seeded.push({
        id: 'notif-farmer-1',
        category: 'Farmer',
        title: 'PM-KISAN: Scheme records updated',
        message: 'The 18th instalment verification and e-KYC deadline details have been officially updated.',
        timestamp: now - 1000 * 60 * 60 * 2, // 2 hours ago
        read: false,
        schemeId: 'pm-kisan',
      });
    }

    if (userCategories.includes('Student')) {
      seeded.push({
        id: 'notif-student-1',
        category: 'Student',
        title: 'National Scholarship window open',
        message: 'Central and state post-matric scholarship applications are actively being accepted.',
        timestamp: now - 1000 * 60 * 60 * 5,
        read: false,
        schemeId: 'national-scholarship',
      });
    }

    if (userCategories.includes('Small business owner') || userCategories.includes('Woman')) {
      seeded.push({
        id: 'notif-mudra-1',
        category: 'Business',
        title: 'PM Mudra Yojana collateral-free limits',
        message: 'Tarun and Kishor business credit allocations updated for the current fiscal cycle.',
        timestamp: now - 1000 * 60 * 60 * 18,
        read: false,
        schemeId: 'pm-mudra',
      });
    }

    if (userCategories.includes('Senior citizen')) {
      seeded.push({
        id: 'notif-senior-1',
        category: 'Senior citizen',
        title: 'Atal Pension Yojana contribution slabs',
        message: 'Auto-debit dates and pension slab guidelines confirmed for subscriber accounts.',
        timestamp: now - 1000 * 60 * 60 * 24,
        read: false,
        schemeId: 'atal-pension',
      });
    }

    // If still less than 3, add health or housing notification
    if (seeded.length < 3) {
      seeded.push({
        id: 'notif-health-1',
        category: 'Health',
        title: 'Ayushman Bharat card renewal guidance',
        message: 'Check your family ration card seeding status for ₹5 Lakh cashless hospitalisation.',
        timestamp: now - 1000 * 60 * 60 * 36,
        read: false,
        schemeId: 'ayushman-bharat',
      });
    }

    if (seeded.length < 3) {
      seeded.push({
        id: 'notif-housing-1',
        category: 'Housing',
        title: 'PM Awas Yojana beneficiary lists',
        message: 'Updated rural and urban Gram Panchayat priority lists released.',
        timestamp: now - 1000 * 60 * 60 * 48,
        read: false,
        schemeId: 'pm-awas',
      });
    }

    // Keep top 3
    const finalSeeded = seeded.slice(0, 3);
    setNotifications(finalSeeded);
    Storage.setNotifications(finalSeeded);
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      Storage.setNotifications(updated);
      return updated;
    });
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      Storage.setNotifications(updated);
      return updated;
    });
  }, []);

  const updateNotificationSettings = useCallback((settings: NotificationSettings) => {
    setNotificationSettings(settings);
    Storage.setNotificationSettings(settings);
  }, []);

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3000);
  }, []);

  // Chats
  const [chats, setChats] = useState<ChatSession[]>(() => Storage.getChats());
  const [currentChatId, setCurrentChatId] = useState<string | null>(() => {
    const list = Storage.getChats();
    return list.length > 0 ? list[0].id : null;
  });

  const createNewChat = useCallback((): string => {
    const newId = 'chat-' + Date.now();
    const newChat: ChatSession = {
      id: newId,
      title: 'New conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setChats((prev) => {
      const updated = [newChat, ...prev];
      Storage.setChats(updated);
      return updated;
    });
    setCurrentChatId(newId);
    return newId;
  }, []);

  const updateChatTitle = useCallback((chatId: string, newTitle: string) => {
    setChats((prev) => {
      const updated = prev.map((c) => (c.id === chatId ? { ...c, title: newTitle.trim() || 'Untitled' } : c));
      Storage.setChats(updated);
      return updated;
    });
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    setChats((prev) => {
      const updated = prev.filter((c) => c.id !== chatId);
      Storage.setChats(updated);
      return updated;
    });
    setCurrentChatId((prev) => (prev === chatId ? null : prev));
    showToast('Chat deleted', 'info');
  }, [showToast]);

  const deleteAllChats = useCallback(() => {
    setChats([]);
    setCurrentChatId(null);
    Storage.setChats([]);
    showToast('All chats deleted', 'info');
  }, [showToast]);

  const appendMessage = useCallback((chatId: string, message: ChatMessage) => {
    setChats((prev) => {
      const existing = prev.find((c) => c.id === chatId);
      let updated: ChatSession[];

      if (existing) {
        // Update title from first message if it's the first user message and title is "New conversation"
        let title = existing.title;
        if (existing.messages.length === 0 && message.role === 'user') {
          title = message.text.slice(0, 40).trim();
        }

        updated = prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                title,
                updatedAt: Date.now(),
                messages: [...c.messages, message],
              }
            : c
        );
      } else {
        // Create new chat
        const title = message.role === 'user' ? message.text.slice(0, 40).trim() : 'New conversation';
        const newChat: ChatSession = {
          id: chatId,
          title: title || 'New conversation',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [message],
        };
        updated = [newChat, ...prev];
      }

      Storage.setChats(updated);
      return updated;
    });
  }, []);

  const updateFeedback = useCallback((chatId: string, messageId: string, feedback: FeedbackData) => {
    setChats((prev) => {
      const updated = prev.map((c) => {
        if (c.id !== chatId) return c;
        return {
          ...c,
          messages: c.messages.map((m) =>
            m.id === messageId
              ? { ...m, feedback, feedbackSubmitted: true }
              : m
          ),
        };
      });
      Storage.setChats(updated);
      return updated;
    });
    Storage.saveFeedback(feedback);
  }, []);

  // Auth actions
  const signInAsAsha = useCallback((emailOverride?: string): UserSession => {
    const existing = getUser();
    let updated: UserSession;
    if (existing) {
      updated = {
        ...existing,
        signedIn: true,
        email: emailOverride || existing.email || 'asha.verma@example.in',
      };
    } else {
      updated = {
        signedIn: true,
        registered: false,
        name: 'Asha Verma',
        state: 'Uttar Pradesh',
        language: 'English',
        categories: ['Farmer'],
        notifyInApp: true,
        notifyEmail: true,
        email: emailOverride || 'asha.verma@example.in',
      };
    }
    saveUser(updated);
    setUser(updated);
    if (updated.registered) {
      seedNotifications(updated.categories);
    }
    return updated;
  }, [seedNotifications]);

  const registerUser = useCallback((data: {
    name: string;
    state: string;
    language: SupportedLanguage;
    categories: string[];
    notifyInApp: boolean;
    notifyEmail: boolean;
  }): UserSession => {
    const current = getUser();
    const registered: UserSession = {
      ...(current || {}),
      name: data.name,
      state: data.state,
      language: data.language,
      categories: data.categories,
      notifyInApp: data.notifyInApp,
      notifyEmail: data.notifyEmail,
      signedIn: true,
      registered: true,
    };

    saveUser(registered);
    setUser(registered);
    setLanguage(data.language);
    seedNotifications(data.categories);

    // Initialize welcome conversation for immediate chatting
    const existingChats = Storage.getChats();
    if (existingChats.length === 0) {
      const welcomeChatId = 'chat-' + Date.now();
      const welcomeChat: ChatSession = {
        id: welcomeChatId,
        title: 'Schemes for ' + data.name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [
          {
            id: 'msg-welcome',
            role: 'assistant',
            text: `Namaste ${data.name}! Welcome to Scheme Saathi. Your profile is set up as a ${data.categories.join(', ')} residing in ${data.state}.\n\nAsk me anything about government schemes you qualify for, check your eligibility, or see document requirements!`,
            timestamp: Date.now(),
          },
        ],
      };
      setChats([welcomeChat]);
      Storage.setChats([welcomeChat]);
      setCurrentChatId(welcomeChatId);
    }

    showToast('Profile created successfully!', 'success');
    return registered;
  }, [setLanguage, seedNotifications, showToast]);

  const updateProfile = useCallback((updates: Partial<UserSession>) => {
    setUser((prev) => {
      const current = prev || getUser();
      if (!current) return null;
      const updated: UserSession = { ...current, ...updates };
      saveUser(updated);
      if (updates.language) {
        setLanguageState(updates.language);
        Storage.setLanguage(updates.language);
      }
      return updated;
    });
    showToast('Profile updated successfully', 'success');
  }, [showToast]);

  const signOut = useCallback(() => {
    sessionSignOut();
    setUser(getUser());
    showToast('Signed out', 'info');
  }, [showToast]);

  const deleteAccount = useCallback(() => {
    clearUserAccount();
    Storage.clearAll();
    setUser(null);
    setChats([]);
    setSavedSchemeIds([]);
    setNotifications([]);
    setCurrentChatId(null);
    setThemeState('system');
    setLanguageState('English');
    showToast('Account and all local data cleared', 'info');
  }, [showToast]);

  const isAuthenticated = Boolean(user && user.signedIn);
  const isOnboarded = Boolean(user && user.registered);
  const isRegistered = Boolean(user && user.registered);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isOnboarded,
        isRegistered,
        language,
        setLanguage,
        t,
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        signInAsAsha,
        registerUser,
        updateProfile,
        signOut,
        deleteAccount,
        savedSchemeIds,
        toggleSaveScheme,
        isSchemeSaved,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        notificationSettings,
        updateNotificationSettings,
        chats,
        currentChatId,
        setCurrentChatId,
        createNewChat,
        updateChatTitle,
        deleteChat,
        deleteAllChats,
        appendMessage,
        updateFeedback,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
