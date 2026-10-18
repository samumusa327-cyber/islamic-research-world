export type Source = {
  id: string;
  title: string;
  category: 'quran' | 'hadith' | 'madhhab' | 'scholar' | 'fatwa' | 'other';
  language: 'ar' | 'en' | 'ha' | string;
  text: string;
  original?: string;
  metadata?: Record<string, string>;
  url?: string;
};

// Small development corpus. For production, use DB + pgvector and ingestion jobs.
import data from './sample_corpus.json';

export const corpus: Source[] = data as Source[];
