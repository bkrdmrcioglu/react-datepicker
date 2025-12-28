'use client';

import { useState, useRef, useEffect } from 'react';
import { getTranslations, type Language } from '@/lib/i18n';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
  showTime?: boolean;
  format?: string;
  language?: Language;
}

export default function DatePicker({
  value,
  onChange,
  placeholder,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  showTime = false,
  format = 'DD/MM/YYYY',
  language = 'en'
}: DatePickerProps) {
  const t = getTranslations(language);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setTime({
        hours: value.getHours(),
        minutes: value.getMinutes()
      });
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    if (format === 'DD/MM/YYYY') {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const timeStr = showTime 
        ? ` ${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`
        : '';
      return `${day}/${month}/${year}${timeStr}`;
    }
    
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language);
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (showTime) {
      newDate.setHours(time.hours, time.minutes);
    }
    
    if (!isDateDisabled(newDate)) {
      setSelectedDate(newDate);
      onChange?.(newDate);
      if (!showTime) {
        setIsOpen(false);
      }
    }
  };

  const handleTimeChange = (type: 'hours' | 'minutes', value: number) => {
    const newTime = { ...time, [type]: value };
    setTime(newTime);
    
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(newTime.hours, newTime.minutes);
      setSelectedDate(newDate);
      onChange?.(newDate);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (!isDateDisabled(today)) {
      setSelectedDate(today);
      onChange?.(today);
    }
  };

  const clearDate = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = [];

  // Empty days
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Month days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const defaultPlaceholder = showTime ? t.selectTime : t.selectDate;

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={formatDate(selectedDate)}
          placeholder={placeholder || defaultPlaceholder}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-2.5 rounded-lg border border-gray-300 
            bg-white text-gray-900 placeholder-gray-400
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            dark:focus:ring-blue-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
            dark:disabled:bg-gray-700 dark:disabled:text-gray-400
            cursor-pointer transition-all
            ${selectedDate ? 'font-medium' : ''}
          `}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-80">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              type="button"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {t.months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
            </div>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              type="button"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {t.weekdaysShort.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={index} className="aspect-square" />;
              }

              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isDisabled = isDateDisabled(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={isDisabled}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                      : isToday
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                    ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  type="button"
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time Picker */}
          {showTime && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">{t.hours}:</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={time.hours}
                    onChange={(e) => handleTimeChange('hours', parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <span className="text-gray-400 dark:text-gray-500">:</span>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">{t.minutes}:</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={time.minutes}
                    onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <button
              onClick={goToToday}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              type="button"
            >
              {t.today}
            </button>
            {selectedDate && (
              <button
                onClick={clearDate}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                type="button"
              >
                {t.clear}
              </button>
            )}
            {showTime && (
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                type="button"
              >
                {t.ok}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
