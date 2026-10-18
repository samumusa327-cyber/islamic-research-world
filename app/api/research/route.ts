import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { searchCorpus } from '@/lib/research';

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'query required' }, { status: 400 });
  }

  // detect language (very naive)
  const isArabic = /[\u0600-\u06FF]/.test(query);
  const language = isArabic ? 'ar' : 'en';

  // Expand search terms (placeholder - production should expand to Arabic/Hausa using transliteration or dictionary)
  const expandedQuery = query;

  const results = await searchCorpus(expandedQuery, { topK: 6 });

  // Build an evidence-first answer: for now we return retrieved passages and a short generated answer placeholder.
  const directAnswer = results.length
    ? `Found ${results.length} supporting source(s). See evidence below.`
    : 'No strong evidence found in the local corpus. Consider using broader search terms or enabling the ingestion pipeline.';

  return NextResponse.json({ query, language, directAnswer, results });
}
