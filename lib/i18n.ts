export type Language = 'en' | 'tr' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'ru' | 'ja' | 'zh' | 'ar';

export interface Translations {
  months: string[];
  weekdays: string[];
  weekdaysShort: string[];
  today: string;
  clear: string;
  selectDate: string;
  selectTime: string;
  selectRange: string;
  startDate: string;
  endDate: string;
  hours: string;
  minutes: string;
  ok: string;
  quickSelect: {
    today: string;
    tomorrow: string;
    yesterday: string;
    thisWeek: string;
    lastWeek: string;
    nextWeek: string;
    thisMonth: string;
    lastMonth: string;
    nextMonth: string;
    in7Days: string;
    in30Days: string;
  };
  week: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    today: 'Today',
    clear: 'Clear',
    selectDate: 'Select a date...',
    selectTime: 'Select date and time...',
    selectRange: 'Select date range...',
    startDate: 'Start',
    endDate: 'End',
    hours: 'Hours',
    minutes: 'Minutes',
    ok: 'OK',
    quickSelect: {
      today: 'Today',
      tomorrow: 'Tomorrow',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      nextWeek: 'Next Week',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      nextMonth: 'Next Month',
      in7Days: 'In 7 Days',
      in30Days: 'In 30 Days'
    },
    week: 'Week'
  },
  tr: {
    months: [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ],
    weekdays: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    weekdaysShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    today: 'Bugün',
    clear: 'Temizle',
    selectDate: 'Bir tarih seçin...',
    selectTime: 'Tarih ve saat seçin...',
    selectRange: 'Tarih aralığı seçin...',
    startDate: 'Başlangıç',
    endDate: 'Bitiş',
    hours: 'Saat',
    minutes: 'Dakika',
    ok: 'Tamam',
    quickSelect: {
      today: 'Bugün',
      tomorrow: 'Yarın',
      yesterday: 'Dün',
      thisWeek: 'Bu Hafta',
      lastWeek: 'Geçen Hafta',
      nextWeek: 'Gelecek Hafta',
      thisMonth: 'Bu Ay',
      lastMonth: 'Geçen Ay',
      nextMonth: 'Gelecek Ay',
      in7Days: '7 Gün Sonra',
      in30Days: '30 Gün Sonra'
    },
    week: 'Hafta'
  },
  de: {
    months: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ],
    weekdays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    weekdaysShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    today: 'Heute',
    clear: 'Löschen',
    selectDate: 'Datum auswählen...',
    selectTime: 'Datum und Uhrzeit auswählen...',
    selectRange: 'Datumsbereich auswählen...',
    startDate: 'Anfang',
    endDate: 'Ende',
    hours: 'Stunden',
    minutes: 'Minuten',
    ok: 'OK',
    quickSelect: {
      today: 'Heute',
      tomorrow: 'Morgen',
      yesterday: 'Gestern',
      thisWeek: 'Diese Woche',
      lastWeek: 'Letzte Woche',
      nextWeek: 'Nächste Woche',
      thisMonth: 'Diesen Monat',
      lastMonth: 'Letzten Monat',
      nextMonth: 'Nächsten Monat',
      in7Days: 'In 7 Tagen',
      in30Days: 'In 30 Tagen'
    },
    week: 'Woche'
  },
  fr: {
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    weekdaysShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    today: "Aujourd'hui",
    clear: 'Effacer',
    selectDate: 'Sélectionner une date...',
    selectTime: 'Sélectionner la date et l\'heure...',
    selectRange: 'Sélectionner une plage de dates...',
    startDate: 'Début',
    endDate: 'Fin',
    hours: 'Heures',
    minutes: 'Minutes',
    ok: 'OK',
    quickSelect: {
      today: "Aujourd'hui",
      tomorrow: 'Demain',
      yesterday: 'Hier',
      thisWeek: 'Cette Semaine',
      lastWeek: 'Semaine Dernière',
      nextWeek: 'Semaine Prochaine',
      thisMonth: 'Ce Mois',
      lastMonth: 'Mois Dernier',
      nextMonth: 'Mois Prochain',
      in7Days: 'Dans 7 Jours',
      in30Days: 'Dans 30 Jours'
    },
    week: 'Semaine'
  },
  es: {
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    weekdaysShort: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    today: 'Hoy',
    clear: 'Limpiar',
    selectDate: 'Seleccionar una fecha...',
    selectTime: 'Seleccionar fecha y hora...',
    selectRange: 'Seleccionar rango de fechas...',
    startDate: 'Inicio',
    endDate: 'Fin',
    hours: 'Horas',
    minutes: 'Minutos',
    ok: 'OK',
    quickSelect: {
      today: 'Hoy',
      tomorrow: 'Mañana',
      yesterday: 'Ayer',
      thisWeek: 'Esta Semana',
      lastWeek: 'Semana Pasada',
      nextWeek: 'Próxima Semana',
      thisMonth: 'Este Mes',
      lastMonth: 'Mes Pasado',
      nextMonth: 'Próximo Mes',
      in7Days: 'En 7 Días',
      in30Days: 'En 30 Días'
    },
    week: 'Semana'
  },
  it: {
    months: [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ],
    weekdays: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
    weekdaysShort: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    today: 'Oggi',
    clear: 'Cancella',
    selectDate: 'Seleziona una data...',
    selectTime: 'Seleziona data e ora...',
    selectRange: 'Seleziona intervallo di date...',
    startDate: 'Inizio',
    endDate: 'Fine',
    hours: 'Ore',
    minutes: 'Minuti',
    ok: 'OK',
    quickSelect: {
      today: 'Oggi',
      tomorrow: 'Domani',
      yesterday: 'Ieri',
      thisWeek: 'Questa Settimana',
      lastWeek: 'Settimana Scorsa',
      nextWeek: 'Prossima Settimana',
      thisMonth: 'Questo Mese',
      lastMonth: 'Mese Scorso',
      nextMonth: 'Prossimo Mese',
      in7Days: 'Tra 7 Giorni',
      in30Days: 'Tra 30 Giorni'
    },
    week: 'Settimana'
  },
  pt: {
    months: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    weekdays: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
    weekdaysShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    today: 'Hoje',
    clear: 'Limpar',
    selectDate: 'Selecione uma data...',
    selectTime: 'Selecione data e hora...',
    selectRange: 'Selecione intervalo de datas...',
    startDate: 'Início',
    endDate: 'Fim',
    hours: 'Horas',
    minutes: 'Minutos',
    ok: 'OK',
    quickSelect: {
      today: 'Hoje',
      tomorrow: 'Amanhã',
      yesterday: 'Ontem',
      thisWeek: 'Esta Semana',
      lastWeek: 'Semana Passada',
      nextWeek: 'Próxima Semana',
      thisMonth: 'Este Mês',
      lastMonth: 'Mês Passado',
      nextMonth: 'Próximo Mês',
      in7Days: 'Em 7 Dias',
      in30Days: 'Em 30 Dias'
    },
    week: 'Semana'
  },
  ru: {
    months: [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    weekdays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    today: 'Сегодня',
    clear: 'Очистить',
    selectDate: 'Выберите дату...',
    selectTime: 'Выберите дату и время...',
    selectRange: 'Выберите диапазон дат...',
    startDate: 'Начало',
    endDate: 'Конец',
    hours: 'Часы',
    minutes: 'Минуты',
    ok: 'ОК',
    quickSelect: {
      today: 'Сегодня',
      tomorrow: 'Завтра',
      yesterday: 'Вчера',
      thisWeek: 'Эта Неделя',
      lastWeek: 'Прошлая Неделя',
      nextWeek: 'Следующая Неделя',
      thisMonth: 'Этот Месяц',
      lastMonth: 'Прошлый Месяц',
      nextMonth: 'Следующий Месяц',
      in7Days: 'Через 7 Дней',
      in30Days: 'Через 30 Дней'
    },
    week: 'Неделя'
  },
  ja: {
    months: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    weekdays: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
    weekdaysShort: ['月', '火', '水', '木', '金', '土', '日'],
    today: '今日',
    clear: 'クリア',
    selectDate: '日付を選択...',
    selectTime: '日付と時刻を選択...',
    selectRange: '日付範囲を選択...',
    startDate: '開始',
    endDate: '終了',
    hours: '時',
    minutes: '分',
    ok: 'OK',
    quickSelect: {
      today: '今日',
      tomorrow: '明日',
      yesterday: '昨日',
      thisWeek: '今週',
      lastWeek: '先週',
      nextWeek: '来週',
      thisMonth: '今月',
      lastMonth: '先月',
      nextMonth: '来月',
      in7Days: '7日後',
      in30Days: '30日後'
    },
    week: '週'
  },
  zh: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    weekdaysShort: ['一', '二', '三', '四', '五', '六', '日'],
    today: '今天',
    clear: '清除',
    selectDate: '选择日期...',
    selectTime: '选择日期和时间...',
    selectRange: '选择日期范围...',
    startDate: '开始',
    endDate: '结束',
    hours: '小时',
    minutes: '分钟',
    ok: '确定',
    quickSelect: {
      today: '今天',
      tomorrow: '明天',
      yesterday: '昨天',
      thisWeek: '本周',
      lastWeek: '上周',
      nextWeek: '下周',
      thisMonth: '本月',
      lastMonth: '上月',
      nextMonth: '下月',
      in7Days: '7天后',
      in30Days: '30天后'
    },
    week: '周'
  },
  ar: {
    months: [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ],
    weekdays: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
    weekdaysShort: ['اث', 'ثل', 'أر', 'خم', 'جم', 'سب', 'أح'],
    today: 'اليوم',
    clear: 'مسح',
    selectDate: 'اختر تاريخاً...',
    selectTime: 'اختر التاريخ والوقت...',
    selectRange: 'اختر نطاق التاريخ...',
    startDate: 'البداية',
    endDate: 'النهاية',
    hours: 'ساعات',
    minutes: 'دقائق',
    ok: 'موافق',
    quickSelect: {
      today: 'اليوم',
      tomorrow: 'غداً',
      yesterday: 'أمس',
      thisWeek: 'هذا الأسبوع',
      lastWeek: 'الأسبوع الماضي',
      nextWeek: 'الأسبوع القادم',
      thisMonth: 'هذا الشهر',
      lastMonth: 'الشهر الماضي',
      nextMonth: 'الشهر القادم',
      in7Days: 'بعد 7 أيام',
      in30Days: 'بعد 30 يوماً'
    },
    week: 'أسبوع'
  }
};

export const getTranslations = (lang: Language = 'en'): Translations => {
  return translations[lang] || translations.en;
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  zh: '中文',
  ar: 'العربية'
};

