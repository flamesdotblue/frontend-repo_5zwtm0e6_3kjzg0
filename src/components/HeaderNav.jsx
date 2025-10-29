import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Sun, Moon } from 'lucide-react';

const HeaderNav = ({ onSearch }) => {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-100">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <BookOpen size={18} />
          </div>
          <span className="hidden sm:block">FSSAI Food Standards – Student Portal</span>
          <span className="sm:hidden">FSSAI Standards</span>
        </div>

        <div className="ml-auto flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Search parameters e.g., Aflatoxin, Moisture"
              className="w-full sm:w-80 pl-9 pr-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 border border-transparent"
            />
          </div>

          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
