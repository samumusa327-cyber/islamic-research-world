CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  source_id TEXT NOT NULL UNIQUE,
  source_title TEXT NOT NULL,
  source_category TEXT NOT NULL,
  language TEXT,
  passage TEXT NOT NULL,
  original TEXT,
  metadata JSONB,
  source_url TEXT,
  verification_status TEXT DEFAULT 'unverified',
  created_at TIMESTAMPTZ DEFAULT now(),
  embedding vector(1536)
);

ALTER TABLE documents ADD COLUMN IF NOT EXISTS search_tsv tsvector;

CREATE OR REPLACE FUNCTION documents_tsv_trigger() RETURNS trigger AS $$
begin
  new.search_tsv := to_tsvector('simple', coalesce(new.passage,'') || ' ' || coalesce(new.source_title,''));
  return new;
end
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tsvectorupdate ON documents;
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE ON documents
FOR EACH ROW EXECUTE PROCEDURE documents_tsv_trigger();

CREATE INDEX IF NOT EXISTS idx_documents_category ON documents (source_category);
CREATE INDEX IF NOT EXISTS idx_documents_search_tsv ON documents USING gin (search_tsv);

-- Approximate search index only after vectors have been populated.
-- CREATE INDEX IF NOT EXISTS idx_documents_embedding ON documents USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
