export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
  selected: string;
  disabled: string;
  error: string;
  success: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface ThemeFonts {
  family: string;
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  weight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  fonts: ThemeFonts;
}

export type ThemePreset = 'default' | 'material' | 'minimal' | 'glassmorphism' | 'custom';
