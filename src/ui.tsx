import { useEffect, useState } from 'react';
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
