import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { RegisterPage } from './pages/RegisterPage';
import { ChatPage } from './pages/ChatPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { SavedPage } from './pages/SavedPage';
import { HelpPage } from './pages/HelpPage';
import { NotFoundPage } from './pages/NotFoundPage';
// Lazy-loaded pages
const LibraryPage = React.lazy(() =>
  import('./pages/LibraryPage').then((m) => ({ default: m.LibraryPage }))
);
const NotificationsPage = React.lazy(() =>
  import('./pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage }))
);
const ProfilePage = React.lazy(() =>
  import('./pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);

/**
 * Route Guard Component
 * Enforces sign-in and registration rules:
 * - If not signed in, redirect to /signin
 * - If signed in but not registered, redirect to /register
 */
function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user } = useApp();
  const location = useLocation();

  if (!user || !user.signedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!user.registered) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

/**
 * Sign In guard: if already logged in and registered, redirect to /chat; if not registered, redirect to /register
 */
function PublicOnlyRoute({ children }: { children: React.ReactElement }) {
  const { user } = useApp();

  if (user && user.signedIn) {
    if (user.registered) {
      return <Navigate to="/chat" replace />;
    } else {
      return <Navigate to="/register" replace />;
    }
  }

  return children;
}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <React.Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public/Open routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/signin"
              element={
                <PublicOnlyRoute>
                  <SignInPage />
                </PublicOnlyRoute>
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Protected routes */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:chatId"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eligibility"
              element={
                <ProtectedRoute>
                  <EligibilityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>

        <Toast />
      </HashRouter>
    </AppProvider>
  );
}
