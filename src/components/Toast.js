"use client";
import useToastStore from '../store/toastStore';
import { Terminal, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`flex items-start gap-3 p-4 border-2 border-border bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] animate-in slide-in-from-bottom-5 duration-300 w-80 max-w-[calc(100vw-3rem)] ${toast.type === 'error' ? 'border-red-500' : 'border-primary'}`}
        >
          <Terminal className={`size-5 mt-0.5 ${toast.type === 'error' ? 'text-red-500' : 'text-primary'}`} />
          <div className="flex-1">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-1">
              {toast.type === 'error' ? 'SYSTEM ERROR' : 'SYSTEM NOTIFICATION'}
            </h4>
            <p className="font-mono text-xs text-muted-foreground break-words leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
