import React from 'react';
import SearchBar from '@/components/SearchBar';

async function fetchResults(q: string) {
  const res = await fetch('/api/research', { method: 'POST', body: JSON.stringify({ query: q }), headers: { 'Content-Type': 'application/json' } });
  return res.json();
}

export default async function ResearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams && searchParams.q) || '';
  let data: any = null;
  if (q) {
    data = await fetchResults(q as string);
  }

  return (
    <main className="min-h-screen bg-ivory dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Research</h1>
          <p className="text-sm text-slate-600">Ask a question and the system will search verified sources.</p>
        </header>

        <section className="mb-6 bg-white dark:bg-slate-800 p-4 rounded">
          <SearchBar initial={q as string} />
        </section>

        <section>
          {!q && <p className="text-sm text-slate-500">Enter a question to begin.</p>}

          {q && data && (
            <article className="space-y-4">
              <h2 className="text-lg font-medium">Direct Answer</h2>
              <div className="p-4 bg-white dark:bg-slate-800 rounded border">{data.directAnswer}</div>

              <h3 className="text-md font-medium">Evidence</h3>
              <div className="space-y-3">
                {Array.isArray(data.results) && data.results.length > 0 ? (
                  data.results.map((r: any) => (
                    <div key={r.source.id} className="p-3 bg-white dark:bg-slate-900 border rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">{r.source.title} <span className="text-xs text-slate-500">({r.source.category})</span></div>
                          <div className="text-xs text-slate-500">{r.source.metadata?.surah ? `Surah ${r.source.metadata?.surah} Ayah ${r.source.metadata?.ayah}` : r.source.metadata?.hadith_number ? `Hadith ${r.source.metadata?.hadith_number}` : ''}</div>
                        </div>
                        <a href={r.source.url} target="_blank" rel="noreferrer" className="text-xs text-brand-600">Source</a>
                      </div>

                      <pre className="mt-2 text-sm whitespace-pre-wrap">{r.source.original || r.source.text}</pre>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border text-sm text-slate-600">No evidence found in the sample corpus. Run ingestion to add verified sources.</div>
                )}
              </div>
            </article>
          )}
        </section>

      </div>
    </main>
  );
}
