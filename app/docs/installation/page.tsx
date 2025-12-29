export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Installation</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        Get started with React Datepicker in your project in just a few minutes.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Requirements</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            React Datepicker has <strong>zero styling dependencies</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>React 16.8+</li>
            <li>React DOM 16.8+</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Install Package</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Install the package using your preferred package manager:
          </p>
          
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
            <code className="text-zinc-100 font-mono">npm install react-datepicker-bkrdmrcioglu</code>
          </div>
          <div className="mt-2 text-sm text-zinc-500">or</div>
          <div className="mt-2 bg-zinc-950 rounded-lg p-4 border border-zinc-800">
            <code className="text-zinc-100 font-mono">yarn add react-datepicker-bkrdmrcioglu</code>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Import Styles</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            The component comes with its own CSS. Import it in your root layout or entry file (e.g., <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm">layout.tsx</code> or <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm">App.tsx</code>):
          </p>
          
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
            <code className="text-zinc-100 font-mono text-sm">import 'react-datepicker-bkrdmrcioglu/dist/style.css';</code>
          </div>
        </section>
      </div>
    </div>
  );
}
