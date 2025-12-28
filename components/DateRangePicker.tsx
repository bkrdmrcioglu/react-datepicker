'use client';

import { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import { getTranslations, type Language } from '@/lib/i18n';

export interface DateRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
  language?: Language;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  placeholder,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  language = 'en'
}: DateRangePickerProps) {
  const t = getTranslations(language);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(startDate || null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(endDate || null);

  useEffect(() => {
    setLocalStartDate(startDate || null);
    setLocalEndDate(endDate || null);
  }, [startDate, endDate]);

  const handleStartDateChange = (date: Date | null) => {
    setLocalStartDate(date);
    if (date && localEndDate && date > localEndDate) {
      setLocalEndDate(null);
      onChange?.(date, null);
    } else {
      onChange?.(date, localEndDate);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setLocalEndDate(date);
    onChange?.(localStartDate, date);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DatePicker
        value={localStartDate}
        onChange={handleStartDateChange}
        placeholder={t.startDate}
        minDate={minDate}
        maxDate={localEndDate || maxDate}
        disabled={disabled}
        className="flex-1"
        language={language}
      />
      <span className="text-gray-400 dark:text-gray-500">-</span>
      <DatePicker
        value={localEndDate}
        onChange={handleEndDateChange}
        placeholder={t.endDate}
        minDate={localStartDate || minDate}
        maxDate={maxDate}
        disabled={disabled}
        className="flex-1"
        language={language}
      />
    </div>
  );
}
