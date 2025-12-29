'use client';

import Link from 'next/link';
import DatePicker from '@/components/DatePicker';
import { useState } from 'react';

export default function LandingPage() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10 dark:text-blue-400 dark:ring-blue-400/20">
                New v0.2.0 is out
              </span>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
              Modern Date Picker for React
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              A lightweight, highly customizable date picker component. Zero dependencies, accessible, i18n-ready, and themable.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/docs/installation" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get started
              </Link>
              <Link href="/docs/introduction" className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">
                Read documentation <span aria-hidden="true">→</span>
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-x-4">
              <div className="relative rounded-lg bg-zinc-900/5 dark:bg-zinc-50/5 p-4 leading-none font-mono text-sm text-zinc-500 dark:text-zinc-400 w-full max-w-md">
                npm install react-datepicker-bkrdmrcioglu
                <button 
                  onClick={() => navigator.clipboard.writeText('npm install react-datepicker-bkrdmrcioglu')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  aria-label="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Micro Demo */}
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-xl bg-white/50 dark:bg-zinc-900/50 p-2 ring-1 ring-inset ring-zinc-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4 backdrop-blur-xl">
                <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-2xl p-6 sm:p-8 w-[360px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-8">
                      <div className="h-2 w-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                      <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Select Date</label>
                      <DatePicker 
                        value={date} 
                        onChange={setDate}
                        showTime
                        language="en"
                        placeholder="Choose a date..."
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded"></div>
                      <div className="h-2 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded"></div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                      <div className="flex justify-between items-center">
                         <div className="h-8 w-24 bg-blue-600 rounded-md opacity-20"></div>
                         <div className="h-8 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
