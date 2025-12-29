'use client';

import { useState, useRef } from 'react';
import DatePicker, { type CustomDay, type DatePickerHandle } from '@/components/DatePicker';
import DateRangePicker from '@/components/DateRangePicker';
import TimePicker from '@/components/TimePicker';
import { type Language } from '@/lib/i18n';

// Code Example Component
const CodeExample = ({ code, language = 'en' }: { code: string; language?: Language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto bg-zinc-950 dark:bg-black text-zinc-100 text-sm rounded-lg border border-zinc-800">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
};

export default function ExamplesPage() {
  const language = 'en'; // Default for examples page

  // State for all examples
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minMaxDate, setMinMaxDate] = useState<Date | null>(null);
  const [quickSelectDate, setQuickSelectDate] = useState<Date | null>(null);
  const [weekNumberDate, setWeekNumberDate] = useState<Date | null>(null);
  const [portalDate, setPortalDate] = useState<Date | null>(null);
  const [formatDate1, setFormatDate1] = useState<Date | null>(null);
  const [formatDate2, setFormatDate2] = useState<Date | null>(null);
  const [formatDate3, setFormatDate3] = useState<Date | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [bookedDate, setBookedDate] = useState<Date | null>(null);
  const [singleHotelStartDate, setSingleHotelStartDate] = useState<Date | null>(null);
  const [singleHotelEndDate, setSingleHotelEndDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const checkOutRef = useRef<DatePickerHandle>(null);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Custom days for hotel example
  const hotelPrices: CustomDay[] = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const price = 100 + Math.floor(Math.random() * 100);
    return {
      date: d,
      label: `$${price}`,
      className: 'text-[10px] text-zinc-500 font-medium'
    };
  });

  // Booked days example
  const bookedDays: CustomDay[] = [
    { date: new Date(), disabled: true, className: '!bg-red-100 !text-red-600 line-through dark:!bg-red-900 dark:!text-red-200' },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), disabled: true, className: '!bg-red-100 !text-red-600 line-through dark:!bg-red-900 dark:!text-red-200' },
  ];

  return (
    <div className="space-y-16 py-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Examples</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Explore various usage patterns and configurations of the DatePicker component.
        </p>
      </div>

      <div className="space-y-12">
        {/* 1. Basic Usage */}
        <section id="basic" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">1. Basic Usage</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Simple date picker. Click on the input field to select a date.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  language="en"
                  placeholder="Select a date..."
                />
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Selected: <span className="font-mono text-zinc-900 dark:text-zinc-200">{selectedDate ? selectedDate.toLocaleDateString() : 'None'}</span>
                </div>
              </div>
              
              <CodeExample code={`import DatePicker from 'react-datepicker-bkrdmrcioglu';
import { useState } from 'react';

function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      language="en"
    />
  );
}`} />
            </div>
          </div>
        </section>

        {/* 2. Date and Time */}
        <section id="datetime" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">2. Date and Time Picker</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Date and time can be selected together.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={selectedDateTime}
                  onChange={setSelectedDateTime}
                  language="en"
                  showTime={true}
                  placeholder="Select date and time..."
                />
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Selected: <span className="font-mono text-zinc-900 dark:text-zinc-200">{selectedDateTime ? selectedDateTime.toLocaleString() : 'None'}</span>
                </div>
              </div>
              
              <CodeExample code={`<DatePicker
  value={date}
  onChange={setDate}
  showTime={true}
  language="en"
/>`} />
            </div>
          </div>
        </section>

        {/* 3. Date Range */}
        <section id="range" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">3. Date Range Picker</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Select a date range with start and end dates.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  language="en"
                />
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Selected Range: <span className="font-mono text-zinc-900 dark:text-zinc-200">
                    {startDate ? startDate.toLocaleDateString() : 'Start'} - {endDate ? endDate.toLocaleDateString() : 'End'}
                  </span>
                </div>
              </div>
              
              <CodeExample code={`import { DateRangePicker } from 'react-datepicker-bkrdmrcioglu';

<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={(start, end) => {
    setStartDate(start);
    setEndDate(end);
  }}
  language="en"
/>`} />
            </div>
          </div>
        </section>

        {/* 4. Quick Select */}
        <section id="quick" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">4. Quick Select Options</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Quick selection options for common date ranges.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={quickSelectDate}
                  onChange={setQuickSelectDate}
                  showQuickSelect={true}
                  language="en"
                />
              </div>
              
              <CodeExample code={`<DatePicker
  value={date}
  onChange={setDate}
  showQuickSelect={true}
  language="en"
/>`} />
            </div>
          </div>
        </section>

        {/* 5. Week Numbers */}
        <section id="week" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">5. Week Numbers</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Display ISO week numbers.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={weekNumberDate}
                  onChange={setWeekNumberDate}
                  showWeekNumbers={true}
                  language="en"
                />
              </div>
              
              <CodeExample code={`<DatePicker
  value={date}
  onChange={setDate}
  showWeekNumbers={true}
  language="en"
/>`} />
            </div>
          </div>
        </section>

        {/* 6. Portal Mode */}
        <section id="portal" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">6. Portal Mode</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Render the calendar in a React Portal (useful for overflow issues).</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={portalDate}
                  onChange={setPortalDate}
                  usePortal={true}
                  language="en"
                />
              </div>
              
              <CodeExample code={`<DatePicker
  value={date}
  onChange={setDate}
  usePortal={true}
  language="en"
/>`} />
            </div>
          </div>
        </section>

        {/* 7. Date Formats */}
        <section id="formats" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">7. Different Date Formats</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Support for various date formats.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-zinc-500">DD/MM/YYYY</span>
                  <DatePicker
                    value={formatDate1}
                    onChange={setFormatDate1}
                    format="DD/MM/YYYY"
                    language="en"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-zinc-500">MM/DD/YYYY</span>
                  <DatePicker
                    value={formatDate2}
                    onChange={setFormatDate2}
                    format="MM/DD/YYYY"
                    language="en"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-zinc-500">YYYY-MM-DD</span>
                  <DatePicker
                    value={formatDate3}
                    onChange={setFormatDate3}
                    format="YYYY-MM-DD"
                    language="en"
                  />
                </div>
              </div>
              
              <CodeExample code={`// DD/MM/YYYY
<DatePicker format="DD/MM/YYYY" />

// MM/DD/YYYY
<DatePicker format="MM/DD/YYYY" />

// YYYY-MM-DD
<DatePicker format="YYYY-MM-DD" />`} />
            </div>
          </div>
        </section>

        {/* 8. Min/Max Constraints */}
        <section id="minmax" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">8. Min/Max Constraints</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Restrict date selection to a specific range.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={minMaxDate}
                  onChange={setMinMaxDate}
                  minDate={minDate}
                  format="DD/MM/YYYY"
                  language="en"
                  usePortal={true}
                />
                <p className="text-sm text-zinc-500">
                  Allowed range: {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
                </p>
              </div>
              
              <CodeExample code={`const minDate = new Date();
minDate.setDate(minDate.getDate() - 7);

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

<DatePicker
  minDate={minDate}
  maxDate={maxDate}
/>`} />
            </div>
          </div>
        </section>

        {/* 9. All Features */}
        <section id="all" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">9. All Features Combined</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Using all available features together.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  showTime={true}
                  showQuickSelect={true}
                  showWeekNumbers={true}
                  format="DD/MM/YYYY"
                  language="en"
                />
              </div>
              
              <CodeExample code={`<DatePicker
  value={date}
  onChange={setDate}
  showTime={true}
  showQuickSelect={true}
  showWeekNumbers={true}
  usePortal={true}
  format="DD/MM/YYYY"
  language="en"
/>`} />
            </div>
          </div>
        </section>

        {/* 10. Hotel Booking Example */}
        <section id="hotel" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">10. Hotel Booking Example</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Real-world example with custom daily prices.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Check-in</label>
                    <DatePicker
                      value={checkInDate}
                      onChange={(date) => {
                        setCheckInDate(date);
                        if (date) {
                          setTimeout(() => checkOutRef.current?.openCalendar(), 100);
                        }
                      }}
                      customDays={hotelPrices}
                      language="en"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Check-out</label>
                    <DatePicker
                      ref={checkOutRef}
                      value={checkOutDate}
                      onChange={setCheckOutDate}
                      minDate={checkInDate || undefined}
                      customDays={hotelPrices}
                      language="en"
                      disabled={!checkInDate}
                    />
                  </div>
                </div>
              </div>
              
              <CodeExample code={`const prices = [
  { date: new Date(), label: '$120' },
  // ...
];

<DatePicker
  value={checkInDate}
  onChange={setCheckInDate}
  customDays={prices}
/>`} />
            </div>
          </div>
        </section>

        {/* 11. Booked Days Example */}
        <section id="booked" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">11. Disabled/Booked Days</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Example showing visually distinct disabled dates.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DatePicker
                  value={bookedDate}
                  onChange={setBookedDate}
                  customDays={bookedDays}
                  language="en"
                />
              </div>
              
              <CodeExample code={`const bookedDays = [
  { 
    date: new Date(), 
    disabled: true, 
    className: '!bg-red-100 !text-red-600 line-through dark:!bg-red-900 dark:!text-red-200' 
  }
];

<DatePicker
  customDays={bookedDays}
/>`} />
            </div>
          </div>
        </section>

        {/* 12. Hotel Booking (Single Input) */}
        <section id="hotel-single" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">12. Hotel Booking (Single Input)</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Select range in a single input with price information.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <DateRangePicker
                  startDate={singleHotelStartDate}
                  endDate={singleHotelEndDate}
                  onChange={(start, end) => {
                    setSingleHotelStartDate(start);
                    setSingleHotelEndDate(end);
                  }}
                  customDays={hotelPrices}
                  language="en"
                  placeholder="Select check-in and check-out"
                />
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Selected: <span className="font-mono text-zinc-900 dark:text-zinc-200">
                    {singleHotelStartDate ? singleHotelStartDate.toLocaleDateString() : 'Check-in'} - {singleHotelEndDate ? singleHotelEndDate.toLocaleDateString() : 'Check-out'}
                  </span>
                </div>
              </div>
              
              <CodeExample code={`<DateRangePicker
  startDate={startDate}
  endDate={endDate}
  onChange={(start, end) => {
    setStartDate(start);
    setEndDate(end);
  }}
  customDays={hotelPrices}
/>`} />
            </div>
          </div>
        </section>

        {/* 13. Time Picker */}
        <section id="time-picker" className="scroll-mt-24">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">13. Time Picker</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Standalone time picker with scrollable selection.</p>
            </div>
            
            <div className="p-6 grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Select Time</label>
                  <TimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                    placeholder="HH:MM"
                    language="en"
                  />
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Selected Time: <span className="font-mono text-zinc-900 dark:text-zinc-200">{selectedTime || 'None'}</span>
                </div>
              </div>
              
              <CodeExample code={`import { TimePicker } from 'react-datepicker';

const [time, setTime] = useState<string | null>(null);

<TimePicker
  value={time}
  onChange={setTime}
  placeholder="Select time"
/>`} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
