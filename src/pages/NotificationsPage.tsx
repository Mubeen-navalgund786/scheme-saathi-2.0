import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Settings, 
  CheckCheck, 
  ArrowRight, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { NotificationSettingsModal } from '../components/NotificationSettingsModal';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    notifications, 
    unreadNotificationCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useApp();

  const [filter, setFilter] = useState<string>('All');
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const userCategories = user?.categories || ['Farmer'];

  // Calculate relative time string
  const getRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  // Filter chips: All, Unread, and one per registered category
  const filterChips = ['All', 'Unread', ...userCategories];

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !notif.read;
    return notif.category.toLowerCase().includes(filter.toLowerCase()) || 
           filter.toLowerCase().includes(notif.category.toLowerCase());
  });

  const handleCardClick = (notif: AppNotification) => {
    if (!notif.read) {
      markNotificationAsRead(notif.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] tracking-tight">
              Notifications
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
              Important alerts, revision dates, and new benefits in your registered categories.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {unreadNotificationCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-xs font-semibold text-[var(--color-text)] transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Mark all as read</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setSettingsModalOpen(true)}
              className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text)] transition-colors"
              aria-label="Notification settings"
              title="Notification settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User categories row with Edit link */}
        <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[var(--color-muted)]">Your alert categories:</span>
            {userCategories.map((cat) => (
              <span
                key={cat}
                className="font-medium text-[var(--color-text)] bg-[var(--color-surface-subtle)] px-2.5 py-1 rounded-md border border-[var(--color-border-subtle)]"
              >
                {cat}
              </span>
            ))}
          </div>

          <Link
            to="/profile"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] hover:underline shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit in Profile</span>
          </Link>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterChips.map((chip) => {
            const isSelected = filter === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setFilter(chip)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-[#FBF8F1]'
                    : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                }`}
              >
                {chip}
                {chip === 'Unread' && unreadNotificationCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[var(--color-accent)] text-[#1B2A22] text-[10px] font-bold">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notifications list */}
        {filteredNotifications.length === 0 ? (
          <div className="py-20 text-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 max-w-md mx-auto">
            <Bell className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-3 opacity-40" />
            <h2 className="text-base font-bold text-[var(--color-text)]">
              No notifications yet.
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              We'll tell you when schemes in your categories change.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleCardClick(notif)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-[var(--color-surface)] border-[var(--color-border-subtle)] opacity-85'
                    : 'bg-[var(--color-surface)] border-[var(--color-primary)] shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--color-primary)]">
                      {notif.category}
                    </span>
                    {!notif.read && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-accent)] text-[#1B2A22]">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[var(--color-muted)] shrink-0">
                    {getRelativeTime(notif.timestamp)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
                  {notif.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-3">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)] text-xs">
                  <span className="text-[11px] text-[var(--color-muted)]">
                    {notif.read ? 'Read' : 'Click card to mark as read'}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markNotificationAsRead(notif.id);
                      navigate('/library');
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    <span>View scheme</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Notification Settings Dialog */}
      <NotificationSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </div>
  );
};
