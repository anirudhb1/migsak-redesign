-- Supabase Table Setup for Migsak Enquiry System
-- Run this in the Supabase SQL Editor

-- 1. Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  service VARCHAR(100) NOT NULL,
  budget VARCHAR(100) NOT NULL,
  message TEXT NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- 3. Security Policy Note:
-- NO public policies are created.
-- With RLS enabled and zero policies defined, public/anon access is completely blocked (cannot SELECT, INSERT, UPDATE, or DELETE).
-- Only the server-side code using the Supabase Service Role Key can read and write to this table.
