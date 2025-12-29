import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import { getTranslations, type Language } from '../lib/i18n';
import './styles.css';

export interface CustomDay {
  date: Date;
  label?: string;
  className?: string;
  color?: string;
  disabled?: boolean;
}

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
  showQuickSelect?: boolean;
  showWeekNumbers?: boolean;
  customDays?: CustomDay[];
  usePortal?: boolean;
  portalContainer?: HTMLElement;
  animationDuration?: number;
  initialMonth?: Date;
}

export interface DatePickerHandle {
  openCalendar: () => void;
  closeCalendar: () => void;
}

const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>(({
  value,
  onChange,
  placeholder,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  showTime = false,
  format = 'DD/MM/YYYY',
  language = 'en',
  showQuickSelect = false,
  showWeekNumbers = false,
  customDays = [],
  usePortal = false,
  portalContainer,
  animationDuration = 200,
  initialMonth
}, ref) => {
  const t = getTranslations(language);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(initialMonth || value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
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
    if (value) {
      setSelectedDate(value);
      setTime({
        hours: value.getHours(),
        minutes: value.getMinutes()
      });
      setCurrentMonth(value);
    }
  }, [value]);

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
    setIsAnimating(false);
    setIsOpen(true);
    // Set initial month if provided
    if (initialMonth) {
      setCurrentMonth(initialMonth);
    } else if (minDate && minDate > new Date()) {
      // If minDate is in the future, start from that month
      setCurrentMonth(new Date(minDate.getFullYear(), minDate.getMonth(), 1));
    }
    const today = new Date();
    if (!focusedDate) {
      setFocusedDate(selectedDate || minDate || today);
    }
    // Focus the calendar after opening
    setTimeout(() => {
      calendarRef.current?.focus();
    }, 50);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const timeStr = showTime 
      ? ` ${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`
      : '';

    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}${timeStr}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}${timeStr}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}${timeStr}`;
      case 'DD.MM.YYYY':
        return `${day}.${month}.${year}${timeStr}`;
      default:
        return date.toLocaleDateString(language === 'en' ? 'en-US' : language);
    }
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
    // Check if date is in customDays and marked as disabled
    const customDay = getCustomDay(date);
    if (customDay?.disabled) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getCustomDay = (date: Date): CustomDay | undefined => {
    return customDays.find(cd => isSameDay(cd.date, date));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (showTime) {
      newDate.setHours(time.hours, time.minutes);
    }
    
    if (!isDateDisabled(newDate)) {
      setSelectedDate(newDate);
      setFocusedDate(newDate);
      onChange?.(newDate);
      if (!showTime) {
        handleClose();
      }
    }
  };

  const handleTimeChange = (type: 'hours' | 'minutes', value: number) => {
    const newTime = { ...time, [type]: Math.max(0, Math.min(type === 'hours' ? 23 : 59, value)) };
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

  const navigateDate = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!focusedDate) return;
    
    const newDate = new Date(focusedDate);
    switch (direction) {
      case 'up':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'down':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'left':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'right':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }

    // Update current month if needed
    if (newDate.getMonth() !== currentMonth.getMonth() || newDate.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
    }

    setFocusedDate(newDate);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        navigateDate('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        navigateDate('down');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        navigateDate('left');
        break;
      case 'ArrowRight':
        event.preventDefault();
        navigateDate('right');
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedDate && !isDateDisabled(focusedDate)) {
          handleDateSelect(focusedDate.getDate());
        }
        break;
      case 'Home':
        event.preventDefault();
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        setFocusedDate(firstDay);
        break;
      case 'End':
        event.preventDefault();
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        setFocusedDate(lastDay);
        break;
    }
  };

  const quickSelectDate = (type: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let targetDate = new Date(today);

    switch (type) {
      case 'today':
        targetDate = new Date(today);
        break;
      case 'tomorrow':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 1);
        break;
      case 'yesterday':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() - 1);
        break;
      case 'thisWeek':
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        targetDate = new Date(today.setDate(diff));
        break;
      case 'lastWeek':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7 - today.getDay() + 1);
        targetDate = lastWeekStart;
        break;
      case 'nextWeek':
        const nextWeekStart = new Date(today);
        nextWeekStart.setDate(today.getDate() + 7 - today.getDay() + 1);
        targetDate = nextWeekStart;
        break;
      case 'thisMonth':
        targetDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        targetDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case 'nextMonth':
        targetDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        break;
      case 'in7Days':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 7);
        break;
      case 'in30Days':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 30);
        break;
    }

    if (!isDateDisabled(targetDate)) {
      setSelectedDate(targetDate);
      setFocusedDate(targetDate);
      setCurrentMonth(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
      onChange?.(targetDate);
      if (!showTime) {
        handleClose();
      }
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    if (!isDateDisabled(today)) {
      setSelectedDate(today);
      setFocusedDate(today);
      onChange?.(today);
    }
  };

  const clearDate = () => {
    setSelectedDate(null);
    setFocusedDate(null);
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
  const position = usePortal && isOpen ? getPosition() : {};

  const calendarContent = (
    <div
      ref={calendarRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className={`rdp-calendar ${usePortal ? 'rdp-calendar-fixed' : 'rdp-calendar-absolute'} ${isOpen ? 'rdp-calendar-open' : 'rdp-calendar-closed'}`}
      style={{
        ...(usePortal ? position : {}),
        transitionDuration: `${animationDuration}ms`,
        width: '20rem'
      }}
      role="dialog"
      aria-label="Date picker"
      aria-modal="true"
    >
      {/* Quick Select */}
      {showQuickSelect && (
        <div className="rdp-quick-select">
          <p className="rdp-quick-select-title">
            {language === 'en' ? 'Quick Select:' : language === 'tr' ? 'Hızlı Seçim:' : 'Quick:'}
          </p>
          <div className="rdp-quick-select-grid">
            <button
              onClick={() => quickSelectDate('today')}
              className="rdp-quick-select-item"
              type="button"
            >
              {t.quickSelect.today}
            </button>
            <button
              onClick={() => quickSelectDate('tomorrow')}
              className="rdp-quick-select-item"
              type="button"
            >
              {t.quickSelect.tomorrow}
            </button>
            <button
              onClick={() => quickSelectDate('thisWeek')}
              className="rdp-quick-select-item"
              type="button"
            >
              {t.quickSelect.thisWeek}
            </button>
            <button
              onClick={() => quickSelectDate('nextWeek')}
              className="rdp-quick-select-item"
              type="button"
            >
              {t.quickSelect.nextWeek}
            </button>
            <button
              onClick={() => quickSelectDate('thisMonth')}
              className="rdp-quick-select-item"
              type="button"
            >
              {t.quickSelect.thisMonth}
            </button>
            <button
              onClick={() => quickSelectDate('in7Days')}
              className="rdp-quick-select-item"
              type="button"
            >
              {t.quickSelect.in7Days}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rdp-header">
        <button
          onClick={() => navigateMonth('prev')}
          className="rdp-nav-button"
          type="button"
          aria-label="Previous month"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="rdp-month-year">
          {t.months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        
        <button
          onClick={() => navigateMonth('next')}
          className="rdp-nav-button"
          type="button"
          aria-label="Next month"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className={`rdp-weekdays ${showWeekNumbers ? 'rdp-weekday-grid-8' : 'rdp-weekday-grid-7'}`}>
        {showWeekNumbers && (
          <div className="rdp-weekday">
            {t.week}
          </div>
        )}
        {t.weekdaysShort.map(day => (
          <div key={day} className="rdp-weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className={`rdp-days ${showWeekNumbers ? 'rdp-days-grid-8' : 'rdp-days-grid-7'}`}>
        {days.map((day, index) => {
          if (day === null) {
            return (
              <React.Fragment key={`empty-${index}`}>
                {showWeekNumbers && (
                  <div key={`empty-week-${index}`} className="rdp-day-empty" />
                )}
                <div key={`empty-day-${index}`} className="rdp-day-empty" />
              </React.Fragment>
            );
          }

          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isDisabled = isDateDisabled(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());
          const isFocused = focusedDate && isSameDay(date, focusedDate);
          const customDay = getCustomDay(date);
          const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay(); // Monday = 1
          const showWeekNum = showWeekNumbers && dayOfWeek === 1; // Show week number on Monday
          const weekNumber = showWeekNum ? getWeekNumber(date) : null;

          let dayClass = 'rdp-day';
          if (isSelected) {
            dayClass += ' rdp-day-selected';
          } else if (isFocused) {
            dayClass += ' rdp-day-focused';
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
            <React.Fragment key={`day-wrapper-${index}`}>
              {showWeekNumbers && (
                <div key={`week-${index}`} className="rdp-week-number-display">
                  {showWeekNum ? weekNumber : ''}
                </div>
              )}
              <button
                key={`day-${index}`}
                onClick={() => handleDateSelect(day)}
                disabled={isDisabled}
                className={dayClass}
                style={customDay?.color ? { color: customDay.color } : {}}
                type="button"
                aria-label={`Select ${formatDate(date)}`}
                aria-selected={isSelected || undefined}
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

      {/* Time Picker */}
      {showTime && (
        <div className="rdp-time-container">
          <div className="rdp-time-header">
            <span>{t.hours}</span>
            <span>{t.minutes}</span>
          </div>
          <div className="rdp-time-columns">
            <div className="rdp-time-highlight" style={{ color: 'var(--rdp-primary)' }} />
            <div className="rdp-time-separator">:</div>
            
            {/* Hours */}
            <div className="rdp-time-column" ref={(el) => {
              if (el && isOpen) {
                 const selected = el.children[time.hours];
                 if (selected) {
                   selected.scrollIntoView({ block: 'center', behavior: 'auto' });
                 }
              }
            }}>
              {Array.from({ length: 24 }, (_, i) => (
                <div 
                  key={i} 
                  className={`rdp-time-item ${time.hours === i ? 'rdp-time-item-selected' : ''}`}
                  onClick={() => handleTimeChange('hours', i)}
                >
                  {i.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
            
            {/* Minutes */}
            <div className="rdp-time-column" ref={(el) => {
              if (el && isOpen) {
                 const selected = el.children[time.minutes];
                 if (selected) {
                   selected.scrollIntoView({ block: 'center', behavior: 'auto' });
                 }
              }
            }}>
              {Array.from({ length: 60 }, (_, i) => (
                <div 
                  key={i} 
                  className={`rdp-time-item ${time.minutes === i ? 'rdp-time-item-selected' : ''}`}
                  onClick={() => handleTimeChange('minutes', i)}
                >
                  {i.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="rdp-footer">
        <button
          onClick={goToToday}
          className="rdp-today-button"
          type="button"
        >
          {t.today}
        </button>
        {selectedDate && (
          <button
            onClick={clearDate}
            className="rdp-clear-button"
            type="button"
          >
            {t.clear}
          </button>
        )}
        {showTime && (
          <button
            onClick={handleClose}
            className="rdp-ok-button"
            type="button"
          >
            {t.ok}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div ref={pickerRef} className={`rdp-container ${className}`}>
      <div className="rdp-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={formatDate(selectedDate)}
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
          className={`rdp-input ${selectedDate ? 'rdp-input-selected' : ''}`}
          aria-label="Date picker input"
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

      {isOpen && (
        usePortal && portalElement
          ? createPortal(calendarContent, portalElement)
          : calendarContent
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;

