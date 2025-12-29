import { getTranslation, type Language } from '@/lib/i18n';

describe('i18n Utility Functions', () => {
  describe('getTranslation', () => {
    describe('English translations', () => {
      const language: Language = 'en';

      it('should return correct month names', () => {
        expect(getTranslation('months', language)).toContain('January');
        expect(getTranslation('months', language)).toContain('December');
      });

      it('should return correct day names', () => {
        expect(getTranslation('days', language)).toContain('Monday');
        expect(getTranslation('days', language)).toContain('Sunday');
      });

      it('should return correct short day names', () => {
        expect(getTranslation('daysShort', language)).toContain('Mon');
        expect(getTranslation('daysShort', language)).toContain('Sun');
      });

      it('should return correct UI labels', () => {
        expect(getTranslation('today', language)).toBe('Today');
        expect(getTranslation('clear', language)).toBe('Clear');
        expect(getTranslation('close', language)).toBe('Close');
      });
    });

    describe('Turkish translations', () => {
      const language: Language = 'tr';

      it('should return correct month names', () => {
        expect(getTranslation('months', language)).toContain('Ocak');
        expect(getTranslation('months', language)).toContain('Aralık');
      });

      it('should return correct day names', () => {
        expect(getTranslation('days', language)).toContain('Pazartesi');
        expect(getTranslation('days', language)).toContain('Pazar');
      });

      it('should return correct UI labels', () => {
        expect(getTranslation('today', language)).toBe('Bugün');
        expect(getTranslation('clear', language)).toBe('Temizle');
      });
    });

    describe('German translations', () => {
      const language: Language = 'de';

      it('should return correct month names', () => {
        expect(getTranslation('months', language)).toContain('Januar');
        expect(getTranslation('months', language)).toContain('Dezember');
      });

      it('should return correct day names', () => {
        expect(getTranslation('days', language)).toContain('Montag');
        expect(getTranslation('days', language)).toContain('Sonntag');
      });
    });

    describe('All supported languages', () => {
      const languages: Language[] = ['en', 'tr', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'zh', 'ar'];

      it('should have translations for all languages', () => {
        languages.forEach(lang => {
          expect(getTranslation('months', lang)).toBeDefined();
          expect(getTranslation('days', lang)).toBeDefined();
          expect(getTranslation('today', lang)).toBeDefined();
        });
      });

      it('should return arrays with correct length', () => {
        languages.forEach(lang => {
          const months = getTranslation('months', lang);
          const days = getTranslation('days', lang);
          
          if (Array.isArray(months)) {
            expect(months).toHaveLength(12);
          }
          
          if (Array.isArray(days)) {
            expect(days).toHaveLength(7);
          }
        });
      });
    });

    describe('Fallback behavior', () => {
      it('should fallback to English for unsupported language', () => {
        const unsupportedLang = 'xx' as Language;
        const result = getTranslation('today', unsupportedLang);
        expect(result).toBe('Today'); // English fallback
      });
    });
  });
});
