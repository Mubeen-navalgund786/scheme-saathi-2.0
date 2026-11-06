import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FeedbackData } from '../types';
import { useApp } from '../context/AppContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
}

const REASON_KEYS: Array<{ id: 'Wrong scheme' | 'Outdated information' | 'Unclear' | 'Other'; key: string }> = [
  { id: 'Wrong scheme', key: 'wrongScheme' },
  { id: 'Outdated information', key: 'outdatedInfo' },
  { id: 'Unclear', key: 'unclear' },
  { id: 'Other', key: 'otherReason' },
];

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { t } = useApp();
  const [selectedReason, setSelectedReason] = useState<'Wrong scheme' | 'Outdated information' | 'Unclear' | 'Other'>('Wrong scheme');
  const [comment, setComment] = useState('');

  // Close on Escape
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating: 'down',
      reason: selectedReason,
      comment: comment.trim(),
      timestamp: Date.now(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-lg hover:bg-[var(--color-surface-subtle)]"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 id="feedback-dialog-title" className="text-lg font-bold text-[var(--color-text)] mb-2">
          {t.feedbackTitle || 'Help us improve this answer'}
        </h3>
        <p className="text-sm text-[var(--color-muted)] mb-5">
          {t.whatWasWrong || 'Tell us why this response was not helpful so we can refine scheme records.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Reason
            </legend>
            <div className="space-y-2">
              {REASON_KEYS.map((item) => {
                const label = (t as any)[item.key] || item.id;
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                      selectedReason === item.id
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] font-medium text-[var(--color-text)]'
                        : 'border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text)]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedback-reason"
                      value={item.id}
                      checked={selectedReason === item.id}
                      onChange={() => setSelectedReason(item.id)}
                      className="accent-[var(--color-primary)]"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="feedback-comment" className="text-xs font-semibold text-[var(--color-muted)]">
                {t.commentsOptional || 'Additional comments (optional)'}
              </label>
              <span className="text-[11px] text-[var(--color-muted)]">
                {comment.length} / 500
              </span>
            </div>
            <textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))}
              placeholder="What could be made clearer or what was missing?"
              rows={3}
              className="w-full p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-sm text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] cursor-pointer"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-[#FBF8F1] text-sm font-semibold hover:bg-[var(--color-primary-hover)] shadow-xs cursor-pointer"
            >
              {t.submitFeedback || 'Send feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
