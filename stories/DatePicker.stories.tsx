import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from '@/components/DatePicker';
import type { Language } from '@/lib/i18n';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern, customizable DatePicker component with support for 11 languages, dark mode, and various date formats.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'Selected date value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when date changes',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the picker',
    },
    showTime: {
      control: 'boolean',
      description: 'Show time selection',
    },
    format: {
      control: 'select',
      options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD.MM.YYYY'],
      description: 'Date format',
    },
    language: {
      control: 'select',
      options: ['en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'zh', 'ar'],
      description: 'Language selection',
    },
    showQuickSelect: {
      control: 'boolean',
      description: 'Show quick date selection options',
    },
    showWeekNumbers: {
      control: 'boolean',
      description: 'Show ISO week numbers',
    },
    usePortal: {
      control: 'boolean',
      description: 'Use React Portal for calendar',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for stories that need state
const DatePickerWrapper = (args: any) => {
  const [date, setDate] = useState<Date | null>(args.value || null);
  return <DatePicker {...args} value={date} onChange={setDate} />;
};

export const Basic: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Select date...',
    language: 'en',
  },
};

export const WithTime: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Select date and time...',
    showTime: true,
    language: 'en',
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    
    return (
      <div>
        <DatePicker
          {...args}
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Allowed range: {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
        </p>
      </div>
    );
  },
  args: {
    placeholder: 'Select date...',
    language: 'en',
  },
};

export const QuickSelect: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Select date...',
    showQuickSelect: true,
    language: 'en',
  },
};

export const WeekNumbers: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Select date...',
    showWeekNumbers: true,
    language: 'en',
  },
};

export const PortalMode: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Select date...',
    usePortal: true,
    language: 'en',
  },
};

export const DifferentFormats: Story = {
  render: (args) => {
    const [date1, setDate1] = useState<Date | null>(null);
    const [date2, setDate2] = useState<Date | null>(null);
    const [date3, setDate3] = useState<Date | null>(null);
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">DD/MM/YYYY</label>
          <DatePicker value={date1} onChange={setDate1} format="DD/MM/YYYY" language="en" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">MM/DD/YYYY</label>
          <DatePicker value={date2} onChange={setDate2} format="MM/DD/YYYY" language="en" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">YYYY-MM-DD</label>
          <DatePicker value={date3} onChange={setDate3} format="YYYY-MM-DD" language="en" />
        </div>
      </div>
    );
  },
};

export const AllLanguages: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    
    const languages: { code: Language; name: string }[] = [
      { code: 'en', name: 'English' },
      { code: 'tr', name: 'Türkçe' },
      { code: 'de', name: 'Deutsch' },
      { code: 'fr', name: 'Français' },
      { code: 'es', name: 'Español' },
      { code: 'it', name: 'Italiano' },
      { code: 'pt', name: 'Português' },
      { code: 'ru', name: 'Русский' },
      { code: 'ja', name: '日本語' },
      { code: 'zh', name: '中文' },
      { code: 'ar', name: 'العربية' },
    ];
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <DatePicker value={date} onChange={setDate} language={language} />
      </div>
    );
  },
};

export const AllFeatures: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Select date...',
    showTime: true,
    showQuickSelect: true,
    showWeekNumbers: true,
    format: 'DD/MM/YYYY',
    language: 'en',
  },
};

export const Disabled: Story = {
  render: DatePickerWrapper,
  args: {
    placeholder: 'Disabled picker',
    disabled: true,
    language: 'en',
  },
};
