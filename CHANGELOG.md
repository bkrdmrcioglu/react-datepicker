# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-12-29

### Added

#### 🎨 Theme System
- **ThemeProvider** component for easy theme customization
- **4 Preset Themes**: Default, Material Design, Minimal, and Glassmorphism
- CSS variables support for dynamic theming
- Interactive **Theme Playground** page at `/docs/themes`
- Complete TypeScript type definitions for themes

#### 📚 Documentation
- **Storybook Integration** with 16+ interactive stories
  - 10 DatePicker variants (basic, time, formats, languages, etc.)
  - 6 DateRangePicker variants
  - Dark mode support in Storybook
  - Interactive controls for all props
- **API Reference Page** at `/docs/api`
  - Detailed prop tables for all components
  - TypeScript type definitions
  - Code examples for each component
  - Searchable documentation

#### ✅ Testing
- **Jest + React Testing Library** setup
- **90+ Unit Tests** covering:
  - DatePicker component (50+ tests)
  - DateRangePicker component (40+ tests)
  - Utility functions (dateUtils, i18n)
- Test scripts: `npm test`, `npm run test:watch`, `npm run test:coverage`

#### 🎯 New Features
- Theme customization via ThemeProvider
- CSS variables for easy styling
- Export of all theme-related components and types

### Changed
- **Documentation Page Redesign**: Complete redesign with Catalyst Tailwind UI-inspired modern aesthetic
  - Clean sidebar navigation
  - Professional header with controls
  - Card-based example layout
  - Consistent Tailwind CSS styling
  - Full dark mode support
  - Enhanced typography and spacing

### Fixed
- JSX parsing errors in demo page
- Inconsistent styling across examples
- Missing TypeScript type exports

### Developer Experience
- Added Storybook for component development
- Comprehensive test coverage
- Better TypeScript support
- Improved documentation

## [0.1.1] - Previous Release

### Features
- Basic DatePicker component
- DateRangePicker component
- 11 language support
- Dark mode
- Multiple date formats
- Min/Max date constraints
- Quick select options
- Week numbers
- Portal mode
- Keyboard navigation

---

## Migration Guide

### From 0.1.x to 0.2.0

#### Theme System (Optional)
If you want to use the new theme system:

```tsx
// Before
import DatePicker from 'react-datepicker-bkrdmrcioglu';

function App() {
  return <DatePicker />;
}

// After (with theme)
import { ThemeProvider, DatePicker } from 'react-datepicker-bkrdmrcioglu';

function App() {
  return (
    <ThemeProvider defaultTheme="material">
      <DatePicker />
    </ThemeProvider>
  );
}
```

#### New Exports
```tsx
// Theme System
import {
  ThemeProvider,
  useTheme,
  themes,
  defaultTheme,
  materialTheme,
  minimalTheme,
  glassmorphismTheme,
} from 'react-datepicker-bkrdmrcioglu';

// Types
import type {
  Theme,
  ThemePreset,
  Language,
  CustomDay,
} from 'react-datepicker-bkrdmrcioglu';
```

**Note**: All existing functionality remains backward compatible. The theme system is optional and doesn't affect existing implementations.
