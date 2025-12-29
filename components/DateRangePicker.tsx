import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import { getTranslations, type Language } from '../lib/i18n';
import type { CustomDay } from './DatePicker';
import './styles.css';

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

export interface DateRangePickerHandle {
  openCalendar: () => void;
  closeCalendar: () => void;
}

const DateRangePicker = forwardRef<DateRangePickerHandle, DateRangePickerProps>(({
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
}, ref) => {
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

  useImperativeHandle(ref, () => ({
    openCalendar: () => handleOpen(),
    closeCalendar: () => handleClose()
  }));

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
    if (!inputRef.current) return {};
    const rect = inputRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width
    };
  }, []);

  useEffect(() => {
    setLocalStartDate(startDate || null);
    setLocalEndDate(endDate || null);
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsidePicker = pickerRef.current && !pickerRef.current.contains(target);
      const isOutsideCalendar = calendarRef.current && !calendarRef.current.contains(target);

      if (isOutsidePicker && isOutsideCalendar) {
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
      <div className="rdp-range-calendar-month">
        {/* Header */}
        <div className="rdp-range-month-header">
          <button
            onClick={() => navigateMonth('prev', side)}
            className="rdp-range-nav-button"
            type="button"
            aria-label="Previous month"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="rdp-range-month-title">
            {t.months[month.getMonth()]} {month.getFullYear()}
          </div>
          
          <button
            onClick={() => navigateMonth('next', side)}
            className="rdp-range-nav-button"
            type="button"
            aria-label="Next month"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Weekday Headers */}
        <div className={`rdp-weekdays ${showWeekNumbers ? 'rdp-weekday-grid-8' : 'rdp-weekday-grid-7'}`} style={{ marginBottom: '0.75rem', gap: '0.375rem' }}>
          {showWeekNumbers && (
            <div className="rdp-weekday" style={{ padding: '0.5rem 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.week}
            </div>
          )}
          {t.weekdaysShort.map(day => (
            <div key={day} className="rdp-weekday" style={{ padding: '0.5rem 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className={`rdp-days ${showWeekNumbers ? 'rdp-days-grid-8' : 'rdp-days-grid-7'}`} style={{ gap: '0.375rem' }}>
          {days.map((day, index) => {
            if (day === null) {
              return (
                <React.Fragment key={`empty-${side}-${index}`}>
                  {showWeekNumbers && (
                    <div key={`empty-week-${side}-${index}`} className="rdp-day-empty" />
                  )}
                  <div key={`empty-day-${side}-${index}`} className="rdp-day-empty" />
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

            let dayClass = 'rdp-day';
            if (isStart || isEnd) {
              dayClass += ' rdp-range-day-start rdp-range-day-end';
            } else if (wouldBeStart || wouldBeEnd) {
              dayClass += ' rdp-range-day-start rdp-range-day-end';
            } else if (isInRangeDate) {
              dayClass += ' rdp-range-day-in-range';
            } else if (isInHoverRangeDate) {
              dayClass += ' rdp-range-day-hover';
            } else if (isToday) {
              dayClass += ' rdp-day-today';
            } else {
              dayClass += ' rdp-day-normal';
            }
            if (isDisabled) {
              dayClass += ' rdp-day-disabled';
            }
            if (customDay?.className) {
              dayClass += ` ${customDay.className}`;
            }

            return (
              <React.Fragment key={`day-wrapper-${side}-${index}`}>
                {showWeekNumbers && (
                  <div key={`week-${side}-${index}`} className="rdp-week-number-display">
                    {showWeekNum ? weekNumber : ''}
                  </div>
                )}
                <button
                  key={`day-${side}-${index}`}
                  onClick={() => handleDateSelect(day, month)}
                  onMouseEnter={() => handleDateHover(day, month)}
                  onMouseLeave={handleDateLeave}
                  disabled={isDisabled}
                  className={dayClass}
                  style={{
                    ...(customDay?.color ? { color: customDay.color } : {}),
                    transition: 'all 0.15s'
                  }}
                  type="button"
                  aria-label={`Select ${formatDate(date)}`}
                  aria-selected={isStart || isEnd || undefined}
                  aria-disabled={isDisabled}
                >
                  <div className="rdp-day-content">
                    <span className="rdp-day-number">{day}</span>
                    {customDay?.label && (
                      <span className="rdp-day-custom-label">
                        {customDay.label}
                      </span>
                    )}
                  </div>
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
      className={`rdp-calendar rdp-range-calendar ${usePortal ? 'rdp-calendar-fixed' : 'rdp-calendar-absolute'} ${isOpen ? 'rdp-calendar-open' : 'rdp-calendar-closed'}`}
      style={{
        ...(usePortal ? position : {}),
        transitionDuration: `${animationDuration}ms`,
        width: usePortal ? 'auto' : '680px',
        minWidth: '680px',
        padding: '1.5rem'
      }}
      role="dialog"
      aria-label="Date range picker"
      aria-modal="true"
    >
      {/* Two Month Calendars */}
      <div className="rdp-range-calendars-container">
        {renderCalendar(leftMonth, 'left')}
        <div className="rdp-range-calendar-divider"></div>
        {renderCalendar(rightMonth, 'right')}
      </div>
    </div>
  );

  return (
    <div ref={pickerRef} className={`rdp-container ${className}`}>
      <div className="rdp-input-wrapper">
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
          className={`rdp-input ${(localStartDate || localEndDate) ? 'rdp-input-selected' : ''}`}
          aria-label="Date range picker input"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        />
        <div className="rdp-input-wrapper-icon">
          <svg
            className="rdp-input-icon"
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
});

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
