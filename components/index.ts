// Components
export { default as DatePicker } from './DatePicker';
export { default as DateRangePicker } from './DateRangePicker';
export { default as TimePicker } from './TimePicker';
export { default as DarkModeToggle } from './DarkModeToggle';
export { default as LanguageSelector } from './LanguageSelector';

// Types
export type { DatePickerProps, CustomDay } from './DatePicker';
export type { DateRangePickerProps } from './DateRangePicker';
export type { TimePickerProps } from './TimePicker';

// Export i18n utilities
export { getTranslations, languageNames } from '../lib/i18n';
export type { Language, Translations } from '../lib/i18n';

// Export theme system
export { ThemeProvider, useTheme, themes, defaultTheme, materialTheme, minimalTheme, glassmorphismTheme } from '../lib/theme';
export type { Theme, ThemeColors, ThemeSpacing, ThemeBorderRadius, ThemeShadows, ThemeFonts, ThemePreset } from '../lib/theme';


// Import CSS - users need to import this in their app
import './styles.css';

