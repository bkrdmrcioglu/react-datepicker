# Kullanım Örnekleri

## NPM ile Kurulum

```bash
npm install react-datepicker-bkrdmrcioglu
```

## Temel Kullanım

```tsx
import { DatePicker } from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div>
      <DatePicker
        value={date}
        onChange={setDate}
        language="en"
      />
    </div>
  );
}
```

## Tarih Aralığı

```tsx
import { DateRangePicker } from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function App() {
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
      language="tr"
    />
  );
}
```

## Dark Mode ile

```tsx
import { DatePicker, DarkModeToggle } from 'react-datepicker-bkrdmrcioglu';

function App() {
  return (
    <div>
      <DarkModeToggle />
      <DatePicker language="en" />
    </div>
  );
}
```

## Dil Seçici ile

```tsx
import { 
  DatePicker, 
  LanguageSelector,
  type Language 
} from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function App() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div>
      <LanguageSelector value={language} onChange={setLanguage} />
      <DatePicker language={language} />
    </div>
  );
}
```

## Tailwind CSS Kurulumu

Bu paket Tailwind CSS kullanır. Projenizde Tailwind kurulu olmalıdır:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-datepicker-bkrdmrcioglu/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

