import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase do site (conteúdo dinâmico público).
 *
 * A URL e a publishable key (anon) são configuração pública do navegador —
 * regra do projeto: podem viver no source. O acesso de escrita/edição é
 * feito pelo painel do Supabase (service role NUNCA vai para o front).
 */
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://supabase-api-prod.verdent.ai/p/pd621910a817772fc297a';

const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoyMTA2OTI3ODcxLCJpYXQiOjE3OTEzMDg2NzEsImlzcyI6InN1cGFiYXNlIiwicHJvamVjdF9yZWYiOiJwZDYyMTkxMGE4MTc3NzJmYzI5N2EiLCJyb2xlIjoiYW5vbiJ9.JCTz670QpxtwjhIZK98DRAG6WosnJyJLZILDtgGoZ3w';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
