import { formatDate, getWeekNumber, isDateInRange, isSameDay } from '@/lib/utils/dateUtils';

describe('Date Utility Functions', () => {
  describe('formatDate', () => {
    const testDate = new Date('2024-01-15T10:30:00');

    it('should format date as DD/MM/YYYY', () => {
      expect(formatDate(testDate, 'DD/MM/YYYY')).toBe('15/01/2024');
    });

    it('should format date as MM/DD/YYYY', () => {
      expect(formatDate(testDate, 'MM/DD/YYYY')).toBe('01/15/2024');
    });

    it('should format date as YYYY-MM-DD', () => {
      expect(formatDate(testDate, 'YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('should format date as DD.MM.YYYY', () => {
      expect(formatDate(testDate, 'DD.MM.YYYY')).toBe('15.01.2024');
    });

    it('should include time when format includes time', () => {
      const result = formatDate(testDate, 'DD/MM/YYYY HH:mm');
      expect(result).toContain('15/01/2024');
      expect(result).toContain('10:30');
    });

    it('should handle null date', () => {
      expect(formatDate(null, 'DD/MM/YYYY')).toBe('');
    });
  });

  describe('getWeekNumber', () => {
    it('should return correct ISO week number', () => {
      const date = new Date('2024-01-15');
      const weekNumber = getWeekNumber(date);
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThanOrEqual(53);
    });

    it('should return 1 for first week of year', () => {
      const date = new Date('2024-01-01');
      const weekNumber = getWeekNumber(date);
      expect(weekNumber).toBe(1);
    });

    it('should handle year transitions correctly', () => {
      const date = new Date('2024-12-31');
      const weekNumber = getWeekNumber(date);
      expect(weekNumber).toBeGreaterThan(0);
    });
  });

  describe('isDateInRange', () => {
    const testDate = new Date('2024-01-15');
    const minDate = new Date('2024-01-10');
    const maxDate = new Date('2024-01-20');

    it('should return true for date within range', () => {
      expect(isDateInRange(testDate, minDate, maxDate)).toBe(true);
    });

    it('should return false for date before minDate', () => {
      const earlyDate = new Date('2024-01-05');
      expect(isDateInRange(earlyDate, minDate, maxDate)).toBe(false);
    });

    it('should return false for date after maxDate', () => {
      const lateDate = new Date('2024-01-25');
      expect(isDateInRange(lateDate, minDate, maxDate)).toBe(false);
    });

    it('should return true when no constraints', () => {
      expect(isDateInRange(testDate, undefined, undefined)).toBe(true);
    });

    it('should return true for date equal to minDate', () => {
      expect(isDateInRange(minDate, minDate, maxDate)).toBe(true);
    });

    it('should return true for date equal to maxDate', () => {
      expect(isDateInRange(maxDate, minDate, maxDate)).toBe(true);
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const date1 = new Date('2024-01-15T10:00:00');
      const date2 = new Date('2024-01-15T15:00:00');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-16');
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false when one date is null', () => {
      const date = new Date('2024-01-15');
      expect(isSameDay(date, null)).toBe(false);
      expect(isSameDay(null, date)).toBe(false);
    });

    it('should return true when both dates are null', () => {
      expect(isSameDay(null, null)).toBe(true);
    });
  });
});
