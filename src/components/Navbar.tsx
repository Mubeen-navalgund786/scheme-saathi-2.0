import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, User, LogIn, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  showAuthActions?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showAuthActions = true }) => {
  const { isAuthenticated, signOut } = useApp();
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
            Scheme Saathi
          </span>
        </Link>

        {/* Center / Nav links (for desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--color-muted)]">
          <Link to="/library" className="hover:text-[var(--color-text)] transition-colors">
            Scheme library
          </Link>
          <Link to="/eligibility" className="hover:text-[var(--color-text)] transition-colors">
            Eligibility check
          </Link>
          <Link to="/help" className="hover:text-[var(--color-text)] transition-colors">
            Help & grievance
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          {showAuthActions && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-xl hover:bg-[var(--color-surface-subtle)]"
                    aria-label="Profile"
                    title="Profile"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xs transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] font-bold text-sm shadow-xs transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign in</span>
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
