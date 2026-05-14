"use client";
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-card border border-border p-10">
        <header className="text-center mb-10">
          <h1 style={{ fontFamily: 'var(--font-anton)' }} className="text-4xl text-foreground uppercase tracking-widest mb-2">
            SIGN UP
          </h1>
          <p className="text-muted-foreground font-mono text-xs tracking-[0.4em] uppercase">
            CREATE YOUR ACCOUNT
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]" htmlFor="name">
              Your Name
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-input border border-border text-foreground font-mono text-sm h-12 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-0 placeholder:text-muted-foreground transition-colors"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]" htmlFor="Email">
              Identity (Email)
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nexus.com"
                className="w-full bg-input border border-border text-foreground font-mono text-sm h-12 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-0 placeholder:text-muted-foreground transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]" htmlFor="password">
              Access Key
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-input border border-border text-foreground font-mono text-sm h-12 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-0 placeholder:text-muted-foreground transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold font-mono text-xs uppercase tracking-[0.25em] h-12 hover:brightness-110 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-6"
          >
            CREATE ACCOUNT
            <ArrowRight className="size-4" />
          </button>
        </form>

        <footer className="mt-8 text-center border-t border-border pt-6">
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em]">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary hover:text-foreground transition-colors">
              SIGN IN
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
