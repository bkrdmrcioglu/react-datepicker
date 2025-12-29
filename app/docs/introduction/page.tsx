export default function IntroductionPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Introduction</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        Datepicker is a modern, lightweight, and highly customizable React component. It includes its own minimal CSS, making it completely independent of your project's styling framework.
      </p>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Why React Datepicker?</h2>
          <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✓</span>
              <span><strong>Zero Dependencies:</strong> No specialized CSS framework required. Works out of the box.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✓</span>
              <span><strong>Premium Design:</strong> Beautifully crafted UI that fits modern applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✓</span>
              <span><strong>I18n Ready:</strong> Native support for 11 languages including RTL support for Arabic.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✓</span>
              <span><strong>Accessible:</strong> Keyboard navigation and ARIA support out of the box.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-1">✓</span>
              <span><strong>TypeScript:</strong> Fully typed for better developer experience.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Single & Range Selection</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Support for both single date and date range selection modes.</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Time Picker</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Integrated time selection with smooth interface.</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Theming</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Powerful theme system with presets and CSS variables.</p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Advanced Config</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Min/max dates, disabled days, custom day rendering.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
