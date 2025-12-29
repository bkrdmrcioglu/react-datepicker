# React DatePicker

Modern, customizable, and user-friendly React DatePicker component with dark mode and multi-language support.

[![View on GitHub](https://img.shields.io/badge/GitHub-View%20on%20GitHub-blue?logo=github)](https://github.com/bkrdmrcioglu/react-datepicker)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Demo-green?logo=vercel)](https://react-datepicker-mu.vercel.app)

## 🚀 Features

- ✅ Modern and elegant design
- ✅ **Dark Mode** - Full dark mode support
- ✅ **11 Language Support** - English, Turkish, German, French, Spanish, Italian, Portuguese, Russian, Japanese, Chinese, Arabic
- ✅ **Theme System** - 4 preset themes + custom theme support
- ✅ **Storybook** - Interactive component showcase
- ✅ **API Documentation** - Complete API reference
- ✅ **Test Coverage** - 90+ unit tests
- ✅ Date selection
- ✅ Date and time selection
- ✅ Date range selection (DateRangePicker)
- ✅ Min/Max date constraints
- ✅ Time Picker (TimePicker)
- ✅ Disableable
- ✅ TypeScript support
- ✅ Fully customizable
- ✅ Responsive design


## 📦 Installation

### Install via NPM

```bash
npm install react-datepicker-bkrdmrcioglu
# or
yarn add react-datepicker-bkrdmrcioglu
# or
pnpm add react-datepicker-bkrdmrcioglu
```

### Requirements

- React 16.8+
- React DOM 16.8+

### Import Styles

The component comes with its own CSS. Import it in your root layout or entry file:

```tsx
import 'react-datepicker-bkrdmrcioglu/dist/style.css';
```

## 🏃 Development (For This Repo)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Basic Usage

```tsx
import { DatePicker } from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      language="en" // Default: 'en'
    />
  );
}
```

### Language Support

```tsx
import { DatePicker } from 'react-datepicker-bkrdmrcioglu';
import type { Language } from 'react-datepicker-bkrdmrcioglu';

// English (default)
<DatePicker language="en" />

// Turkish
<DatePicker language="tr" />

// German
<DatePicker language="de" />

// French
<DatePicker language="fr" />

// Spanish
<DatePicker language="es" />

// Italian
<DatePicker language="it" />

// Portuguese
<DatePicker language="pt" />

// Russian
<DatePicker language="ru" />

// Japanese
<DatePicker language="ja" />

// Chinese
<DatePicker language="zh" />

// Arabic
<DatePicker language="ar" />
```

### Date and Time Selection

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  showTime={true}
  placeholder="Select date and time..."
/>
```

### Min/Max Date Constraints

```tsx
const minDate = new Date();
minDate.setDate(minDate.getDate() - 7);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

<DatePicker
  value={date}
  onChange={setDate}
  minDate={minDate}
  maxDate={maxDate}
/>
```

### Date Range Selection

```tsx
import { DateRangePicker } from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function MyComponent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(start, end) => {
        setStartDate(start);
        setEndDate(end);
      }}
    />
  );
}
```

### Time Picker

```tsx
import { TimePicker } from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function MyComponent() {
  const [time, setTime] = useState<string | null>(null);

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="Select time..."
    />
  );
}
```

## 🔧 API Reference

### DatePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `undefined` | Selected date |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Called when date changes |
| `placeholder` | `string` | `"Select date..."` | Input placeholder text |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `disabled` | `boolean` | `false` | Disable the picker |
| `className` | `string` | `""` | Additional CSS classes |
| `showTime` | `boolean` | `false` | Show time selection |
| `format` | `string` | `"DD/MM/YYYY"` | Date format |
| `language` | `Language` | `"en"` | Language selection (en, tr, de, fr, es, it, pt, ru, ja, zh, ar) |

### DateRangePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `startDate` | `Date \| null` | `undefined` | Start date |
| `endDate` | `Date \| null` | `undefined` | End date |
| `onChange` | `(start: Date \| null, end: Date \| null) => void` | `undefined` | Called when dates change |
| `placeholder` | `string` | `"Select date range..."` | Placeholder text |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `disabled` | `boolean` | `false` | Disable the picker |
| `className` | `string` | `""` | Additional CSS classes |

### TimePicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | `undefined` | Selected time (HH:MM) |
| `onChange` | `(time: string \| null) => void` | `undefined` | Called when time changes |
| `placeholder` | `string` | `"Select time..."` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the picker |
| `className` | `string` | `""` | Additional CSS classes |
| `format` | `"24h" \| "12h"` | `"24h"` | Time format (currently 24h) |
| `language` | `Language` | `"en"` | Language selection |

## 🎨 Customization

Components are highly customizable through props, themes, and CSS.

### Dark Mode

Dark mode is automatically set based on system preference or can be controlled manually using the `DarkModeToggle` component. All components support dark mode.

**Important:** You need to add the `dark` class to the HTML element for dark mode:

```tsx
import { DarkModeToggle } from 'react-datepicker-bkrdmrcioglu';

function MyComponent() {
  return <DarkModeToggle />;
}
```

To manually control dark mode:

```tsx
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
```

### Language Selector

You can use the `LanguageSelector` component for language selection:

```tsx
import { LanguageSelector, DatePicker } from 'react-datepicker-bkrdmrcioglu';
import type { Language } from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function MyComponent() {
  const [language, setLanguage] = useState<Language>('en');
  
  return (
    <>
      <LanguageSelector value={language} onChange={setLanguage} />
      <DatePicker language={language} />
    </>
  );
}
```

### Theme System

Customize the appearance of DatePicker components using the built-in theme system:

```tsx
import { ThemeProvider, DatePicker } from 'react-datepicker-bkrdmrcioglu';

function App() {
  return (
    <ThemeProvider defaultTheme="material">
      <DatePicker value={date} onChange={setDate} />
    </ThemeProvider>
  );
}
```

#### Available Themes

- `default` - Clean and modern design
- `material` - Google Material Design inspired
- `minimal` - Simple and clean
- `glassmorphism` - Modern glass effect

#### Custom Theme

```tsx
import { ThemeProvider } from 'react-datepicker-bkrdmrcioglu';
import type { Theme } from 'react-datepicker-bkrdmrcioglu';

const customTheme: Theme = {
  name: 'Custom',
  colors: {
    primary: '#8b5cf6',
    background: '#ffffff',
    // ... other colors
  },
  // ... other theme properties
};

function App() {
  return (
    <ThemeProvider defaultTheme={customTheme}>
      <DatePicker />
    </ThemeProvider>
  );
}
```

## 📚 Documentation

- **Live Demo**: [https://react-datepicker-mu.vercel.app](https://react-datepicker-mu.vercel.app)
- **API Reference**: `/docs/api` - Complete API documentation
- **Theme Playground**: `/docs/themes` - Interactive theme customization
- **Storybook**: Run `npm run storybook` for interactive component showcase

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 License


MIT License - Feel free to use it.

## 🤝 Contributing

We welcome your contributions! Please open an issue or submit a pull request.

## 📧 Contact

You can use GitHub Issues for your questions.

---

⭐ If you liked this project, don't forget to give it a star!
