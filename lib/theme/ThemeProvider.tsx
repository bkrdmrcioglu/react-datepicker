'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemePreset } from './types';
import { themes } from './themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | ThemePreset) => void;
  currentPreset: ThemePreset;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme | ThemePreset;
}

export function ThemeProvider({ children, defaultTheme = 'default' }: ThemeProviderProps) {
  const [currentPreset, setCurrentPreset] = useState<ThemePreset>('default');
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof defaultTheme === 'string') {
      return themes[defaultTheme];
    }
    return defaultTheme;
  });

  const setTheme = (newTheme: Theme | ThemePreset) => {
    if (typeof newTheme === 'string') {
      setThemeState(themes[newTheme]);
      setCurrentPreset(newTheme);
    } else {
      setThemeState(newTheme);
      setCurrentPreset('custom');
    }
  };

  useEffect(() => {
    // Apply theme as CSS variables
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--dp-color-primary', theme.colors.primary);
    root.style.setProperty('--dp-color-background', theme.colors.background);
    root.style.setProperty('--dp-color-surface', theme.colors.surface);
    root.style.setProperty('--dp-color-text', theme.colors.text);
    root.style.setProperty('--dp-color-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--dp-color-border', theme.colors.border);
    root.style.setProperty('--dp-color-hover', theme.colors.hover);
    root.style.setProperty('--dp-color-selected', theme.colors.selected);
    root.style.setProperty('--dp-color-disabled', theme.colors.disabled);
    root.style.setProperty('--dp-color-error', theme.colors.error);
    root.style.setProperty('--dp-color-success', theme.colors.success);

    // Spacing
    root.style.setProperty('--dp-spacing-xs', theme.spacing.xs);
    root.style.setProperty('--dp-spacing-sm', theme.spacing.sm);
    root.style.setProperty('--dp-spacing-md', theme.spacing.md);
    root.style.setProperty('--dp-spacing-lg', theme.spacing.lg);
    root.style.setProperty('--dp-spacing-xl', theme.spacing.xl);

    // Border Radius
    root.style.setProperty('--dp-radius-sm', theme.borderRadius.sm);
    root.style.setProperty('--dp-radius-md', theme.borderRadius.md);
    root.style.setProperty('--dp-radius-lg', theme.borderRadius.lg);
    root.style.setProperty('--dp-radius-xl', theme.borderRadius.xl);

    // Shadows
    root.style.setProperty('--dp-shadow-sm', theme.shadows.sm);
    root.style.setProperty('--dp-shadow-md', theme.shadows.md);
    root.style.setProperty('--dp-shadow-lg', theme.shadows.lg);

    // Fonts
    root.style.setProperty('--dp-font-family', theme.fonts.family);
    root.style.setProperty('--dp-font-size-xs', theme.fonts.size.xs);
    root.style.setProperty('--dp-font-size-sm', theme.fonts.size.sm);
    root.style.setProperty('--dp-font-size-md', theme.fonts.size.md);
    root.style.setProperty('--dp-font-size-lg', theme.fonts.size.lg);
    root.style.setProperty('--dp-font-size-xl', theme.fonts.size.xl);
    root.style.setProperty('--dp-font-weight-normal', theme.fonts.weight.normal.toString());
    root.style.setProperty('--dp-font-weight-medium', theme.fonts.weight.medium.toString());
    root.style.setProperty('--dp-font-weight-semibold', theme.fonts.weight.semibold.toString());
    root.style.setProperty('--dp-font-weight-bold', theme.fonts.weight.bold.toString());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentPreset }}>
      {children}
    </ThemeContext.Provider>
  );
}
