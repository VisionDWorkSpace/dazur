-- Create leads table for CRM
-- Stores all lead submissions from /for-businesses (Company + Asset), /for-investors, and /tech-venture

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('business_company', 'business_asset', 'investor', 'tech_venture')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),

  -- Contact info (common fields extracted for easy filtering)
  responsible_name text,
  email text,
  phone text,
  company_name text,
  website text,

  -- All form data stored as JSON for flexibility per form type
  data jsonb not null default '{}'::jsonb,

  -- Internal notes
  notes text default '',

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists leads_lead_type_idx on public.leads (lead_type);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

-- Enable RLS
alter table public.leads enable row level security;

-- Anyone can INSERT a lead (public form submissions)
drop policy if exists "public_can_insert_leads" on public.leads;
create policy "public_can_insert_leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users (admins) can SELECT, UPDATE, DELETE
drop policy if exists "authenticated_can_select_leads" on public.leads;
create policy "authenticated_can_select_leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "authenticated_can_update_leads" on public.leads;
create policy "authenticated_can_update_leads"
  on public.leads for update
  to authenticated
  using (true);

drop policy if exists "authenticated_can_delete_leads" on public.leads;
create policy "authenticated_can_delete_leads"
  on public.leads for delete
  to authenticated
  using (true);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();
