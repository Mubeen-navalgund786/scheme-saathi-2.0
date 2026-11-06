import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Tractor, 
  GraduationCap, 
  Users, 
  Briefcase, 
  HeartPulse, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Scale, 
  Clock, 
  Sparkles,
  Bot
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SchemeCard } from '../components/SchemeCard';
import { MOCK_SCHEMES } from '../data/schemes';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, isOnboarded, signInAsAsha, t } = useApp();
  const navigate = useNavigate();

  const handleStartChatting = () => {
    if (!isAuthenticated) {
      signInAsAsha();
    }
    navigate('/chat');
  };

  const handleBackToSignIn = () => {
    navigate('/signin');
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    navigate('/signin');
  };

  const sampleScheme = MOCK_SCHEMES.find((s) => s.id === 'pm-kisan') || MOCK_SCHEMES[0];

  const whoItHelps = [
    {
      category: 'Farmers',
      icon: Tractor,
      description: 'Income assistance, crop insurance, and subsidized agricultural equipment.',
    },
    {
      category: 'Students',
      icon: GraduationCap,
      description: 'Pre-matric and post-matric fee concessions, scholarships, and higher study aid.',
    },
    {
      category: 'Women',
      icon: Users,
      description: 'Collateral-free enterprise loans, maternity benefits, and self-help group aid.',
    },
    {
      category: 'Business',
      label: 'Small businesses',
      icon: Briefcase,
      description: 'Working capital, Mudra credit tiers, and technology upgrades for micro-firms.',
    },
    {
      category: 'Health',
      label: 'Healthcare',
      icon: HeartPulse,
      description: 'Cashless hospitalisation up to ₹5 Lakh and subsidized generic medicines.',
    },
    {
      category: 'Seniors',
      label: 'Senior citizens',
      icon: ShieldCheck,
      description: 'Guaranteed post-60 monthly pensions and senior health insurance waivers.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--color-text)] max-w-4xl mx-auto leading-tight sm:leading-none">
              {t.landingHeroTitle || 'Find government schemes you qualify for'}
            </h1>
            <p className="mt-5 text-base sm:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
              {t.landingHeroSubtitle || 'Ask in plain language. Check your eligibility in a few questions. Get the documents list and the official link to apply.'}
            </p>


          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Simple 3-step process
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                How Scheme Saathi works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-6 relative">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-[#FBF8F1] flex items-center justify-center font-black text-lg mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  Tell us about you
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Register once with your categories such as farmer, student, woman entrepreneur, or senior citizen.
                </p>
              </div>

              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-6 relative">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-[#FBF8F1] flex items-center justify-center font-black text-lg mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  Ask in your language
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Chat in English, Hindi, Kannada, or Tamil. Check your qualifications and get a document checklist instantly.
                </p>
              </div>

              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-6 relative">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] text-[#1B2A22] flex items-center justify-center font-black text-lg mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  Apply on the official site
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Every scheme links directly to the verified official government portal (.gov.in) with zero intermediaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who It Helps */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Tailored for every citizen
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                Who it helps
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {whoItHelps.map((item) => {
                const IconComponent = item.icon;
                const label = item.label || item.category;
                return (
                  <Link
                    key={item.category}
                    to={`/library?category=${item.category}`}
                    className="group p-5 sm:p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-primary)] hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)] mb-2">
                        {label}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)]">
                      <span>Explore schemes</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-16 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Transparency & Reliability
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                Why trust Scheme Saathi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                    Official scheme records
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    All scheme benefits, guidelines, and document requirements are directly extracted from official gazettes and government portals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                    Fixed eligibility rules
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    Eligibility is checked deterministically using objective government criteria like income slab, occupation, and landholding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text)] mb-1">
                    Source & date transparency
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    Every scheme card clearly displays its official source domain and verified last-updated date for peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Preview Card Section (Moved below Why Trust Us) */}
        <section className="py-16 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                See it in action
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                Live scheme assistant preview
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
                See how Scheme Saathi answers citizen questions with transparent rules, verified benefits, and document checklists.
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl p-5 sm:p-6 text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)]">
                  <Bot className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Live interactive preview</span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                  Verified Rules
                </span>
              </div>

              {/* Sample User Bubble */}
              <div className="flex justify-end mb-4">
                <div className="bg-[#1F6B4A] text-[#FBF8F1] px-4 py-2.5 rounded-2xl rounded-tr-xs text-sm font-medium shadow-xs max-w-md">
                  I am a farmer with 2 acres of land in Uttar Pradesh. What assistance can I get?
                </div>
              </div>

              {/* Sample Bot Bubble */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#1F6B4A] text-[#FBF8F1] flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  SS
                </div>
                <div className="space-y-3 flex-1">
                  <div className="bg-[var(--color-surface-subtle)] border border-[var(--color-border-subtle)] text-[var(--color-text)] px-4 py-3 rounded-2xl rounded-tl-xs text-sm">
                    Based on your agricultural landholding, you are likely eligible for <strong>PM-KISAN Samman Nidhi</strong> for direct income transfer, as well as concessional Kisan Credit Card loans.
                  </div>

                  {/* Sample Scheme Card */}
                  <SchemeCard
                    scheme={sampleScheme}
                    status="Likely eligible"
                    statusReasons={['Landholding farmer with Aadhaar-linked account']}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Page Navigation Bar: Left for Back (goes to sign in), Right to move for chatting */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToSignIn}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-sm font-semibold text-[var(--color-text)] transition-colors shadow-xs"
            aria-label="Back to sign in"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleStartChatting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer"
            aria-label={t.startChatting || 'Start chatting'}
          >
            <span>{t.startChatting || 'Start chatting'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Disclaimer Band */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border-y border-amber-200 dark:border-amber-900/60 py-4 px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 max-w-4xl mx-auto">
            {t.disclaimer || 'Scheme Saathi is an informational service. It is not a government website. Always apply on the official government portal.'}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#1F6B4A] flex items-center justify-center text-[#FBF8F1]">
                <CheckCircle2 className="w-4 h-4 text-[#FBF8F1]" />
              </div>
              <span className="font-bold text-sm text-[var(--color-text)]">Scheme Saathi</span>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              Informational service helping Indian citizens navigate welfare schemes.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[var(--color-muted)]">
            <Link to="/library" className="hover:text-[var(--color-text)] transition-colors">
              Library
            </Link>
            <Link to="/help" className="hover:text-[var(--color-text)] transition-colors">
              Help
            </Link>
            <Link to="/signin" className="hover:text-[var(--color-text)] transition-colors">
              Sign in
            </Link>
          </nav>

          <div className="text-xs text-[var(--color-muted)]">
            Last updated November 2026
          </div>
        </div>
      </footer>
    </div>
  );
};
