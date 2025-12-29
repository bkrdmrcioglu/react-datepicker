import type { Theme } from './types';

export const defaultTheme: Theme = {
  name: 'Default',
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    hover: '#f3f4f6',
    selected: '#dbeafe',
    disabled: '#d1d5db',
    error: '#ef4444',
    success: '#10b981',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  fonts: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

export const materialTheme: Theme = {
  name: 'Material',
  colors: {
    primary: '#1976d2',
    background: '#ffffff',
    surface: '#fafafa',
    text: '#212121',
    textSecondary: '#757575',
    border: '#e0e0e0',
    hover: '#f5f5f5',
    selected: '#bbdefb',
    disabled: '#bdbdbd',
    error: '#d32f2f',
    success: '#388e3c',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
  },
  shadows: {
    sm: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)',
    md: '0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12)',
    lg: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
  },
  fonts: {
    family: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

export const minimalTheme: Theme = {
  name: 'Minimal',
  colors: {
    primary: '#000000',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    hover: '#f5f5f5',
    selected: '#f0f0f0',
    disabled: '#cccccc',
    error: '#ff0000',
    success: '#00ff00',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0',
    md: '0',
    lg: '0',
    xl: '0',
  },
  shadows: {
    sm: 'none',
    md: 'none',
    lg: 'none',
  },
  fonts: {
    family: '"Helvetica Neue", Arial, sans-serif',
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    weight: {
      normal: 400,
      medium: 400,
      semibold: 600,
      bold: 700,
    },
  },
};

export const glassmorphismTheme: Theme = {
  name: 'Glassmorphism',
  colors: {
    primary: '#8b5cf6',
    background: 'rgba(255, 255, 255, 0.7)',
    surface: 'rgba(255, 255, 255, 0.5)',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: 'rgba(255, 255, 255, 0.3)',
    hover: 'rgba(255, 255, 255, 0.6)',
    selected: 'rgba(139, 92, 246, 0.2)',
    disabled: 'rgba(156, 163, 175, 0.5)',
    error: '#ef4444',
    success: '#10b981',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  shadows: {
    sm: '0 4px 6px rgba(0, 0, 0, 0.1)',
    md: '0 8px 16px rgba(0, 0, 0, 0.1)',
    lg: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

export const themes = {
  default: defaultTheme,
  material: materialTheme,
  minimal: minimalTheme,
  glassmorphism: glassmorphismTheme,
};
