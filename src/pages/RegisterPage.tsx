import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckSquare, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES_AND_UTS, CITIZEN_CATEGORIES } from '../data/indianStates';
import { SupportedLanguage } from '../types';

import { getUser } from '../lib/session';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, registerUser } = useApp();

  const [name, setName] = useState(user?.name || 'Asha Verma');
  const [state, setState] = useState(user?.state || 'Uttar Pradesh');
  const [language, setLanguage] = useState<SupportedLanguage>(user?.language || 'English');
  const [categories, setCategories] = useState<string[]>(user?.categories?.length ? user.categories : ['Farmer']);
  const [notifyInApp, setNotifyInApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const [nameError, setNameError] = useState('');
  const [stateError, setStateError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  // If the user is already registered and opens /register, redirect to /chat
  React.useEffect(() => {
    const current = getUser() || user;
    if (current && current.registered) {
      navigate('/chat', { replace: true });
    }
  }, [user, navigate]);

  const toggleCategory = (catId: string) => {
    setCategoryError('');
    setCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required.');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!state.trim()) {
      setStateError('State is required.');
      hasError = true;
    } else {
      setStateError('');
    }

    if (categories.length === 0) {
      setCategoryError('Please select at least one category.');
      hasError = true;
    } else {
      setCategoryError('');
    }

    if (hasError) return;

    registerUser({
      name: name.trim(),
      state: state.trim(),
      language,
      categories,
      notifyInApp,
      notifyEmail,
    });

    navigate('/chat', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#1F6B4A] flex items-center justify-center text-[#FBF8F1]">
              <CheckSquare className="w-5 h-5 text-[#FBF8F1]" />
            </div>
            <span className="font-extrabold text-2xl text-[var(--color-text)] tracking-tight">
              Scheme Saathi
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)]">Step 1 of 1 · Citizen Onboarding</p>
        </div>

        {/* Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-xl p-6 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[var(--color-text)]">
              Tell us about you
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1.5">
              Pick your categories to get alerts about schemes meant for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="e.g. Asha Verma"
                className={`w-full p-3.5 text-sm rounded-xl border bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 ${
                  nameError
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                }`}
                aria-describedby={nameError ? 'name-error' : undefined}
              />
              {nameError && (
                <p id="name-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{nameError}</span>
                </p>
              )}
            </div>

            {/* State and Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="register-state"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  State / Union Territory
                </label>
                <select
                  id="register-state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    if (stateError) setStateError('');
                  }}
                  className={`w-full p-3.5 text-sm rounded-xl border bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 cursor-pointer ${
                    stateError
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                  }`}
                  aria-describedby={stateError ? 'state-error' : undefined}
                >
                  <option value="">Select your State / UT</option>
                  {INDIAN_STATES_AND_UTS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {stateError && (
                  <p id="state-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{stateError}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-language"
                  className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)] mb-1.5"
                >
                  Preferred Language
                </label>
                <select
                  id="register-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="w-full p-3.5 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी</option>
                  <option value="Kannada">ಕನ್ನಡ</option>
                  <option value="Tamil">தமிழ்</option>
                </select>
              </div>
            </div>

            {/* Category Tiles */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
                  Citizen Categories <span className="text-rose-500">*</span>
                </span>
                <span className="text-[11px] text-[var(--color-muted)]">Select all that apply</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CITIZEN_CATEGORIES.map((cat) => {
                  const isSelected = categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] ring-1 ring-[var(--color-primary)]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-[var(--color-text)] block">
                          {cat.label}
                        </span>
                        <span className="text-xs text-[var(--color-muted)] block mt-0.5 leading-snug">
                          {cat.description}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-[#FBF8F1]'
                            : 'border-[var(--color-border)] text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {categoryError && (
                <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{categoryError}</span>
                </p>
              )}
            </div>

            {/* Notification checkboxes */}
            <div className="p-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-1">
                Notifications Preferences
              </span>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyInApp}
                  onChange={(e) => setNotifyInApp(e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
                  In-app notifications (new schemes in your categories)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
                  Email updates (monthly digest and key deadlines)
                </span>
              </label>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] font-black text-base shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Finish and start chatting</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-xs text-[var(--color-muted)] mt-3">
                You can change these anytime in Profile.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
