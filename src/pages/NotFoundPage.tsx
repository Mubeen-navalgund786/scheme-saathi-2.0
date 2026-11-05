import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckSquare } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4 font-black text-2xl">
            404
          </div>
          <h1 className="text-xl font-bold text-[var(--color-text)] mb-2">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-6">
            The page or scheme link you are looking for does not exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[#FBF8F1] text-sm font-bold shadow-xs hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Scheme Saathi Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
};
