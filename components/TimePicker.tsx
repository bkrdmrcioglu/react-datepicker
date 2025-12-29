'use client';

import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import { getTranslations, type Language } from '../lib/i18n';
import './styles.css';

export interface TimePickerProps {
  value?: string | null; // "HH:MM"
  onChange?: (time: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  language?: Language;
  usePortal?: boolean;
  portalContainer?: HTMLElement;
  format?: '24h' | '12h'; // Future proofing, currently only 24h supported by styles
}

export interface TimePickerHandle {
  openPicker: () => void;
  closePicker: () => void;
}

const TimePicker = forwardRef<TimePickerHandle, TimePickerProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  language = 'en',
  usePortal = false,
  portalContainer,
  format = '24h'
}, ref) => {
  const t = getTranslations(language);
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse initial value "HH:MM"
  const parseTime = (val: string | null | undefined) => {
    if (!val) return { hours: 0, minutes: 0 };
    const [h, m] = val.split(':').map(Number);
    return { hours: Number.isNaN(h) ? 0 : h, minutes: Number.isNaN(m) ? 0 : m };
  };

  const [time, setTime] = useState(parseTime(value));
  
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    openPicker: () => handleOpen(),
    closePicker: () => handleClose()
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

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      setTime(parseTime(value));
    }
  }, [value]);

  const getPosition = useCallback(() => {
    if (!inputRef.current) return {};
    const rect = inputRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width
    };
  }, []);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    // Refresh time from current value or default
    setTime(parseTime(value));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
       // If portal is used, we also need to check if click is inside the portal content
       if (usePortal && dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
         return;
       }
       handleClose();
    }
  }, [usePortal]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const handleTimeChange = (type: 'hours' | 'minutes', val: number) => {
    const newTime = { ...time, [type]: val };
    setTime(newTime);
  };

  const handleConfirm = () => {
    const formattedTime = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
    onChange?.(formattedTime);
    handleClose();
  };

  const handleClear = () => {
    onChange?.(null);
    handleClose();
  };

  const formattedValue = value || '';

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className={`rdp-calendar ${usePortal ? 'rdp-calendar-fixed' : 'rdp-calendar-absolute'} ${isOpen ? 'rdp-calendar-open' : 'rdp-calendar-closed'}`}
      style={{
        ...(usePortal ? getPosition() : {}),
        width: '18rem',
        pointerEvents: 'auto'
      }}
    >
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
                if (selected) selected.scrollIntoView({ block: 'center', behavior: 'auto' });
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
                if (selected) selected.scrollIntoView({ block: 'center', behavior: 'auto' });
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

      <div className="rdp-footer">
        <button
          onClick={handleClear}
          className="rdp-clear-button"
          type="button"
        >
          {t.clear}
        </button>
        <button
          onClick={handleConfirm}
          className="rdp-ok-button"
          type="button"
        >
          {t.ok}
        </button>
      </div>
    </div>
  );

  return (
    <div ref={pickerRef} className={`rdp-container ${className}`}>
      <div className="rdp-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={formattedValue}
          placeholder={placeholder || t.selectTime}
          readOnly
          disabled={disabled}
          onClick={handleOpen}
          className={`rdp-input ${value ? 'rdp-input-selected' : ''}`}
        />
        <div className="rdp-input-wrapper-icon">
          <svg className="rdp-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        usePortal && portalElement ? createPortal(dropdownContent, portalElement) : dropdownContent
      )}
    </div>
  );
});

TimePicker.displayName = 'TimePicker';

export default TimePicker;
