import { describe, it, expect } from 'vitest';
import { searchCorpus } from '@/lib/research';

describe('searchCorpus', () => {
  it('finds Quran verse by Arabic phrase', async () => {
    const res = await searchCorpus('الصلاة الوسطى');
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].source.id).toContain('quran');
  });

  it('finds hadith by keyword', async () => {
    const res = await searchCorpus('كذب');
    expect(res.length).toBeGreaterThan(0);
    expect(res.some((r) => r.source.id.includes('hadith'))).toBeTruthy();
  });
});
