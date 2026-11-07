import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Bookmark, 
  BookOpen, 
  Bell, 
  CheckSquare, 
  HelpCircle, 
  LogOut, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  X,
  MessageSquare,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';
import { LANGUAGE_OPTIONS } from '../lib/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    user, 
    chats, 
    currentChatId, 
    setCurrentChatId, 
    createNewChat, 
    updateChatTitle, 
    deleteChat, 
    savedSchemeIds, 
    unreadNotificationCount, 
    signOut,
    language,
    setLanguage,
    t
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuChatId, setActiveMenuChatId] = useState<string | null>(null);
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');
  const [deleteConfirmChatId, setDeleteConfirmChatId] = useState<string | null>(null);

  // Close on Escape when mobile open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (deleteConfirmChatId) {
          setDeleteConfirmChatId(null);
        } else if (activeMenuChatId) {
          setActiveMenuChatId(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, activeMenuChatId, deleteConfirmChatId]);

  const filteredChats = chats.filter((chat) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = chat.title.toLowerCase().includes(query);
    const matchesMessage = chat.messages.some((m) => m.text.toLowerCase().includes(query));
    return matchesTitle || matchesMessage;
  });

  const handleStartNewChat = () => {
    const id = createNewChat();
    navigate(`/chat/${id}`);
    onClose();
  };

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
    navigate(`/chat/${id}`);
    onClose();
  };

  const handleStartRename = (chatId: string, currentTitle: string) => {
    setRenamingChatId(chatId);
    setRenameText(currentTitle);
    setActiveMenuChatId(null);
  };

  const handleSaveRename = (chatId: string) => {
    if (renameText.trim()) {
      updateChatTitle(chatId, renameText.trim());
    }
    setRenamingChatId(null);
    setRenameText('');
  };

  const handleRequestDelete = (chatId: string) => {
    setActiveMenuChatId(null);
    setDeleteConfirmChatId(chatId);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmChatId) {
      const targetId = deleteConfirmChatId;
      deleteChat(targetId);
      setDeleteConfirmChatId(null);
      if (currentChatId === targetId) {
        navigate('/chat');
      }
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AV';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-[260px] flex flex-col justify-between bg-[var(--color-surface)] border-r border-[var(--color-border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl md:shadow-none' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Top: Logo & New Chat */}
        <div className="p-4 border-b border-[var(--color-border-subtle)] space-y-3">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1F6B4A] flex items-center justify-center text-[#FBF8F1] font-bold shadow-xs">
                <CheckSquare className="w-4 h-4 text-[#FBF8F1]" />
              </div>
              <span className="font-bold text-base tracking-tight text-[var(--color-text)]">
                Scheme Saathi
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 md:hidden text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg hover:bg-[var(--color-surface-subtle)]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleStartNewChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FBF8F1] text-sm font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.newChat}</span>
          </button>

          {/* Search chats */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchChats || 'Search chats...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:outline-hidden focus:ring-1 focus:ring-[var(--color-primary)]"
              aria-label="Search chats"
            />
          </div>
        </div>

        {/* Middle Scrollable Section: Nav links + Recent chats */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Quick Nav */}
          <nav className="space-y-1" aria-label="Scheme Navigation">
            <Link
              to="/saved"
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                location.pathname === '/saved'
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[var(--color-muted)]" />
                <span>{t.savedSchemes}</span>
              </div>
              {savedSchemeIds.length > 0 && (
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text)] border border-[var(--color-border-subtle)]">
                  {savedSchemeIds.length}
                </span>
              )}
            </Link>

            <Link
              to="/library"
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                location.pathname === '/library'
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[var(--color-muted)]" />
              <span>{t.schemesLibrary}</span>
            </Link>

            <Link
              to="/notifications"
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                location.pathname === '/notifications'
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[var(--color-muted)]" />
                <span>{t.notifications}</span>
              </div>
              {unreadNotificationCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-[#1B2A22]">
                  {unreadNotificationCount}
                </span>
              )}
            </Link>

            <Link
              to="/eligibility"
              onClick={onClose}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                location.pathname === '/eligibility'
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-[var(--color-muted)]" />
              <span>{t.checkEligibility}</span>
            </Link>
          </nav>

          {/* Recent Chats Section */}
          <div>
            <div className="px-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
              {t.recent || 'Recent'}
            </div>

            {filteredChats.length === 0 ? (
              <p className="px-3 py-3 text-xs text-[var(--color-muted)] italic">
                {searchQuery ? t.noChatsMatch : t.noRecentChats}
              </p>
            ) : (
              <div className="space-y-1">
                {filteredChats.map((chat) => {
                  const isActive = currentChatId === chat.id;
                  const isRenaming = renamingChatId === chat.id;
                  const isMenuOpen = activeMenuChatId === chat.id;

                  return (
                    <div
                      key={chat.id}
                      className={`group relative flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-colors ${
                        isActive
                          ? 'bg-[var(--color-surface-subtle)] font-semibold text-[var(--color-text)] border border-[var(--color-border-subtle)]'
                          : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                      }`}
                    >
                      {isRenaming ? (
                        <div className="flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={renameText}
                            onChange={(e) => setRenameText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRename(chat.id);
                              if (e.key === 'Escape') setRenamingChatId(null);
                            }}
                            autoFocus
                            maxLength={40}
                            className="w-full text-xs p-1 rounded-md border border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveRename(chat.id)}
                            className="p-1 text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-sm"
                            aria-label={t.saveTitle || 'Save title'}
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleSelectChat(chat.id)}
                            className="flex items-center gap-2 flex-1 text-left min-w-0"
                          >
                            <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span className="truncate">
                              {(!chat.title || chat.title.toLowerCase() === 'new chat' || chat.title === 'ಹೊಸ ಚಾಟ್' || chat.title === 'नई चैट' || chat.title === 'ਨਵੀਂ ਚੈਟ')
                                ? t.newChat
                                : chat.title}
                            </span>
                          </button>

                          {/* 3-dots Menu Button */}
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuChatId(isMenuOpen ? null : chat.id);
                              }}
                              className="p-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] opacity-80 group-hover:opacity-100"
                              aria-label={`${t.options || 'Options'}: ${chat.title}`}
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                              <div
                                className="absolute right-0 top-full mt-1 z-50 w-32 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg py-1 text-xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleStartRename(chat.id, chat.title)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[var(--color-surface-subtle)] text-[var(--color-text)] text-left"
                                >
                                  <Edit2 className="w-3 h-3 text-[var(--color-muted)]" />
                                  <span>{t.rename || 'Rename'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRequestDelete(chat.id)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 text-left"
                                >
                                  <Trash2 className="w-3 h-3 text-rose-500" />
                                  <span>{t.delete || 'Delete'}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Area: Help, Language Selector, User Profile */}
        <div className="p-3 border-t border-[var(--color-border-subtle)] space-y-2 bg-[var(--color-surface)]">
          {/* Help link */}
          {/* Help link */}
          <Link
            to="/help"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{t.helpAndGrievance || 'Help & grievance'}</span>
          </Link>

          {/* Language selector */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[var(--color-surface-subtle)] text-xs">
            <div className="flex items-center gap-2 text-[var(--color-muted)]">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.language || 'Language'}</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-medium text-[var(--color-text)] focus:outline-hidden cursor-pointer text-xs"
              aria-label="Select language"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Profile row */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity min-w-0"
              title="Go to profile"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs flex items-center justify-center shrink-0 border border-[var(--color-border-subtle)]">
                {userInitials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--color-text)] truncate">
                  {user?.name || 'Asha Verma'}
                </p>
                <span className="text-[11px] text-[var(--color-muted)] block hover:underline">
                  {t.profile}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="p-2 text-[var(--color-muted)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
              aria-label={t.signOut || 'Sign out'}
              title={t.signOut || 'Sign out'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Delete Chat Confirmation Modal */}
      {deleteConfirmChatId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-chat-confirm-title"
        >
          <div className="w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl p-5 relative">
            <h3 id="delete-chat-confirm-title" className="text-base font-bold text-[var(--color-text)] mb-2">
              {t.deleteChatTitle || 'Delete chat?'}
            </h3>
            <p className="text-xs text-[var(--color-muted)] mb-5 leading-relaxed">
              {t.deleteChatConfirm || 'Are you sure you want to delete this chat session? This action cannot be undone.'}
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmChatId(null)}
                className="px-3.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]"
              >
                {t.cancel || 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                {t.delete || 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
