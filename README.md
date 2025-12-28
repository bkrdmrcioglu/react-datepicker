# React DatePicker

Modern, customizable, and user-friendly React DatePicker component. Built with Next.js and Tailwind CSS.

[![View on GitHub](https://img.shields.io/badge/GitHub-View%20on%20GitHub-blue?logo=github)](https://github.com/bkrdmrcioglu/react-datepicker)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Demo-green?logo=vercel)](https://react-datepicker-mu.vercel.app)

## 🚀 Features

- ✅ Modern and elegant design
- ✅ **Dark Mode** - Full dark mode support
- ✅ **11 Language Support** - English, Turkish, German, French, Spanish, Italian, Portuguese, Russian, Japanese, Chinese, Arabic
- ✅ Date selection
- ✅ Date and time selection
- ✅ Date range selection (DateRangePicker)
- ✅ Min/Max date constraints
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

This package uses Tailwind CSS. You must have Tailwind CSS installed in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add this to your `tailwind.config.js` file:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-datepicker-bkrdmrcioglu/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // For dark mode
  // ... your other settings
}
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

## 🎨 Customization

Components are built using Tailwind CSS. You can customize the styles by modifying the className properties in the `components/DatePicker.tsx` file.

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

## 📝 License

MIT License - Feel free to use it.

## 🤝 Contributing

We welcome your contributions! Please open an issue or submit a pull request.

## 📧 Contact

You can use GitHub Issues for your questions.

---

⭐ If you liked this project, don't forget to give it a star!
