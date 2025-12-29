'use client';

import { useState } from 'react';
import DatePicker from '@/components/DatePicker';
import DateRangePicker from '@/components/DateRangePicker';
import { ThemeProvider, useTheme, themes } from '@/lib/theme';
import type { ThemePreset } from '@/lib/theme';

function ThemePlaygroundContent() {
  const { theme, setTheme, currentPreset } = useTheme();
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const presets: { value: ThemePreset; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'material', label: 'Material Design' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'glassmorphism', label: 'Glassmorphism' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          Theme Playground
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Explore and customize DatePicker themes in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Theme Selector */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Select Theme
            </h2>
            
            <div className="space-y-3">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setTheme(preset.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    currentPreset === preset.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="font-medium text-zinc-900 dark:text-white">
                    {preset.label}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {preset.value === 'default' && 'Clean and modern design'}
                    {preset.value === 'material' && 'Google Material Design'}
                    {preset.value === 'minimal' && 'Simple and clean'}
                    {preset.value === 'glassmorphism' && 'Modern glass effect'}
                  </div>
                </button>
              ))}
            </div>

            {/* Theme Details */}
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                Current Theme: {theme.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Colors
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-1">
                      <div 
                        className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-700"
                        style={{ backgroundColor: theme.colors.primary }}
                        title="Primary"
                      />
                      <div className="text-xs text-zinc-500">Primary</div>
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-700"
                        style={{ backgroundColor: theme.colors.selected }}
                        title="Selected"
                      />
                      <div className="text-xs text-zinc-500">Selected</div>
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-700"
                        style={{ backgroundColor: theme.colors.hover }}
                        title="Hover"
                      />
                      <div className="text-xs text-zinc-500">Hover</div>
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="w-full h-8 rounded border border-zinc-200 dark:border-zinc-700"
                        style={{ backgroundColor: theme.colors.border }}
                        title="Border"
                      />
                      <div className="text-xs text-zinc-500">Border</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Border Radius
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    {theme.borderRadius.md}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Font Family
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-300 truncate">
                    {theme.fonts.family.split(',')[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="xl:col-span-2 space-y-8">
          {/* DatePicker Preview */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
              DatePicker Preview
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Basic DatePicker
                </label>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  placeholder="Select a date..."
                  language="en"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  With Time Selection
                </label>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  showTime={true}
                  placeholder="Select date and time..."
                  language="en"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  With Quick Select
                </label>
                <DatePicker
                  value={date}
                  onChange={setDate}
                  showQuickSelect={true}
                  placeholder="Select a date..."
                  language="en"
                />
              </div>
            </div>
          </div>

          {/* DateRangePicker Preview */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
              DateRangePicker Preview
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Date Range Selection
                </label>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  language="en"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  With Quick Select
                </label>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  showQuickSelect={true}
                  language="en"
                />
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Usage Example
            </h3>
            
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
              <pre className="text-sm overflow-x-auto">
                <code className="text-zinc-900 dark:text-zinc-100">{`import { ThemeProvider } from 'react-datepicker-bkrdmrcioglu';
import DatePicker from 'react-datepicker-bkrdmrcioglu';

function App() {
  return (
    <ThemeProvider defaultTheme="${currentPreset}">
      <DatePicker
        value={date}
        onChange={setDate}
        language="en"
      />
    </ThemeProvider>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemePlaygroundPage() {
  return (
    <ThemeProvider defaultTheme="default">
      <ThemePlaygroundContent />
    </ThemeProvider>
  );
}
