import React from 'react';
import { Bookmark, ExternalLink, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Scheme, EligibilityStatus } from '../types';
import { useApp } from '../context/AppContext';

interface SchemeCardProps {
  scheme: Scheme;
  status?: EligibilityStatus;
  statusReasons?: string[];
  compact?: boolean;
  onOpenDetails?: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  status = 'Likely eligible',
  statusReasons,
  compact = false,
  onOpenDetails,
}) => {
  const { toggleSaveScheme, isSchemeSaved } = useApp();
  const saved = isSchemeSaved(scheme.id);

  const getStatusBadge = () => {
    switch (status) {
      case 'Likely eligible':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/80 px-2.5 py-1 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Likely eligible
          </span>
        );
      case 'Check eligibility':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800/80 px-2.5 py-1 rounded-md">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Check eligibility
          </span>
        );
      case 'Not eligible':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2.5 py-1 rounded-md">
            Not eligible
          </span>
        );
    }
  };

  return (
    <article
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs transition-shadow hover:shadow-md flex flex-col justify-between"
      aria-label={`Scheme: ${scheme.name}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--color-muted)]">
                {scheme.category} · {scheme.level === 'central' ? 'Central Scheme' : 'State Scheme'}
              </span>
            </div>
            <h3 className="text-base font-bold text-[var(--color-text)] leading-snug">
              {scheme.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {getStatusBadge()}
            <button
              type="button"
              onClick={() => toggleSaveScheme(scheme.id)}
              className="p-2 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] transition-colors"
              aria-label={saved ? `Remove ${scheme.name} from saved` : `Save ${scheme.name}`}
              title={saved ? 'Remove bookmark' : 'Bookmark scheme'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Status reason if provided */}
        {statusReasons && statusReasons.length > 0 && (
          <div className="mt-3 p-2.5 rounded-lg bg-[var(--color-surface-subtle)] text-xs text-[var(--color-text)] border border-[var(--color-border-subtle)] space-y-1">
            {statusReasons.map((reason, idx) => (
              <p key={idx} className="flex items-start gap-1.5">
                <span className="text-[var(--color-primary)] font-bold">·</span>
                <span>{reason}</span>
              </p>
            ))}
          </div>
        )}

        {/* Rows: Benefit, Eligibility, Documents */}
        <div className="py-3 space-y-3 text-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-0.5">
              Benefit
            </span>
            <p className="text-[var(--color-text)] font-medium">
              {scheme.benefit}
            </p>
          </div>

          {!compact && (
            <>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-0.5">
                  Eligibility
                </span>
                <p className="text-[var(--color-text)] text-xs leading-relaxed">
                  {scheme.eligibility}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                  Documents
                </span>
                <ul className="text-xs text-[var(--color-text)] space-y-1 pl-1">
                  {scheme.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-3 mt-2">
        <span className="text-[11px] text-[var(--color-muted)]">
          Source: {scheme.source} · Updated {scheme.lastUpdated}
        </span>

        <div className="flex items-center gap-2">
          {compact && onOpenDetails && (
            <button
              type="button"
              onClick={() => onOpenDetails(scheme)}
              className="text-xs font-medium text-[var(--color-primary)] hover:underline px-2.5 py-1.5"
            >
              View details
            </button>
          )}
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] transition-colors shadow-xs"
          >
            <span>Apply on official website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
