import { useEffect, useState } from 'react';
import { supabase } from './db';

/**
 * Conteúdo dinâmico do site, vindo do Supabase.
 * Cada lista cai no fallback estático quando o banco não responde
 * ou não tem linhas publicadas — o site nunca quebra por causa do DB.
 */

export type Depoimento = { q: string; who: string };
export type Resultado = { imagemRef: string; alt: string; legenda: string };
export type FaqItem = { q: string; a: string };

export type SiteContent = {
  depoimentos: Depoimento[];
  resultados: Resultado[];
  faqHome: FaqItem[];
  faqVerao: FaqItem[];
  config: Record<string, string>;
  pronto: boolean;
};

const VAZIO: SiteContent = {
  depoimentos: [],
  resultados: [],
  faqHome: [],
  faqVerao: [],
  config: {},
  pronto: false,
};

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(VAZIO);

  useEffect(() => {
    let vivo = true;

    (async () => {
      const [deps, res, faq, cfg] = await Promise.all([
        supabase
          .from('depoimentos')
          .select('quote, who')
          .eq('publicado', true)
          .order('ordem'),
        supabase
          .from('resultados')
          .select('imagem_ref, alt, legenda')
          .eq('publicado', true)
          .order('ordem'),
        supabase
          .from('faq_itens')
          .select('page, pergunta, resposta')
          .eq('publicado', true)
          .order('ordem'),
        supabase.from('site_config').select('chave, valor'),
      ]);

      if (!vivo) return;

      const config: Record<string, string> = {};
      for (const row of cfg.data ?? []) config[row.chave] = row.valor;

      setContent({
        depoimentos: (deps.data ?? []).map((d) => ({ q: d.quote, who: d.who })),
        resultados: (res.data ?? []).map((r) => ({
          imagemRef: r.imagem_ref,
          alt: r.alt,
          legenda: r.legenda,
        })),
        faqHome: (faq.data ?? [])
          .filter((f) => f.page === 'home')
          .map((f) => ({ q: f.pergunta, a: f.resposta })),
        faqVerao: (faq.data ?? [])
          .filter((f) => f.page === 'verao')
          .map((f) => ({ q: f.pergunta, a: f.resposta })),
        config,
        pronto: true,
      });
    })();

    return () => {
      vivo = false;
    };
  }, []);

  return content;
}
