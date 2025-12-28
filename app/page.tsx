'use client';

import { useState } from 'react';
import DatePicker, { type CustomDay } from '@/components/DatePicker';
import DateRangePicker from '@/components/DateRangePicker';
import DarkModeToggle from '@/components/DarkModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { getTranslations, type Language } from '@/lib/i18n';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const t = getTranslations(language);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minMaxDate, setMinMaxDate] = useState<Date | null>(null);
  const [quickSelectDate, setQuickSelectDate] = useState<Date | null>(null);
  const [weekNumberDate, setWeekNumberDate] = useState<Date | null>(null);
  const [customDaysDate, setCustomDaysDate] = useState<Date | null>(null);
  const [portalDate, setPortalDate] = useState<Date | null>(null);
  const [formatDate1, setFormatDate1] = useState<Date | null>(null);
  const [formatDate2, setFormatDate2] = useState<Date | null>(null);
  const [formatDate3, setFormatDate3] = useState<Date | null>(null);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Özel günler örneği
  const customDays: CustomDay[] = [
    {
      date: new Date(),
      label: 'Bugün',
      className: 'ring-2 ring-green-500',
      color: '#10b981'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      label: 'Yarın',
      className: 'ring-2 ring-blue-500',
      color: '#3b82f6'
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      label: 'Özel',
      className: 'ring-2 ring-purple-500',
      color: '#a855f7'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header with Controls */}
        <div className="flex items-center justify-between mb-8">
          <div></div>
          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={setLanguage} />
            <DarkModeToggle />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            React DatePicker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Modern, customizable and user-friendly React DatePicker component'
              : language === 'tr'
              ? 'Modern, özelleştirilebilir ve kullanıcı dostu React DatePicker komponenti'
              : 'Modern, customizable React DatePicker component'
            }
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://github.com/bkrdmrcioglu/react-datepicker"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {language === 'en' ? 'View on GitHub' : language === 'tr' ? 'GitHub\'da Görüntüle' : 'GitHub'}
            </a>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          {/* Basic DatePicker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '1. Basic Usage' : language === 'tr' ? '1. Temel Kullanım' : '1. Basic'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Simple date picker. Click on the input field to select a date.'
                : language === 'tr'
                ? 'Basit bir tarih seçici. Tarih seçmek için input alanına tıklayın.'
                : 'Simple date picker.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                language={language}
              />
            </div>
            {selectedDate && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date: ' : language === 'tr' ? 'Seçilen tarih: ' : 'Date: '}
                  <span className="font-semibold text-blue-900 dark:text-blue-300">
                    {selectedDate.toLocaleDateString(language === 'en' ? 'en-US' : language, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* DatePicker with Time */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '2. Date and Time Picker' : language === 'tr' ? '2. Tarih ve Saat Seçici' : '2. Date & Time'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Date and time can be selected together.'
                : language === 'tr'
                ? 'Tarih ve saat birlikte seçilebilir.'
                : 'Date and time selection.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={selectedDateTime}
                onChange={setSelectedDateTime}
                showTime={true}
                language={language}
              />
            </div>
            {selectedDateTime && (
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date and time: ' : language === 'tr' ? 'Seçilen tarih ve saat: ' : 'Date & time: '}
                  <span className="font-semibold text-purple-900 dark:text-purple-300">
                    {selectedDateTime.toLocaleString(language === 'en' ? 'en-US' : language, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Quick Select */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '3. Quick Date Selection' : language === 'tr' ? '3. Hızlı Tarih Seçimi' : '3. Quick Select'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Quick select options: Today, Tomorrow, This Week, Next Week, This Month, In 7 Days, etc.'
                : language === 'tr'
                ? 'Hızlı seçim seçenekleri: Bugün, Yarın, Bu Hafta, Gelecek Hafta, Bu Ay, 7 Gün Sonra, vb.'
                : 'Quick select options.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={quickSelectDate}
                onChange={setQuickSelectDate}
                showQuickSelect={true}
                language={language}
              />
            </div>
            {quickSelectDate && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date: ' : language === 'tr' ? 'Seçilen tarih: ' : 'Date: '}
                  <span className="font-semibold text-green-900 dark:text-green-300">
                    {quickSelectDate.toLocaleDateString(language === 'en' ? 'en-US' : language)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Week Numbers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '4. Week Numbers' : language === 'tr' ? '4. Hafta Numaraları' : '4. Week Numbers'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Display ISO week numbers in the calendar.'
                : language === 'tr'
                ? 'Takvimde ISO hafta numaralarını gösterir.'
                : 'Display week numbers.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={weekNumberDate}
                onChange={setWeekNumberDate}
                showWeekNumbers={true}
                language={language}
              />
            </div>
            {weekNumberDate && (
              <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date: ' : language === 'tr' ? 'Seçilen tarih: ' : 'Date: '}
                  <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                    {weekNumberDate.toLocaleDateString(language === 'en' ? 'en-US' : language)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Custom Days */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '5. Custom Days' : language === 'tr' ? '5. Özel Günler' : '5. Custom Days'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Mark special days with custom labels, colors, and styles.'
                : language === 'tr'
                ? 'Özel günleri özel etiketler, renkler ve stillerle işaretleyin.'
                : 'Mark special days.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={customDaysDate}
                onChange={setCustomDaysDate}
                customDays={customDays}
                language={language}
              />
            </div>
            {customDaysDate && (
              <div className="mt-4 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date: ' : language === 'tr' ? 'Seçilen tarih: ' : 'Date: '}
                  <span className="font-semibold text-pink-900 dark:text-pink-300">
                    {customDaysDate.toLocaleDateString(language === 'en' ? 'en-US' : language)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Portal Mode */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '6. Portal Mode' : language === 'tr' ? '6. Portal Modu' : '6. Portal Mode'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Use React Portal to avoid z-index issues. Calendar renders outside the DOM hierarchy.'
                : language === 'tr'
                ? 'Z-index sorunlarını önlemek için React Portal kullanın. Takvim DOM hiyerarşisinin dışında render edilir.'
                : 'Use Portal to avoid z-index issues.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={portalDate}
                onChange={setPortalDate}
                usePortal={true}
                language={language}
              />
            </div>
            {portalDate && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date: ' : language === 'tr' ? 'Seçilen tarih: ' : 'Date: '}
                  <span className="font-semibold text-yellow-900 dark:text-yellow-300">
                    {portalDate.toLocaleDateString(language === 'en' ? 'en-US' : language)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Date Formats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '7. Date Formats' : language === 'tr' ? '7. Tarih Formatları' : '7. Date Formats'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Different date format options: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, DD.MM.YYYY'
                : language === 'tr'
                ? 'Farklı tarih format seçenekleri: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, DD.MM.YYYY'
                : 'Different date formats.'
              }
            </p>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  DD/MM/YYYY
                </label>
                <DatePicker
                  value={formatDate1}
                  onChange={setFormatDate1}
                  format="DD/MM/YYYY"
                  language={language}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  MM/DD/YYYY
                </label>
                <DatePicker
                  value={formatDate2}
                  onChange={setFormatDate2}
                  format="MM/DD/YYYY"
                  language={language}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  YYYY-MM-DD
                </label>
                <DatePicker
                  value={formatDate3}
                  onChange={setFormatDate3}
                  format="YYYY-MM-DD"
                  language={language}
                />
              </div>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '8. Date Range Picker (2 Months View)' : language === 'tr' ? '8. Tarih Aralığı Seçici (2 Ay Görünümü)' : '8. Date Range (2 Months)'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Start and end dates can be selected. Two months are displayed side by side for easy range selection.'
                : language === 'tr'
                ? 'Başlangıç ve bitiş tarihleri seçilebilir. Kolay aralık seçimi için iki ay yan yana gösterilir.'
                : 'Select date range with 2 months view.'
              }
            </p>
            <div className="max-w-2xl">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                language={language}
                showQuickSelect={true}
              />
            </div>
            {(startDate || endDate) && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected range: ' : language === 'tr' ? 'Seçilen aralık: ' : 'Range: '}
                  <span className="font-semibold text-green-900 dark:text-green-300">
                    {startDate
                      ? startDate.toLocaleDateString(language === 'en' ? 'en-US' : language)
                      : '...'}{' '}
                    -{' '}
                    {endDate
                      ? endDate.toLocaleDateString(language === 'en' ? 'en-US' : language)
                      : '...'}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* DatePicker with Min/Max */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '9. Min/Max Date Constraint' : language === 'tr' ? '9. Min/Max Tarih Kısıtlaması' : '9. Min/Max Date'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Only dates within a specific range can be selected.'
                : language === 'tr'
                ? 'Sadece belirli bir aralıktaki tarihler seçilebilir.'
                : 'Date range constraint.'
              }
            </p>
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === 'en' ? 'Allowed range: ' : language === 'tr' ? 'İzin verilen aralık: ' : 'Range: '}
                </span>
                {minDate.toLocaleDateString(language === 'en' ? 'en-US' : language)} - {maxDate.toLocaleDateString(language === 'en' ? 'en-US' : language)}
              </p>
            </div>
            <div className="max-w-md">
              <DatePicker
                value={minMaxDate}
                onChange={setMinMaxDate}
                minDate={minDate}
                maxDate={maxDate}
                language={language}
              />
            </div>
            {minMaxDate && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Selected date: ' : language === 'tr' ? 'Seçilen tarih: ' : 'Date: '}
                  <span className="font-semibold text-yellow-900 dark:text-yellow-300">
                    {minMaxDate.toLocaleDateString(language === 'en' ? 'en-US' : language)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Keyboard Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '10. Keyboard Navigation' : language === 'tr' ? '10. Klavye Navigasyonu' : '10. Keyboard'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'Use arrow keys to navigate, Enter to select, Escape to close, Home/End for first/last day of month.'
                : language === 'tr'
                ? 'Ok tuşları ile gezin, Enter ile seç, Escape ile kapat, Home/End ile ayın ilk/son gününe git.'
                : 'Keyboard navigation support.'
              }
            </p>
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === 'en' ? 'Keyboard shortcuts: ' : language === 'tr' ? 'Klavye kısayolları: ' : 'Shortcuts: '}
                </span>
                {language === 'en' 
                  ? '↑↓←→ (Navigate), Enter (Select), Escape (Close), Home/End (First/Last day)'
                  : language === 'tr'
                  ? '↑↓←→ (Gezin), Enter (Seç), Escape (Kapat), Home/End (İlk/Son gün)'
                  : 'Arrow keys, Enter, Escape, Home/End'}
              </p>
            </div>
            <div className="max-w-md">
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                language={language}
              />
            </div>
          </div>

          {/* All Features Combined */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '11. All Features Combined' : language === 'tr' ? '11. Tüm Özellikler Birleşik' : '11. All Features'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'DatePicker with all features enabled: Quick select, week numbers, custom days, time picker, and more.'
                : language === 'tr'
                ? 'Tüm özellikler etkin DatePicker: Hızlı seçim, hafta numaraları, özel günler, saat seçici ve daha fazlası.'
                : 'All features enabled.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                showQuickSelect={true}
                showWeekNumbers={true}
                showTime={true}
                customDays={customDays}
                language={language}
                format="DD/MM/YYYY"
              />
            </div>
          </div>

          {/* Disabled DatePicker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? '12. Disabled State' : language === 'tr' ? '12. Devre Dışı Durum' : '12. Disabled'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === 'en' 
                ? 'DatePicker can be disabled.'
                : language === 'tr'
                ? 'DatePicker devre dışı bırakılabilir.'
                : 'Disabled state.'
              }
            </p>
            <div className="max-w-md">
              <DatePicker
                value={null}
                onChange={() => {}}
                disabled={true}
                language={language}
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {language === 'en' ? 'All Features' : language === 'tr' ? 'Tüm Özellikler' : 'Features'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Keyboard Navigation' : language === 'tr' ? 'Klavye Navigasyonu' : 'Keyboard'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Full keyboard support' : language === 'tr' ? 'Tam klavye desteği' : 'Keyboard support'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Quick Select' : language === 'tr' ? 'Hızlı Seçim' : 'Quick Select'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? '10+ quick date options' : language === 'tr' ? '10+ hızlı tarih seçeneği' : 'Quick options'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Week Numbers' : language === 'tr' ? 'Hafta Numaraları' : 'Week Numbers'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'ISO week numbers' : language === 'tr' ? 'ISO hafta numaraları' : 'Week numbers'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Custom Days' : language === 'tr' ? 'Özel Günler' : 'Custom Days'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Mark special days' : language === 'tr' ? 'Özel günleri işaretle' : 'Custom days'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Portal Mode' : language === 'tr' ? 'Portal Modu' : 'Portal'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'React Portal support' : language === 'tr' ? 'React Portal desteği' : 'Portal support'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Date Formats' : language === 'tr' ? 'Tarih Formatları' : 'Formats'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Multiple format options' : language === 'tr' ? 'Çoklu format seçenekleri' : 'Formats'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Animations' : language === 'tr' ? 'Animasyonlar' : 'Animations'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Smooth transitions' : language === 'tr' ? 'Yumuşak geçişler' : 'Animations'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Accessibility' : language === 'tr' ? 'Erişilebilirlik' : 'A11y'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'ARIA labels & keyboard' : language === 'tr' ? 'ARIA etiketleri & klavye' : 'A11y'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Dark Mode' : language === 'tr' ? 'Karanlık Mod' : 'Dark Mode'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Full dark mode support' : language === 'tr' ? 'Tam karanlık mod desteği' : 'Dark mode'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Multi-language' : language === 'tr' ? 'Çoklu Dil' : 'i18n'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? '11 languages supported' : language === 'tr' ? '11 dil desteği' : '11 languages'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'TypeScript' : language === 'tr' ? 'TypeScript' : 'TypeScript'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Full TypeScript support' : language === 'tr' ? 'Tam TypeScript desteği' : 'TypeScript'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'en' ? 'Customizable' : language === 'tr' ? 'Özelleştirilebilir' : 'Customizable'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Easily customizable' : language === 'tr' ? 'Kolayca özelleştirilebilir' : 'Customizable'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>MIT License - {language === 'en' ? 'Free to use' : language === 'tr' ? 'Özgürce kullanabilirsiniz' : 'Free to use'}</p>
        </div>
      </div>
    </div>
  );
}
