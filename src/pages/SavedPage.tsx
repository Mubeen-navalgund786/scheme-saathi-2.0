import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SchemeCard } from '../components/SchemeCard';
import { MOCK_SCHEMES } from '../data/schemes';
import { useApp } from '../context/AppContext';

export const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedSchemeIds, toggleSaveScheme, t } = useApp();

  const savedSchemes = MOCK_SCHEMES.filter((scheme) =>
    savedSchemeIds.includes(scheme.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-5 h-5 text-[var(--color-accent)] fill-[var(--color-accent)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              {t.savedSchemes || 'Saved schemes'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
            {t.savedSchemesTitle || 'Saved schemes'}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
            {t.savedSchemesSubtitle || "Review schemes you've saved to keep track of deadlines, documents, and application portals."}
          </p>
        </div>

        {savedSchemes.length === 0 ? (
          /* Empty state */
          <div className="py-20 text-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 max-w-md mx-auto">
            <Bookmark className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-3 opacity-40" />
            <h2 className="text-lg font-bold text-[var(--color-text)]">
              {t.noSavedSchemes || 'No saved schemes yet.'}
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1 mb-6">
              {t.browseToSave || 'Bookmark schemes from chat or the library to compare benefits and eligibility anytime.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('/library')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>{t.browseSchemes || 'Browse the library'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedSchemes.map((scheme) => (
              <div key={scheme.id} className="relative group">
                <SchemeCard scheme={scheme} />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleSaveScheme(scheme.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
