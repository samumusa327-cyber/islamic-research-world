import type { Source } from '@/data/corpus';
import { corpus } from '@/data/corpus';

export type SearchResult = {
  source: Source;
  score: number; // higher is better
  highlights?: string[];
};

/** Simple keyword score: counts matched words (case-insensitive) */
function keywordScore(text: string, query: string) {
  const qTokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[^\p{L}\p{N}]/gu, ''));
  const textLower = text.toLowerCase();
  let score = 0;
  for (const t of qTokens) {
    if (!t) continue;
    if (textLower.includes(t)) score += 1;
  }
  return score;
}

export async function searchCorpus(query: string, opts?: { topK?: number }) {
  const topK = opts?.topK ?? 6;
  // Very small corpus: do naive scoring
  const scored: SearchResult[] = corpus
    .map((s) => ({ source: s, score: keywordScore((s.text || '') + ' ' + (s.title || ''), query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // If no hits, try fuzzy substring match across translations and metadata
  if (scored.length === 0) {
    const q = query.toLowerCase();
    for (const s of corpus) {
      if ((s.text || '').toLowerCase().includes(q) || (s.title || '').toLowerCase().includes(q)) {
        scored.push({ source: s, score: 0.5 });
        if (scored.length >= topK) break;
      }
    }
  }

  return scored;
}
