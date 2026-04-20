create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null,
  status text not null default 'new',
  responsible_name text,
  email text,
  phone text,
  company_name text,
  website text,
  data jsonb not null default '{}'::jsonb,
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_lead_type_idx on public.leads (lead_type);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "public_can_insert_leads" on public.leads;
create policy "public_can_insert_leads" on public.leads for insert to anon, authenticated with check (true);

drop policy if exists "auth_select_leads" on public.leads;
create policy "auth_select_leads" on public.leads for select to authenticated using (true);

drop policy if exists "auth_update_leads" on public.leads;
create policy "auth_update_leads" on public.leads for update to authenticated using (true);

drop policy if exists "auth_delete_leads" on public.leads;
create policy "auth_delete_leads" on public.leads for delete to authenticated using (true);
