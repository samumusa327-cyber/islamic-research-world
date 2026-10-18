import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initial = '' }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/research?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        aria-label="Ask an Islamic research question"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 rounded-md border px-3 py-2 text-sm"
        placeholder="e.g., What is the ruling on raising the hands during Salah?"
      />
      <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm">Search</button>
    </form>
  );
}
