"use client";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Link from 'next/link';
import Loader from '../components/Loader';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center bg-background min-h-[calc(100vh-4rem)]">
      
      <main className="w-full max-w-5xl flex flex-col items-center py-24 px-8">
        
        {/* System Status Label */}
        <div className="flex items-center gap-3 px-4 py-2 border-2 border-border bg-card mb-12">
          <Terminal className="size-4 text-primary" />
          <span className="font-mono text-xs font-bold text-foreground tracking-[0.2em] uppercase">
            SYSTEM STATUS: ONLINE
          </span>
        </div>

        <div className="text-center space-y-6 max-w-4xl">
          <h1 style={{ fontFamily: 'var(--font-anton)' }} className="text-6xl md:text-8xl text-foreground uppercase tracking-widest leading-[1.1]">
            DESIGN YOUR DAY <br />
            <span className="text-primary">ACHIEVE PROTOCOLS</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm md:text-base font-mono leading-relaxed text-muted-foreground uppercase tracking-[0.1em]">
            INITIALIZE A CLEANER WAY TO MANAGE TASKS. OUR NEO-BRUTALIST INTERFACE FORCES FOCUS ON WHAT TRULY MATTERS. ZERO DISTRACTIONS. MAXIMUM EFFICIENCY.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-16">
          {user ? (
            <Link 
              href="/dashboard" 
              className="flex items-center justify-center gap-3 px-8 h-14 bg-primary text-black font-mono text-sm font-bold uppercase tracking-[0.2em] border-2 border-primary hover:bg-background hover:text-primary transition-colors"
            >
              ACCESS DASHBOARD
              <ArrowRight className="size-5" />
            </Link>
          ) : (
            <>
              <Link 
                href="/signup" 
                className="flex items-center justify-center gap-3 px-8 h-14 bg-primary text-black font-mono text-sm font-bold uppercase tracking-[0.2em] border-2 border-primary hover:bg-background hover:text-primary transition-colors"
              >
                INITIALIZE ACCOUNT
                <ArrowRight className="size-5" />
              </Link>
              <Link 
                href="/signin" 
                className="flex items-center justify-center px-8 h-14 bg-card text-foreground font-mono text-sm font-bold uppercase tracking-[0.2em] border-2 border-border hover:bg-border transition-colors"
              >
                AUTHENTICATE
              </Link>
            </>
          )}
        </div>

        {/* Visual Decoration: Brutalist Mockup */}
        <div className="mt-32 w-full max-w-4xl border-2 border-border bg-card p-8">
          <div className="flex justify-between items-center border-b-2 border-border pb-4 mb-8">
             <div className="w-1/3 h-6 bg-border"></div>
             <div className="w-16 h-6 bg-primary"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-14 border-2 border-border bg-background flex items-center px-4 gap-4">
                <div className="size-5 border-2 border-muted-foreground"></div>
                <div className="w-1/2 h-4 bg-muted-foreground/30"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}