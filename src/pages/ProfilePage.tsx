import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Trash2, 
  AlertTriangle, 
  Save, 
  Check, 
  X,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES_AND_UTS, CITIZEN_CATEGORIES, OCCUPATIONS } from '../data/indianStates';
import { SupportedLanguage } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    updateProfile, 
    deleteAllChats, 
    deleteAccount, 
    showToast 
  } = useApp();

  // Form state
  const [name, setName] = useState(user?.name || 'Asha Verma');
  const [state, setState] = useState(user?.state || 'Uttar Pradesh');
  const [language, setLanguage] = useState<SupportedLanguage>(user?.language || 'English');
  const [categories, setCategories] = useState<string[]>(user?.categories || ['Farmer']);
  const [notifyInApp, setNotifyInApp] = useState(user?.notifyInApp ?? true);
  const [notifyEmail, setNotifyEmail] = useState(user?.notifyEmail ?? true);
  const [age, setAge] = useState<number | undefined>(user?.age);
  const [occupation, setOccupation] = useState<string | undefined>(user?.occupation);

  // Danger zone modals
  const [deleteChatsModal, setDeleteChatsModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setState(user.state);
      setLanguage(user.language);
      setCategories(user.categories || []);
      setNotifyInApp(user.notifyInApp ?? true);
      setNotifyEmail(user.notifyEmail ?? true);
      setAge(user.age);
      setOccupation(user.occupation);
    }
  }, [user]);

  const toggleCategory = (catId: string) => {
    setCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    if (categories.length === 0) {
      showToast('Please select at least one category', 'error');
      return;
    }

    updateProfile({
      name: name.trim(),
      state,
      language,
      categories,
      notifyInApp,
      notifyEmail,
      age,
      occupation,
    });
    navigate('/chat');
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setState(user.state);
      setLanguage(user.language);
      setCategories(user.categories || []);
      setNotifyInApp(user.notifyInApp ?? true);
      setNotifyEmail(user.notifyEmail ?? true);
      setAge(user.age);
      setOccupation(user.occupation);
    }
    showToast('Changes discarded', 'info');
  };

  const handleConfirmDeleteChats = () => {
    deleteAllChats();
    setDeleteChatsModal(false);
  };

  const handleConfirmDeleteAccount = () => {
    if (deleteConfirmationText.trim() !== 'DELETE') return;
    deleteAccount();
    setDeleteAccountModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
            Profile & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
            Manage your citizen details, target categories, notification preferences, and storage settings.
          </p>
        </div>

        {/* Profile Form Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Identity & Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="profile-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1.5"
                >
                  Email Address (Account ID)
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={user?.email || 'asha.verma@example.in'}
                  disabled
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-muted)] cursor-not-allowed opacity-75"
                />
              </div>
            </div>

            {/* State and Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="profile-state"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  State / Union Territory
                </label>
                <select
                  id="profile-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden cursor-pointer"
                >
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="profile-language"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  Preferred Language
                </label>
                <select
                  id="profile-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी</option>
                  <option value="Kannada">ಕನ್ನಡ</option>
                  <option value="Tamil">தமிழ்</option>
                </select>
              </div>
            </div>

            {/* Optional Age & Occupation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label
                  htmlFor="profile-age"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  Age (Optional)
                </label>
                <input
                  id="profile-age"
                  type="number"
                  min={1}
                  max={120}
                  value={age || ''}
                  onChange={(e) => setAge(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                  placeholder="e.g. 32"
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-occupation"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  Occupation (Optional)
                </label>
                <select
                  id="profile-occupation"
                  value={occupation || ''}
                  onChange={(e) => setOccupation(e.target.value || undefined)}
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden cursor-pointer"
                >
                  <option value="">Select occupation</option>
                  {OCCUPATIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Categories multi-select */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-2">
                Registered Categories <span className="text-rose-500">*</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CITIZEN_CATEGORIES.map((cat) => {
                  const isSelected = categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-text)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notification channels */}
            <div className="p-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block">
                Notification Channels
              </span>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyInApp}
                  onChange={(e) => setNotifyInApp(e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
                  In-app notifications enabled
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
                  Email scheme updates enabled
                </span>
              </label>
            </div>

            {/* Form actions: Save and Cancel */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FBF8F1] text-sm font-bold shadow-xs transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save & start chatting</span>
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-rose-700 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h2 className="text-lg font-bold">Danger Zone</h2>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Irreversible actions regarding your local browser history and account data.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-rose-200 dark:border-rose-900/40">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">
                Delete all chat history
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                Clear all past bot conversations while keeping your saved schemes and profile.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDeleteChatsModal(true)}
              className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-bold shrink-0 transition-colors"
            >
              Delete all chats
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-rose-200 dark:border-rose-900/40">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">
                Delete account & clear all data
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                Permanently wipe all localStorage records, bookmarks, chats, and sign out to the landing page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationText('');
                setDeleteAccountModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 shadow-xs transition-colors"
            >
              Delete account
            </button>
          </div>
        </div>
      </main>

      {/* Delete All Chats Confirmation Dialog */}
      {deleteChatsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-chats-title"
        >
          <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-xl p-6 relative">
            <h3 id="delete-chats-title" className="text-lg font-bold text-[var(--color-text)] mb-2">
              Delete all chats?
            </h3>
            <p className="text-xs text-[var(--color-muted)] mb-6 leading-relaxed">
              Are you sure you want to delete all saved chat sessions? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteChatsModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteChats}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account (Requires typing DELETE) Dialog */}
      {deleteAccountModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
        >
          <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-xl p-6 relative">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h3 id="delete-account-title" className="text-lg font-bold text-[var(--color-text)] mb-2">
              Delete account & wipe data
            </h3>
            <p className="text-xs text-[var(--color-muted)] mb-4 leading-relaxed">
              This will completely wipe your profile, saved schemes, chat history, and notifications from this browser. To confirm, please type <strong className="text-[var(--color-text)]">DELETE</strong> below:
            </p>

            <div className="mb-6">
              <label htmlFor="confirm-delete-input" className="sr-only">Type DELETE</label>
              <input
                id="confirm-delete-input"
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-sm text-[var(--color-text)] focus:ring-2 focus:ring-rose-500 focus:outline-hidden uppercase font-mono"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteAccountModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAccount}
                disabled={deleteConfirmationText.trim() !== 'DELETE'}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
