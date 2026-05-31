import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppState();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl transition-all duration-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 active:scale-95 text-slate-600 dark:text-electric-glow focus:outline-none"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-400" />
      )}
    </button>
  );
}
