import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckSquare, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signInAsAsha } = useApp();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('asha.verma@example.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const validate = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const session = signInAsAsha(email.trim());
    if (session.registered) {
      navigate('/chat', { replace: true });
    } else {
      navigate('/register', { replace: true });
    }
  };

  const handleGoogleSignIn = () => {
    const session = signInAsAsha('asha.verma@gmail.com');
    if (session.registered) {
      navigate('/chat', { replace: true });
    } else {
      navigate('/register', { replace: true });
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setResetMessage('If an account exists, a reset link has been sent.');
    setTimeout(() => {
      setResetMessage('');
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--color-bg)]">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Green Panel */}
          <div className="bg-[#1F6B4A] text-[#FBF8F1] p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#FBF8F1] text-[#1F6B4A] flex items-center justify-center font-bold">
                  <CheckSquare className="w-5 h-5 text-[#1F6B4A]" />
                </div>
                <span className="font-extrabold text-xl text-[#FBF8F1] tracking-tight">
                  Scheme Saathi
                </span>
              </Link>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F1] leading-tight mb-4">
                Find government schemes you qualify for
              </h2>
              <p className="text-sm text-[#FBF8F1]/80 leading-relaxed mb-8">
                Your digital citizen guide for state and central government benefits with verified rules and direct official portal links.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-[#E0A030]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FBF8F1]">Ask in your language</h3>
                    <p className="text-xs text-[#FBF8F1]/70">English, Hindi, Kannada, and Tamil supported.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E0A030]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FBF8F1]">Check eligibility in a few questions</h3>
                    <p className="text-xs text-[#FBF8F1]/70">Deterministic criteria based on your occupation and income.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-[#E0A030]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#FBF8F1]">Get documents and the official link</h3>
                    <p className="text-xs text-[#FBF8F1]/70">Zero middle-men. Directly visit verified .gov.in portals.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-[#FBF8F1]/60">
              Free, secure, and privacy-respecting.
            </div>
          </div>

          {/* Right Panel Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-center bg-[var(--color-surface)]">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-[var(--color-text)]">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                {isSignUp
                  ? 'Join Scheme Saathi to discover and bookmark schemes.'
                  : 'Sign in to access your chat history and saved schemes.'}
              </p>
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)] text-[var(--color-text)] font-semibold text-sm transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border-subtle)]" />
              </div>
              <span className="relative px-3 bg-[var(--color-surface)] text-xs text-[var(--color-muted)] uppercase tracking-wider font-medium">
                or use email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSignIn} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="email-input"
                  className="block text-xs font-semibold text-[var(--color-text)] mb-1"
                >
                  Email address
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="name@example.in"
                  className={`w-full p-3 text-sm rounded-xl border bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 ${
                    emailError
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                  }`}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password-input"
                    className="block text-xs font-semibold text-[var(--color-text)]"
                  >
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-[var(--color-primary)] hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Enter at least 6 characters"
                    className={`w-full p-3 pr-10 text-sm rounded-xl border bg-[var(--color-surface-subtle)] text-[var(--color-text)] focus:outline-hidden focus:ring-2 ${
                      passwordError
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'
                    }`}
                    aria-describedby={passwordError ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text)] p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p id="password-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              {resetMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
                  {resetMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[var(--color-accent)] hover:brightness-95 text-[#1B2A22] font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{isSignUp ? 'Create account' : 'Sign in'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-6 text-center text-xs text-[var(--color-muted)]">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setEmailError('');
                      setPasswordError('');
                    }}
                    className="font-bold text-[var(--color-primary)] hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setEmailError('');
                      setPasswordError('');
                    }}
                    className="font-bold text-[var(--color-primary)] hover:underline"
                  >
                    Create account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="py-4 text-center text-xs text-[var(--color-muted)] border-t border-[var(--color-border-subtle)]">
        Informational service. Apply on the official government portal.
      </footer>
    </div>
  );
};
