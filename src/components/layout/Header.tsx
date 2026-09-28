
'use client';

import Link from 'next/link';

import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
        >
          Where in the world?
        </Link>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {theme === 'light'
            ? '🌙 Dark Mode'
            : '☀️ Light Mode'}
        </button>
      </div>
    </header>
  );
}