import React from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-brand-700">Islamic Research World</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Evidence-based Islamic research — Arabic, English, Hausa</p>
          </div>
          <nav>
            <Link href="/research" className="text-sm text-brand-600 hover:underline">Ask a Question</Link>
          </nav>
        </header>

        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-soft">
          <h2 className="text-xl font-medium mb-4">Ask an Islamic Research Question</h2>
          <SearchBar />
          <p className="mt-3 text-sm text-slate-600">Try: "What is the ruling on raising the hands during Salah?"</p>
        </section>

        <footer className="mt-12 text-xs text-slate-500">
          <p>Development build — sample corpus only. For production, run ingestion and connect PostgreSQL + pgvector.</p>
        </footer>
      </div>
    </main>
  );
}
