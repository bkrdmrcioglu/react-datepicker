'use client';

import { useState } from 'react';
import { type Language } from '@/lib/i18n';

export default function APIReferencePage() {
  const [activeSection, setActiveSection] = useState('datepicker');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">API Reference</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Complete API documentation for all components, props, and types.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* On-page Navigation */}
        <nav className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              On this page
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => scrollToSection('datepicker')}
                  className={`text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${activeSection === 'datepicker' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}
                >
                  DatePicker
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('daterangepicker')}
                  className={`text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${activeSection === 'daterangepicker' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}
                >
                  DateRangePicker
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('types')}
                  className={`text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${activeSection === 'types' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-600 dark:text-zinc-400'}`}
                >
                  Types & Interfaces
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-16">
          {/* DatePicker */}
          <section id="datepicker" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">DatePicker</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              A modern, customizable date picker component with support for time selection, multiple formats, and 11 languages.
            </p>

            {/* Props Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <thead className="bg-zinc-50 dark:bg-zinc-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Prop</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Default</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">value</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date | null</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">-</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Selected date value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">onChange</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">(date: Date | null) =&gt; void</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">-</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Callback when date changes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">placeholder</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">string</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">"Select date..."</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Input placeholder text</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">minDate</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">undefined</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Minimum selectable date</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">maxDate</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">undefined</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Maximum selectable date</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">disabled</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Disable the picker</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">showTime</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Show time selection</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">format</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">string</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">"DD/MM/YYYY"</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Date format (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, etc.)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">language</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Language</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">"en"</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Language (en, tr, de, fr, es, it, pt, ru, ja, zh, ar)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">showQuickSelect</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Show quick date selection options</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">showWeekNumbers</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Show ISO week numbers</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">usePortal</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Use React Portal for calendar rendering</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">className</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">string</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">""</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Additional CSS classes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">customDays</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">CustomDay[]</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">[]</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Custom day configurations (labels, colors, disabled)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">initialMonth</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">new Date()</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Initial month to display</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Example */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Example</h3>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-zinc-900 dark:text-zinc-100">{`import DatePicker from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      showTime={true}
      language="en"
      format="DD/MM/YYYY"
    />
  );
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* DateRangePicker */}
          <section id="daterangepicker" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">DateRangePicker</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              A date range picker component with two-month view and quick range selection options.
            </p>

            {/* Props Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <thead className="bg-zinc-50 dark:bg-zinc-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Prop</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Default</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">startDate</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date | null</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">-</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Start date value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">endDate</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date | null</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">-</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">End date value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">onChange</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">(start: Date | null, end: Date | null) =&gt; void</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">-</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Callback when dates change</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">minDate</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">undefined</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Minimum selectable date</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">maxDate</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Date</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">undefined</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Maximum selectable date</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">disabled</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Disable the picker</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">language</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">Language</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">"en"</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Language selection</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white">showQuickSelect</td>
                    <td className="px-4 py-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">boolean</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">false</td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">Show quick range selection options</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Example */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Example</h3>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-zinc-900 dark:text-zinc-100">{`import DateRangePicker from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function Example() {
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
      showQuickSelect={true}
      language="en"
    />
  );
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Types */}
          <section id="types" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Types & Interfaces</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Language</h3>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-zinc-900 dark:text-zinc-100">{`type Language = 'en' | 'tr' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'ru' | 'ja' | 'zh' | 'ar';`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">CustomDay</h3>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-zinc-900 dark:text-zinc-100">{`interface CustomDay {
  date: Date;
  label?: string;
  className?: string;
  color?: string;
  disabled?: boolean;
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
