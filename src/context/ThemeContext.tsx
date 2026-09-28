'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

import type { Theme } from '@/features/countries/types';

interface ThemeState {
  theme: Theme;
}

type ThemeAction =
  | {
      type: 'TOGGLE_THEME';
    }
  | {
      type: 'SET_THEME';
      payload: Theme;
    };

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext =
  createContext<ThemeContextValue | null>(null);

function themeReducer(
  state: ThemeState,
  action: ThemeAction,
): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        theme:
          state.theme === 'light'
            ? 'dark'
            : 'light',
      };

    case 'SET_THEME':
      return {
        theme: action.payload,
      };

    default:
      return state;
  }
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = localStorage.getItem(
    'theme',
  ) as Theme | null;

  return savedTheme === 'dark'
    ? 'dark'
    : 'light';
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [state, dispatch] = useReducer(
    themeReducer,
    {
      theme: 'light',
    },
  );

  useEffect(() => {
    const initialTheme = getInitialTheme();

    dispatch({
      type: 'SET_THEME',
      payload: initialTheme,
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme =
      state.theme;

    localStorage.setItem(
      'theme',
      state.theme,
    );
  }, [state.theme]);

  const value = useMemo(
    () => ({
      theme: state.theme,
      toggleTheme: () =>
        dispatch({
          type: 'TOGGLE_THEME',
        }),
    }),
    [state.theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider.',
    );
  }

  return context;
}