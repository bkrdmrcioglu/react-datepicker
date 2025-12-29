import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangePicker from '@/components/DateRangePicker';
import type { Language } from '@/lib/i18n';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A date range picker component with two-month view, quick select options, and multi-language support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    startDate: {
      control: 'date',
      description: 'Start date value',
    },
    endDate: {
      control: 'date',
      description: 'End date value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when dates change',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the picker',
    },
    language: {
      control: 'select',
      options: ['en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'zh', 'ar'],
      description: 'Language selection',
    },
    showQuickSelect: {
      control: 'boolean',
      description: 'Show quick range selection options',
    },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const DateRangePickerWrapper = (args: any) => {
  const [startDate, setStartDate] = useState<Date | null>(args.startDate || null);
  const [endDate, setEndDate] = useState<Date | null>(args.endDate || null);
  
  return (
    <DateRangePicker
      {...args}
      startDate={startDate}
      endDate={endDate}
      onChange={(start, end) => {
        setStartDate(start);
        setEndDate(end);
      }}
    />
  );
};

export const Basic: Story = {
  render: DateRangePickerWrapper,
  args: {
    language: 'en',
  },
};

export const WithQuickSelect: Story = {
  render: DateRangePickerWrapper,
  args: {
    showQuickSelect: true,
    language: 'en',
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    
    return (
      <div>
        <DateRangePicker
          {...args}
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
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
    language: 'en',
  },
};

export const PreselectedRange: Story = {
  render: (args) => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);
    
    const [startDate, setStartDate] = useState<Date | null>(start);
    const [endDate, setEndDate] = useState<Date | null>(end);
    
    return (
      <DateRangePicker
        {...args}
        startDate={startDate}
        endDate={endDate}
        onChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
    );
  },
  args: {
    language: 'en',
  },
};

export const DifferentLanguages: Story = {
  render: (args) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    
    const languages: { code: Language; name: string }[] = [
      { code: 'en', name: 'English' },
      { code: 'tr', name: 'Türkçe' },
      { code: 'de', name: 'Deutsch' },
      { code: 'fr', name: 'Français' },
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
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          language={language}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: DateRangePickerWrapper,
  args: {
    disabled: true,
    language: 'en',
  },
};
