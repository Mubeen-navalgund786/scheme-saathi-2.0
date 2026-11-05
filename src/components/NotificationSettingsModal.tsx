import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { NotificationSettings } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notificationSettings, updateNotificationSettings, showToast, user } = useApp();
  const [settings, setSettings] = useState<NotificationSettings>(notificationSettings);

  useEffect(() => {
    setSettings(notificationSettings);
  }, [notificationSettings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotificationSettings(settings);
    showToast('Notification settings saved', 'success');
    onClose();
  };

  const categories = user?.categories && user.categories.length > 0 
    ? user.categories 
    : ['Farmer', 'Student', 'Woman', 'Senior citizen', 'Small business owner', 'Other'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notif-settings-title"
    >
      <div className="w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg hover:bg-[var(--color-surface-subtle)]"
          aria-label="Close settings"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary)]">
            <Bell className="w-5 h-5" />
          </div>
          <h3 id="notif-settings-title" className="text-lg font-bold text-[var(--color-text)]">
            Notification Settings
          </h3>
        </div>
        <p className="text-xs text-[var(--color-muted)] mb-5">
          Control how and when you receive updates about newly launched or updated schemes.
        </p>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Channels */}
          <div className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
              Delivery Channels
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-[var(--color-text)] block">In-app notifications</span>
                <span className="text-xs text-[var(--color-muted)]">Show badges and updates in Scheme Saathi</span>
              </div>
              <input
                type="checkbox"
                checked={settings.inApp}
                onChange={(e) => setSettings({ ...settings, inApp: e.target.checked })}
                className="w-5 h-5 accent-[var(--color-primary)] rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
              <div>
                <span className="text-sm font-medium text-[var(--color-text)] block">Email digests</span>
                <span className="text-xs text-[var(--color-muted)]">Occasional alerts sent to {user?.email || 'your email'}</span>
              </div>
              <input
                type="checkbox"
                checked={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.checked })}
                className="w-5 h-5 accent-[var(--color-primary)] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Pause All */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
            <div>
              <span className="text-sm font-semibold text-[var(--color-text)] block">Pause all notifications</span>
              <span className="text-xs text-[var(--color-muted)]">Temporarily suspend all scheme alert alerts</span>
            </div>
            <input
              type="checkbox"
              checked={settings.paused}
              onChange={(e) => setSettings({ ...settings, paused: e.target.checked })}
              className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
            />
          </div>

          {/* Frequency */}
          <fieldset className="space-y-2">
            <legend className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Alert Frequency
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-sm ${
                  settings.frequency === 'instant'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] font-medium text-[var(--color-text)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]'
                }`}
              >
                <input
                  type="radio"
                  name="freq"
                  value="instant"
                  checked={settings.frequency === 'instant'}
                  onChange={() => setSettings({ ...settings, frequency: 'instant' })}
                  className="accent-[var(--color-primary)]"
                />
                <span>Instant alerts</span>
              </label>

              <label
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-sm ${
                  settings.frequency === 'daily'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] font-medium text-[var(--color-text)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]'
                }`}
              >
                <input
                  type="radio"
                  name="freq"
                  value="daily"
                  checked={settings.frequency === 'daily'}
                  onChange={() => setSettings({ ...settings, frequency: 'daily' })}
                  className="accent-[var(--color-primary)]"
                />
                <span>Daily digest</span>
              </label>
            </div>
          </fieldset>

          {/* Category Toggles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                Categories to follow
              </span>
              <span className="text-[11px] text-[var(--color-muted)]">
                Based on your profile
              </span>
            </div>
            <div className="space-y-2">
              {categories.map((cat) => {
                const isChecked = settings.categoryToggles[cat] !== false;
                return (
                  <label
                    key={cat}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-sm cursor-pointer hover:bg-[var(--color-surface-subtle)]"
                  >
                    <span className="text-[var(--color-text)] font-medium">{cat}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          categoryToggles: {
                            ...settings.categoryToggles,
                            [cat]: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-[var(--color-primary)] rounded cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-[#FBF8F1] text-sm font-semibold hover:bg-[var(--color-primary-hover)] shadow-xs"
            >
              Save preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
