# React DatePicker

Modern, özelleştirilebilir ve kullanıcı dostu React DatePicker komponenti. Next.js ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ Modern ve şık tasarım
- ✅ **Dark Mode** - Tam karanlık mod desteği
- ✅ **11 Dil Desteği** - English, Türkçe, Deutsch, Français, Español, Italiano, Português, Русский, 日本語, 中文, العربية
- ✅ Tarih seçimi
- ✅ Tarih ve saat seçimi
- ✅ Tarih aralığı seçimi (DateRangePicker)
- ✅ Min/Max tarih kısıtlaması
- ✅ Devre dışı bırakılabilir
- ✅ TypeScript desteği
- ✅ Tamamen özelleştirilebilir
- ✅ Responsive tasarım

## 📦 Kurulum

```bash
npm install
# veya
yarn install
```

## 🏃 Geliştirme

```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📖 Kullanım

### Temel Kullanım

```tsx
import DatePicker from '@/components/DatePicker';

function MyComponent() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      language="en" // Default: 'en'
    />
  );
}
```

### Dil Desteği

```tsx
// İngilizce (varsayılan)
<DatePicker language="en" />

// Türkçe
<DatePicker language="tr" />

// Almanca
<DatePicker language="de" />

// Fransızca
<DatePicker language="fr" />

// İspanyolca
<DatePicker language="es" />

// İtalyanca
<DatePicker language="it" />

// Portekizce
<DatePicker language="pt" />

// Rusça
<DatePicker language="ru" />

// Japonca
<DatePicker language="ja" />

// Çince
<DatePicker language="zh" />

// Arapça
<DatePicker language="ar" />
```

### Tarih ve Saat Seçimi

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  showTime={true}
  placeholder="Tarih ve saat seçin..."
/>
```

### Min/Max Tarih Kısıtlaması

```tsx
const minDate = new Date();
minDate.setDate(minDate.getDate() - 7);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

<DatePicker
  value={date}
  onChange={setDate}
  minDate={minDate}
  maxDate={maxDate}
/>
```

### Tarih Aralığı Seçimi

```tsx
import DateRangePicker from '@/components/DateRangePicker';

function MyComponent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(start, end) => {
        setStartDate(start);
        setEndDate(end);
      }}
    />
  );
}
```

## 🔧 API Referansı

### DatePicker Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `Date \| null` | `undefined` | Seçili tarih |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Tarih değiştiğinde çağrılır |
| `placeholder` | `string` | `"Tarih seçin..."` | Input placeholder metni |
| `minDate` | `Date` | `undefined` | Minimum seçilebilir tarih |
| `maxDate` | `Date` | `undefined` | Maksimum seçilebilir tarih |
| `disabled` | `boolean` | `false` | Devre dışı bırakma |
| `className` | `string` | `""` | Ek CSS sınıfları |
| `showTime` | `boolean` | `false` | Saat seçimi göster |
| `format` | `string` | `"DD/MM/YYYY"` | Tarih formatı |
| `language` | `Language` | `"en"` | Dil seçimi (en, tr, de, fr, es, it, pt, ru, ja, zh, ar) |

### DateRangePicker Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `startDate` | `Date \| null` | `undefined` | Başlangıç tarihi |
| `endDate` | `Date \| null` | `undefined` | Bitiş tarihi |
| `onChange` | `(start: Date \| null, end: Date \| null) => void` | `undefined` | Tarih değiştiğinde çağrılır |
| `placeholder` | `string` | `"Tarih aralığı seçin..."` | Placeholder metni |
| `minDate` | `Date` | `undefined` | Minimum seçilebilir tarih |
| `maxDate` | `Date` | `undefined` | Maksimum seçilebilir tarih |
| `disabled` | `boolean` | `false` | Devre dışı bırakma |
| `className` | `string` | `""` | Ek CSS sınıfları |

## 🎨 Özelleştirme

Komponentler Tailwind CSS kullanılarak oluşturulmuştur. Stilleri özelleştirmek için `components/DatePicker.tsx` dosyasındaki className'leri değiştirebilirsiniz.

### Dark Mode

Dark mode otomatik olarak sistem tercihine göre ayarlanır veya `DarkModeToggle` komponenti ile manuel olarak kontrol edilebilir. Tüm komponentler dark mode'u destekler.

```tsx
import DarkModeToggle from '@/components/DarkModeToggle';

function MyComponent() {
  return <DarkModeToggle />;
}
```

### Dil Seçici

Dil seçimi için `LanguageSelector` komponentini kullanabilirsiniz:

```tsx
import LanguageSelector from '@/components/LanguageSelector';
import { type Language } from '@/lib/i18n';

function MyComponent() {
  const [language, setLanguage] = useState<Language>('en');
  
  return (
    <>
      <LanguageSelector value={language} onChange={setLanguage} />
      <DatePicker language={language} />
    </>
  );
}
```

## 📝 Lisans

MIT License - Özgürce kullanabilirsiniz.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir issue açın veya pull request gönderin.

## 📧 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
