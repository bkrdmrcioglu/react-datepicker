'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import { getTranslations, type Language } from '../lib/i18n';
import type { CustomDay } from './DatePicker';

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
  showQuickSelect?: boolean;
  showWeekNumbers?: boolean;
  customDays?: CustomDay[];
  usePortal?: boolean;
  portalContainer?: HTMLElement;
  animationDuration?: number;
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
  language = 'en',
  showQuickSelect = false,
  showWeekNumbers = false,
  customDays = [],
  usePortal = false,
  portalContainer,
  animationDuration = 200
}: DateRangePickerProps) {
  const t = getTranslations(language);
  const [isOpen, setIsOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(startDate || null);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(endDate || null);
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Portal setup
  useEffect(() => {
    if (usePortal && typeof window !== 'undefined') {
      const container = portalContainer || document.body;
      const element = document.createElement('div');
      element.style.position = 'fixed';
      element.style.top = '0';
      element.style.left = '0';
      element.style.width = '100%';
      element.style.height = '100%';
      element.style.zIndex = '9999';
      element.style.pointerEvents = 'none';
      container.appendChild(element);
      setPortalElement(element);
      return () => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      };
    } else {
      setPortalElement(null);
    }
  }, [usePortal, portalContainer]);

  // Calculate position for portal
  const getPosition = useCallback(() => {
    if (!inputRef.current || !calendarRef.current) return {};
    const rect = inputRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      width: rect.width
    };
  }, []);

  useEffect(() => {
    setLocalStartDate(startDate || null);
    setLocalEndDate(endDate || null);
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setFocusedDate(null);
  };

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    const today = new Date();
    if (!focusedDate) {
      setFocusedDate(localStartDate || localEndDate || today);
    }
    // Sync months
    if (localStartDate) {
      setLeftMonth(new Date(localStartDate.getFullYear(), localStartDate.getMonth(), 1));
      const nextMonth = new Date(localStartDate.getFullYear(), localStartDate.getMonth() + 1, 1);
      setRightMonth(nextMonth);
    } else if (localEndDate) {
      const prevMonth = new Date(localEndDate.getFullYear(), localEndDate.getMonth() - 1, 1);
      setLeftMonth(prevMonth);
      setRightMonth(new Date(localEndDate.getFullYear(), localEndDate.getMonth(), 1));
    }
  };

  const formatRange = (): string => {
    if (!localStartDate && !localEndDate) return '';
    if (localStartDate && !localEndDate) {
      return `${formatDate(localStartDate)} - ...`;
    }
    if (!localStartDate && localEndDate) {
      return `... - ${formatDate(localEndDate)}`;
    }
    if (localStartDate && localEndDate) {
      return `${formatDate(localStartDate)} - ${formatDate(localEndDate)}`;
    }
    return '';
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0
  };

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      if (d < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(23, 59, 59, 999);
      const d = new Date(date);
      d.setHours(23, 59, 59, 999);
      if (d > max) return true;
    }
    return false;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isInRange = (date: Date): boolean => {
    if (!localStartDate || !localEndDate) return false;
    return date >= localStartDate && date <= localEndDate;
  };

  const isInHoverRange = (date: Date): boolean => {
    if (!localStartDate || localEndDate || !hoveredDate) return false;
    if (hoveredDate >= localStartDate) {
      return date >= localStartDate && date <= hoveredDate;
    } else {
      return date >= hoveredDate && date <= localStartDate;
    }
  };

  const getCustomDay = (date: Date): CustomDay | undefined => {
    return customDays.find(cd => isSameDay(cd.date, date));
  };

  const handleDateSelect = (day: number, month: Date) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), day);
    
    if (!isDateDisabled(newDate)) {
      if (!localStartDate || (localStartDate && localEndDate) || (localStartDate && newDate < localStartDate)) {
        // Start new selection
        setLocalStartDate(newDate);
        setLocalEndDate(null);
        setHoveredDate(null);
        onChange?.(newDate, null);
      } else if (localStartDate && !localEndDate) {
        // Complete selection
        if (newDate >= localStartDate) {
          setLocalEndDate(newDate);
          setHoveredDate(null);
          onChange?.(localStartDate, newDate);
          handleClose();
        } else {
          setLocalStartDate(newDate);
          setLocalEndDate(null);
          setHoveredDate(null);
          onChange?.(newDate, null);
        }
      }
    }
  };

  const handleDateHover = (day: number, month: Date) => {
    if (localStartDate && !localEndDate) {
      const newDate = new Date(month.getFullYear(), month.getMonth(), day);
      if (!isDateDisabled(newDate)) {
        setHoveredDate(newDate);
      }
    }
  };

  const handleDateLeave = () => {
    setHoveredDate(null);
  };

  const navigateMonth = (direction: 'prev' | 'next', side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftMonth(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
          // Keep right month one month ahead
          const rightNew = new Date(newDate);
          rightNew.setMonth(newDate.getMonth() + 1);
          setRightMonth(rightNew);
        }
        return newDate;
      });
    } else {
      setRightMonth(prev => {
        const newDate = new Date(prev);
        if (direction === 'next') {
          newDate.setMonth(prev.getMonth() + 1);
        } else {
          newDate.setMonth(prev.getMonth() - 1);
          // Keep left month one month behind
          const leftNew = new Date(newDate);
          leftNew.setMonth(newDate.getMonth() - 1);
          setLeftMonth(leftNew);
        }
        return newDate;
      });
    }
  };

  const renderCalendar = (month: Date, side: 'left' | 'right') => {
    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);
    const days: (number | null)[] = [];

    // Empty days
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return (
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigateMonth('prev', side)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110 active:scale-95"
            type="button"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {t.months[month.getMonth()]} {month.getFullYear()}
            </span>
          </div>
          
          <button
            onClick={() => navigateMonth('next', side)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:scale-110 active:scale-95"
            type="button"
            aria-label="Next month"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Weekday Headers */}
        <div className={`grid gap-1.5 mb-3 ${showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7'}`}>
          {showWeekNumbers && (
            <div className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 py-2">
              {t.week}
            </div>
          )}
          {t.weekdaysShort.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-2 uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className={`grid gap-1.5 ${showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7'}`}>
          {days.map((day, index) => {
            if (day === null) {
              return (
                <React.Fragment key={`empty-${side}-${index}`}>
                  {showWeekNumbers && (
                    <div key={`empty-week-${side}-${index}`} className="aspect-square" />
                  )}
                  <div key={`empty-day-${side}-${index}`} className="aspect-square" />
                </React.Fragment>
              );
            }

            const date = new Date(month.getFullYear(), month.getMonth(), day);
            const isDisabled = isDateDisabled(date);
            const isStart = localStartDate && isSameDay(date, localStartDate);
            const isEnd = localEndDate && isSameDay(date, localEndDate);
            const isInRangeDate = isInRange(date);
            const isInHoverRangeDate = isInHoverRange(date);
            const isToday = isSameDay(date, new Date());
            const isFocused = focusedDate && isSameDay(date, focusedDate);
            const customDay = getCustomDay(date);
            const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
            const showWeekNum = showWeekNumbers && dayOfWeek === 1;
            const weekNumber = showWeekNum ? getWeekNumber(date) : null;

            // Determine if this date would be start or end in hover range
            const wouldBeStart = localStartDate && hoveredDate && isSameDay(date, localStartDate < hoveredDate ? localStartDate : hoveredDate);
            const wouldBeEnd = localStartDate && hoveredDate && isSameDay(date, localStartDate < hoveredDate ? hoveredDate : localStartDate);

            return (
              <React.Fragment key={`day-wrapper-${side}-${index}`}>
                {showWeekNumbers && (
                  <div key={`week-${side}-${index}`} className="aspect-square flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {showWeekNum ? weekNumber : ''}
                  </div>
                )}
                <button
                  key={`day-${side}-${index}`}
                  onClick={() => handleDateSelect(day, month)}
                  onMouseEnter={() => handleDateHover(day, month)}
                  onMouseLeave={handleDateLeave}
                  disabled={isDisabled}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-all duration-150
                    ${isStart || isEnd
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-400 scale-105 z-10 relative'
                      : wouldBeStart || wouldBeEnd
                      ? 'bg-blue-500 dark:bg-blue-400 text-white shadow-md ring-2 ring-blue-200 dark:ring-blue-300 scale-105 z-10 relative'
                      : isInRangeDate
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      : isInHoverRangeDate
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : isToday
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold ring-1 ring-blue-200 dark:ring-blue-700'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                    }
                    ${customDay ? customDay.className || '' : ''}
                    ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  `}
                  style={customDay?.color ? { color: customDay.color } : {}}
                  type="button"
                  aria-label={`Select ${formatDate(date)}`}
                  aria-selected={isStart || isEnd || undefined}
                  aria-disabled={isDisabled}
                >
                  {customDay?.label || day}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const defaultPlaceholder = t.selectRange;
  const position = usePortal && isOpen ? getPosition() : {};

  const calendarContent = (
    <div
      ref={calendarRef}
      tabIndex={-1}
      className={`
        ${usePortal ? 'fixed' : 'absolute'} z-50 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6
        transition-all ease-in-out backdrop-blur-sm
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
      `}
      style={{
        ...(usePortal ? position : {}),
        transitionDuration: `${animationDuration}ms`,
        width: usePortal ? 'auto' : '680px',
        minWidth: '680px'
      }}
      role="dialog"
      aria-label="Date range picker"
      aria-modal="true"
    >
      {/* Two Month Calendars */}
      <div className="flex gap-8">
        {renderCalendar(leftMonth, 'left')}
        <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
        {renderCalendar(rightMonth, 'right')}
      </div>
    </div>
  );

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={formatRange()}
          placeholder={placeholder || defaultPlaceholder}
          readOnly
          disabled={disabled}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className={`
            w-full px-4 py-2.5 rounded-lg border border-gray-300 
            bg-white text-gray-900 placeholder-gray-400
            dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            dark:focus:ring-blue-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
            dark:disabled:bg-gray-700 dark:disabled:text-gray-400
            cursor-pointer transition-all
            ${(localStartDate || localEndDate) ? 'font-medium' : ''}
          `}
          aria-label="Date range picker input"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
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

      {(isOpen || false) && (
        usePortal && portalElement
          ? createPortal(calendarContent, portalElement)
          : calendarContent
      )}
    </div>
  );
}
