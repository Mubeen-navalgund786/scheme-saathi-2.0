import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1B2A22] text-[#FBF8F1] shadow-xl border border-emerald-900 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-[var(--color-accent)] shrink-0" />}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
};
