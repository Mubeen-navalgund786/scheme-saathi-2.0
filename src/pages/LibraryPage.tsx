import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Bookmark, ExternalLink, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SchemeCard } from '../components/SchemeCard';
import { MOCK_SCHEMES } from '../data/schemes';
import { Scheme, SchemeCategory } from '../types';
import { useApp } from '../context/AppContext';

export const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isSchemeSaved, toggleSaveScheme } = useApp();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const initialCat = (searchParams.get('category') as SchemeCategory) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalScheme, setDetailModalScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = [
    'All',
    'Farmers',
    'Students',
    'Women',
    'Health',
    'Housing',
    'Business',
    'Seniors',
  ];

  const filteredSchemes = MOCK_SCHEMES.filter((scheme) => {
    // Category filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Women') {
        // PM Mudra supports women entrepreneurs
        const matchesWomen = scheme.category === 'Women' || scheme.category === 'Business';
        if (!matchesWomen) return false;
      } else if (scheme.category !== selectedCategory) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = scheme.name.toLowerCase().includes(q);
      const matchBenefit = scheme.benefit.toLowerCase().includes(q);
      const matchCat = scheme.category.toLowerCase().includes(q);
      const matchElig = scheme.eligibility.toLowerCase().includes(q);
      return matchName || matchBenefit || matchCat || matchElig;
    }

    return true;
  });

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title and search bar */}
        <div className="space-y-4">
          <div>
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-xs font-semibold text-[var(--color-text)] transition-colors mb-4 shadow-xs"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <h1 className="text-2xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
              Scheme library
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
              Explore central and state welfare programs, subsidy details, and verified eligibility requirements.
            </p>
          </div>

          {/* Search box */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-[var(--color-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes and services"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-primary)] shadow-xs"
              aria-label="Search schemes and services"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--color-muted)] hover:text-[var(--color-text)]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips (single select) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-[#FBF8F1] shadow-xs'
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid of Scheme Cards (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        {filteredSchemes.length === 0 ? (
          /* Empty state */
          <div className="py-20 text-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-[var(--color-muted)] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[var(--color-text)]">
              No schemes match. Try another word.
            </h3>
            <p className="text-xs text-[var(--color-muted)] mt-1 mb-4">
              Try searching for general keywords like "farmer", "scholarship", or "loan".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[#FBF8F1] transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                compact={true}
                onOpenDetails={(s) => setDetailModalScheme(s)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Scheme Detail Dialog */}
      {detailModalScheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-scheme-title"
        >
          <div className="w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setDetailModalScheme(null)}
              className="absolute top-5 right-5 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-xl hover:bg-[var(--color-surface-subtle)]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <SchemeCard scheme={detailModalScheme} compact={false} />
          </div>
        </div>
      )}
    </div>
  );
};
