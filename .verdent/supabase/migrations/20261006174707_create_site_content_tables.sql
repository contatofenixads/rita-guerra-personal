-- Conteúdo dinâmico do site (Rita Guerra — Personal Trainer)
create table if not exists public.depoimentos (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'home' check (page in ('home', 'verao')),
  quote text not null,
  who text not null default 'Aluna do acompanhamento',
  ordem int not null default 0,
  publicado boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists public.resultados (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'home' check (page in ('home', 'verao')),
  imagem_ref text not null,
  alt text not null default '',
  legenda text not null default '',
  ordem int not null default 0,
  publicado boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists public.faq_itens (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'home' check (page in ('home', 'verao')),
  pergunta text not null,
  resposta text not null,
  ordem int not null default 0,
  publicado boolean not null default true,
  criado_em timestamptz not null default now()
);

create table if not exists public.site_config (
  chave text primary key,
  valor text not null,
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_depoimentos_ordem on public.depoimentos (page, publicado, ordem);
create index if not exists idx_resultados_ordem on public.resultados (page, publicado, ordem);
create index if not exists idx_faq_itens_ordem on public.faq_itens (page, publicado, ordem);

alter table public.depoimentos enable row level security;
alter table public.resultados enable row level security;
alter table public.faq_itens enable row level security;
alter table public.site_config enable row level security;

drop policy if exists "leitura publica de depoimentos publicados" on public.depoimentos;
create policy "leitura publica de depoimentos publicados" on public.depoimentos
  for select to anon, authenticated using (publicado = true);

drop policy if exists "leitura publica de resultados publicados" on public.resultados;
create policy "leitura publica de resultados publicados" on public.resultados
  for select to anon, authenticated using (publicado = true);

drop policy if exists "leitura publica de faq publicadas" on public.faq_itens;
create policy "leitura publica de faq publicadas" on public.faq_itens
  for select to anon, authenticated using (publicado = true);

drop policy if exists "leitura publica de configuracao" on public.site_config;
create policy "leitura publica de configuracao" on public.site_config
  for select to anon, authenticated using (true);