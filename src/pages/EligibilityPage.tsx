import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from '../components/Navbar';
import { SchemeCard } from '../components/SchemeCard';
import { evaluateEligibility } from '../lib/eligibility';
import { INDIAN_STATES_AND_UTS, OCCUPATIONS, INCOME_RANGES, CITIZEN_CATEGORIES } from '../data/indianStates';
import { EligibilityAnswers, EligibilityResult } from '../types';
import { useApp } from '../context/AppContext';

export const EligibilityPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Wizard state initialized from profile if available
  const [age, setAge] = useState<number | undefined>(user?.age || 32);
  const [state, setState] = useState<string>(user?.state || 'Uttar Pradesh');
  const [occupation, setOccupation] = useState<string>(user?.occupation || 'Farmer');
  const [incomeRange, setIncomeRange] = useState<'below 1 lakh' | '1 to 3 lakh' | '3 to 8 lakh' | 'above 8 lakh'>('1 to 3 lakh');
  const [ownsLand, setOwnsLand] = useState<boolean>(user?.ownsLand !== undefined ? user.ownsLand : true);
  const [categories, setCategories] = useState<string[]>(user?.categories?.length ? user.categories : ['Farmer']);

  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  // Check if current step is answered to enable Next button
  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return age !== undefined && age > 0 && age < 120;
      case 2:
        return !!state;
      case 3:
        return !!occupation;
      case 4:
        return !!incomeRange;
      case 5:
        return ownsLand !== undefined;
      case 6:
        return categories.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step: Calculate results
      const answers: EligibilityAnswers = {
        age,
        state,
        occupation,
        incomeRange,
        ownsAgriculturalLand: ownsLand,
        categories,
      };

      const computedResults = evaluateEligibility(answers);
      setResults(computedResults);

      // Save to profile
      updateProfile({
        age,
        state,
        occupation,
        incomeRange,
        ownsLand,
        categories,
      });

      // Confetti on result
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // no-op
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setResults(null);
    setCurrentStep(1);
  };

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {!results ? (
          /* Wizard Form */
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-xl p-6 sm:p-10">
            {/* Header with progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                <span>Check Your Eligibility</span>
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[var(--color-surface-subtle)] overflow-hidden">
                <div
                  className="h-full bg-[var(--color-primary)] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <div className="min-h-[260px] flex flex-col justify-center">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                    What is your age?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                    Certain schemes like Atal Pension Yojana (18 to 40) or scholarships depend on your age bracket.
                  </p>
                  <div className="pt-2 max-w-xs">
                    <label htmlFor="eligibility-age" className="sr-only">Your Age</label>
                    <input
                      id="eligibility-age"
                      type="number"
                      min={1}
                      max={120}
                      value={age || ''}
                      onChange={(e) => setAge(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                      placeholder="e.g. 32"
                      className="w-full p-4 text-xl font-bold rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden"
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                    Which state or union territory do you reside in?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                    Helps us check central schemes and regional state top-ups.
                  </p>
                  <div className="pt-2 max-w-md">
                    <label htmlFor="eligibility-state" className="sr-only">Your State</label>
                    <select
                      id="eligibility-state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full p-4 text-base font-semibold rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-hidden cursor-pointer"
                    >
                      {INDIAN_STATES_AND_UTS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                    What is your primary occupation?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                    Select the option that best reflects your primary livelihood.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {OCCUPATIONS.map((occ) => {
                      const isSelected = occupation === occ;
                      return (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setOccupation(occ)}
                          className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                          }`}
                        >
                          {occ}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                    What is your approximate annual family income?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                    Essential for determining EWS, low-income health cover, and housing subsidies.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {INCOME_RANGES.map((inc) => {
                      const isSelected = incomeRange === inc;
                      return (
                        <button
                          key={inc}
                          type="button"
                          onClick={() => setIncomeRange(inc)}
                          className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                          }`}
                        >
                          ₹ {inc}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                    Do you or your family own cultivable agricultural land?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                    Required for direct income support schemes such as PM-KISAN.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setOwnsLand(true)}
                      className={`p-5 rounded-2xl border text-base font-bold text-center transition-all ${
                        ownsLand === true
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                      }`}
                    >
                      Yes, I own land
                    </button>
                    <button
                      type="button"
                      onClick={() => setOwnsLand(false)}
                      className={`p-5 rounded-2xl border text-base font-bold text-center transition-all ${
                        ownsLand === false
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                      }`}
                    >
                      No landholding
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text)]">
                    Select your citizen categories
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                    Choose one or more categories to filter special sub-schemes.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {CITIZEN_CATEGORIES.map((cat) => {
                      const isSelected = categories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold text-center transition-all ${
                            isSelected
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                              : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-subtle)] disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] text-sm font-bold shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>{currentStep === totalSteps ? 'See eligible schemes' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  Evaluation Complete
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-1">
                  Your Scheme Eligibility Results
                </h1>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
                  Based on the details you gave. Confirm on the official site.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-xs font-semibold text-[var(--color-text)]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake test</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/chat')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-[#FBF8F1] text-xs font-bold shadow-xs hover:bg-[var(--color-primary-hover)]"
                >
                  <span>Ask in Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scheme Cards Ranked List */}
            <div className="space-y-4">
              {results.map((res) => (
                <SchemeCard
                  key={res.scheme.id}
                  scheme={res.scheme}
                  status={res.status}
                  statusReasons={res.reasons}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
