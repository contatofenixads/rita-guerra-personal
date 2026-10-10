import { useCallback, useEffect, useRef, useState } from 'react';
import { WHATSAPP_URL } from './config';

/* ---------- ícones (stroke, arredondados) ---------- */

export const Icon = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.1 14.9l-.5-.3-2.9.8.8-2.8-.3-.5A8 8 0 0 1 12 4Zm-3.1 4.2c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.6 8.6c-.2-.4-.4-.4-.7-.4Z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H4l2.2-2.6A8 8 0 1 1 21 12Z" />
      <path d="M8.5 10.5h7M8.5 13.5h4" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="13" height="12" rx="3" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  ),
  adjust: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.5 13.6 12 21l-7.5-7.4A5.2 5.2 0 1 1 12 6.3a5.2 5.2 0 1 1 7.5 7.3Z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2 2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.9 5.9 20.4l1.5-6.8L2.2 9l6.9-.7Z" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
};

/* ---------- roteador por hash (#/rota) ---------- */

export type Route = { page: string; anchor: string };

export function parseHash(): Route {
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    const [page, anchor = ''] = hash.slice(2).split('#');
    return { page, anchor };
  }
  return { page: '', anchor: '' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export function hrefTo(page: string, anchor = ''): string {
  return anchor ? `#/${page}#${anchor}` : `#/${page}`;
}

/* ---------- blocos de apoio ---------- */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function CtaPrimary({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={`btn btn-primary ${className}`} href={href}>
      {children}
    </a>
  );
}

export function CtaWhats({ label = 'Falar com a Rita no WhatsApp', className = '' }: { label?: string; className?: string }) {
  const external = WHATSAPP_URL.startsWith('http');
  return (
    <a
      className={`btn btn-whats ${className}`}
      href={WHATSAPP_URL}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <span className="btn-whats-ic">{Icon.whatsapp}</span>
      {label}
    </a>
  );
}

/**
 * Prova social compacta usada ao longo da jornada (não é uma seção inteira).
 * As citações são transcrições literais dos feedbacks do Drive — não alterar o sentido.
 */
export function MiniDepo({ quote, who = 'Aluna do acompanhamento' }: { quote: string; who?: string }) {
  return (
    <figure className="mini-depo">
      <span className="mini-depo-stars" aria-hidden="true">
        {Icon.star}
        {Icon.star}
        {Icon.star}
        {Icon.star}
        {Icon.star}
      </span>
      <blockquote>“{quote}”</blockquote>
      <figcaption>{who}</figcaption>
    </figure>
  );
}

/**
 * Carrossel infinito automático (esteira contínua da direita para a esquerda).
 * - Loop perfeito: a faixa contém dois grupos idênticos e anima até -50%.
 * - Pausa no hover (desktop) via animation-play-state.
 * - prefers-reduced-motion: animação desativada, cards estáticos em grade.
 * - duration: tempo de um ciclo completo (quanto maior, mais lento).
 */
export function Marquee({
  children,
  duration = '70s',
  className = '',
  label,
}: {
  children: React.ReactNode;
  duration?: string;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`marquee ${className}`}
      style={{ '--marquee-dur': duration } as React.CSSProperties}
      role="region"
      aria-label={label}
    >
      <div className="marquee-track">
        <div className="marquee-group" role="list">
          {children}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Carrossel MANUAL (sem autoplay): o controle é 100% da visitante.
 * - Desktop: arrastar com o mouse, setas laterais e scroll horizontal.
 * - Celular: gesto de arrastar com o dedo (scroll nativo + scroll-snap).
 * - Movimento acompanha o ponteiro e para no card mais próximo.
 */
export function Carousel({
  children,
  className = '',
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const drag = useRef({ ativo: false, x: 0, esq: 0, moveu: false });

  const atualizar = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    atualizar();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    return () => {
      el.removeEventListener('scroll', atualizar);
      window.removeEventListener('resize', atualizar);
    };
  }, [atualizar, children]);

  const larguraPasso = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>(':scope > *');
    const gap = 20;
    return card ? card.getBoundingClientRect().width + gap : el.clientWidth;
  };

  const rolarSuave = (esq: number) => {
    const el = trackRef.current;
    if (!el) return;
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: esq, behavior: reduz ? 'auto' : 'smooth' });
  };

  const passo = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const largura = larguraPasso();
    if (!largura) return;
    const alvo = Math.round(el.scrollLeft / largura) * largura + dir * largura;
    rolarSuave(alvo);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { ativo: true, x: e.clientX, esq: el.scrollLeft, moveu: false };
    el.style.scrollSnapType = 'none';
    el.classList.add('is-dragging');
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.ativo) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moveu = true;
    el.scrollLeft = drag.current.esq - dx;
  };

  const fimDrag = () => {
    const el = trackRef.current;
    if (!el || !drag.current.ativo) return;
    drag.current.ativo = false;
    el.classList.remove('is-dragging');
    el.style.scrollSnapType = '';
    if (drag.current.moveu) {
      const largura = larguraPasso();
      if (largura) rolarSuave(Math.round(el.scrollLeft / largura) * largura);
    }
  };

  return (
    <div className={`carousel ${className}`} role="region" aria-label={label}>
      <div
        className="carousel-track"
        ref={trackRef}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={fimDrag}
        onPointerCancel={fimDrag}
      >
        {children}
      </div>
      <button
        type="button"
        className="carousel-btn carousel-btn--prev"
        onClick={() => passo(-1)}
        disabled={!canPrev}
        aria-label="Ver anteriores"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
      <button
        type="button"
        className="carousel-btn carousel-btn--next"
        onClick={() => passo(1)}
        disabled={!canNext}
        aria-label="Ver próximos"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
