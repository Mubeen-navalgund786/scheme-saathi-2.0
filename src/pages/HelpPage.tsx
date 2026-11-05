import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  PhoneCall, 
  Building,
  ArrowLeft
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Storage } from '../lib/storage';
import { useApp } from '../context/AppContext';
import { CITIZEN_CATEGORIES } from '../data/indianStates';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Scheme Saathi?',
    answer: 'Scheme Saathi is an informational service designed to help Indian citizens quickly find government welfare schemes they may qualify for. It provides easy-to-understand eligibility checks, documents checklists, and direct official portal links.',
  },
  {
    id: 'faq-2',
    question: 'Is it an official government website?',
    answer: 'No. Scheme Saathi is strictly an informational assistant. It is not affiliated with or run by any government department. You should always review guidelines and apply on the official government website.',
  },
  {
    id: 'faq-3',
    question: 'How do I apply for a scheme?',
    answer: 'Every scheme shown in Scheme Saathi includes a direct link labeled "Apply on official site". Click that button to be redirected to the genuine government portal (.gov.in domain) where you can complete biometric or OTP e-KYC and submit your application.',
  },
  {
    id: 'faq-4',
    question: 'Is my information safe?',
    answer: 'Yes. All your conversations, bookmarks, and questionnaire answers are stored exclusively in your local browser storage (localStorage). Scheme Saathi does not require or store sensitive credentials like Aadhaar numbers, OTPs, or bank passwords.',
  },
  {
    id: 'faq-5',
    question: 'Why does the bot say "not sure"?',
    answer: 'To prevent misinformation, Scheme Saathi relies strictly on verified official records. If your query does not match confirmed rules or available scheme records, it honestly lets you know rather than inventing details.',
  },
];

export const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, showToast } = useApp();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/chat');
    }
  };

  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  // Report form
  const [reportCategory, setReportCategory] = useState<string>('Farmers');
  const [reportMessage, setReportMessage] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const toggleFaq = (id: string) => {
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportMessage.trim()) return;

    Storage.saveReport({
      id: 'rep-' + Date.now(),
      category: reportCategory,
      message: reportMessage.trim(),
      timestamp: Date.now(),
      userEmail: user?.email,
    });

    setReportSuccess(true);
    setReportMessage('');
    showToast('Report received. Thank you for helping us improve!', 'success');

    setTimeout(() => {
      setReportSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Support Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
            Help and grievance
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
            Frequently asked questions, official citizen helplines, and grievance resolution portals.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between p-4.5 text-left font-bold text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4.5 pt-0 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Report a wrong answer form */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">
            Report a wrong answer
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-6">
            Found an outdated benefit amount, broken link, or inaccurate eligibility rule? Let us know so our maintainers can verify.
          </p>

          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="report-category"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
              >
                Scheme Category
              </label>
              <select
                id="report-category"
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                className="w-full sm:w-72 p-3 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden cursor-pointer"
              >
                {CITIZEN_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="report-message"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)]"
                >
                  Description of Issue <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[var(--color-muted)]">
                  {reportMessage.length} / 500
                </span>
              </div>
              <textarea
                id="report-message"
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value.slice(0, 500))}
                required
                placeholder="Explain what was inaccurate (e.g. 'PM-KISAN instalment frequency or document requirement changed')..."
                rows={4}
                className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden resize-none"
              />
            </div>

            {reportSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                Thank you! Your feedback report has been saved locally for review.
              </div>
            )}

            <button
              type="submit"
              disabled={!reportMessage.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FBF8F1] text-xs font-bold shadow-xs transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              <span>Send report</span>
            </button>
          </form>
        </section>

        {/* Helplines section with exact required labels */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">
            Official Citizen Helplines & Grievances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
                  National Citizen helpline: verify the current number on the official site before use
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  For central welfare query assistance, always confirm regional toll-free numbers on official ministry portals.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
                  Grievance portal: CPGRAMS (pgportal.gov.in)
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-2">
                  Centralised Public Grievance Redress and Monitoring System (CPGRAMS) for complaints against central or state public authorities.
                </p>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
                >
                  <span>Visit pgportal.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
