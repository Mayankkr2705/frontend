"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 bg-background border-b border-border">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Logo can be styled if needed, but we keep the image */}
          <div className="relative w-30 h-50 opacity-80 group-hover:opacity-100 transition-opacity">
            <Image src="/logo.png" alt="App Logo" fill className="object-contain" />
          </div>
          <span style={{ fontFamily: 'var(--font-anton)' }} className="hidden sm:block text-2xl tracking-widest text-foreground uppercase mt-1">
            AdminFlow
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <b>
            <span className="bg-primary text-white font-mono text-[12px] uppercase tracking-[0.25em] px-3 py-1 flex items-center h-7">
              USER: {user.username}
            </span>
            </b>
            <button
              onClick={logout}
              className="font-mono font-bold text-[9px] uppercase tracking-[0.2em] text-red-400 border-5 border-red-900/50 px-3 h-7 hover:bg-red-400/10 transition-colors cursor-pointer flex items-center"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signin"
              className="font-mono text-[15px] uppercase tracking-[0.2em] px-3 h-7 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              SIGN IN
            </Link>
            <Link
              href="/signup"
              className="font-mono  text-[15px] uppercase tracking-[0.2em] px-3 h-7 flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              SIGN UP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;