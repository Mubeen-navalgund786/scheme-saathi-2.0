import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, User, LogIn, LogOut, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeToggle } from './ThemeToggle';
import { SupportedLanguage } from '../types';
import { LANGUAGE_OPTIONS } from '../lib/translations';

interface NavbarProps {
  showAuthActions?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showAuthActions = true }) => {
  const { isAuthenticated, signOut, language, setLanguage, t } = useApp();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Scheme Saathi Home">
          <div className="w-9 h-9 rounded-xl bg-[#1F6B4A] flex items-center justify-center text-[#FBF8F1] shadow-xs">
            <CheckSquare className="w-5 h-5 text-[#FBF8F1]" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[var(--color-text)]">
            {t.appName || 'Scheme Saathi'}
          </span>
        </Link>

        {/* Center / Nav links (for desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--color-muted)]">
          <Link to="/library" className="hover:text-[var(--color-text)] transition-colors">
            {t.schemesLibrary || 'Scheme library'}
          </Link>
          <Link to="/eligibility" className="hover:text-[var(--color-text)] transition-colors">
            {t.checkEligibility || 'Eligibility check'}
          </Link>
          <Link to="/help" className="hover:text-[var(--color-text)] transition-colors">
            {t.helpAndGrievance || 'Help & grievance'}
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-xs text-[var(--color-text)]">
            <Globe className="w-3.5 h-3.5 text-[var(--color-muted)] shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-medium focus:outline-hidden cursor-pointer text-xs"
              aria-label="Select language"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <ThemeToggle />

          {showAuthActions && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-xl hover:bg-[var(--color-surface-subtle)]"
                    aria-label={t.profile}
                    title={t.profile}
                  >
                    <User className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] font-bold text-sm shadow-xs transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t.signIn}</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
