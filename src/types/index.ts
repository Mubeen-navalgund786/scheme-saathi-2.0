/**
 * Scheme Saathi Types
 */

export type SchemeCategory = 
  | 'Farmers' 
  | 'Students' 
  | 'Women' 
  | 'Business' 
  | 'Health' 
  | 'Housing' 
  | 'Seniors' 
  | 'Other';

export interface Scheme {
  id: string;
  name: string;
  category: SchemeCategory;
  level: 'central' | 'state';
  benefit: string;
  eligibility: string;
  documents: string[];
  officialUrl: string;
  source: string;
  lastUpdated: string;
}

export type EligibilityStatus = 'Likely eligible' | 'Check eligibility' | 'Not eligible';

export interface EligibilityResult {
  scheme: Scheme;
  status: EligibilityStatus;
  reasons: string[];
  score: number;
}

export interface EligibilityAnswers {
  age?: number;
  state?: string;
  occupation?: string;
  incomeRange?: 'below 1 lakh' | '1 to 3 lakh' | '3 to 8 lakh' | 'above 8 lakh';
  ownsAgriculturalLand?: boolean;
  categories: string[];
}

export type SupportedLanguage = 'English' | 'Hindi' | 'Kannada' | 'Tamil';

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  state: string;
  language: SupportedLanguage;
  categories: string[];
  notifyInApp: boolean;
  notifyEmail: boolean;
  signedIn: boolean;
  registered: boolean;
  age?: number;
  occupation?: string;
  incomeRange?: string;
  landOwned?: boolean;
  ownsLand?: boolean;
}

export interface FeedbackData {
  rating: 'up' | 'down';
  reason?: 'Wrong scheme' | 'Outdated information' | 'Unclear' | 'Other';
  comment?: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
  schemes?: Scheme[];
  feedback?: FeedbackData;
  feedbackSubmitted?: boolean;
  actionButton?: {
    label: string;
    route: string;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  category: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  schemeId?: string;
}

export interface NotificationSettings {
  inApp: boolean;
  email: boolean;
  paused: boolean;
  frequency: 'instant' | 'daily';
  categoryToggles: Record<string, boolean>;
}

export interface WrongAnswerReport {
  id: string;
  category: string;
  message: string;
  timestamp: number;
  userEmail?: string;
}
