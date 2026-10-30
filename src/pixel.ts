import { useEffect } from 'react';

/**
 * Integração segura com o Meta Pixel (Facebook).
 *
 * O script base é injetado em index.html. Esta camada garante:
 * - inicialização com Pixel ID assim que `fbq` estiver pronto;
 * - PageView no carregamento inicial e em navegações SPA (hash router);
 * - disparo de eventos padrão sem erros se o script estiver bloqueado.
 */

export type PixelEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | string;

declare global {
  interface Window {
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      eventOrId: PixelEvent | string,
      params?: Record<string, unknown>,
    ) => void;
    _fbq?: unknown;
  }
}

const PIXEL_ID = '1105772998891868';

/**
 * Aguarda até `window.fbq` existir (máx 5s), executa callback e retorna cleanup.
 */
function waitForFbq(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  if (typeof window.fbq === 'function' && window.fbq !== undefined) {
    callback();
    return () => {};
  }

  let timeout: number | null = null;
  let interval: number | null = null;
  let cleaned = false;

  const clean = () => {
    if (cleaned) return;
    cleaned = true;
    if (interval) window.clearInterval(interval);
    if (timeout) window.clearTimeout(timeout);
  };

  interval = window.setInterval(() => {
    if (typeof window.fbq === 'function') {
      clean();
      callback();
    }
  }, 100);

  timeout = window.setTimeout(() => {
    clean();
    // Última tentativa; se fbq ainda não carregou, provavelmente está bloqueado.
    if (typeof window.fbq === 'function') callback();
  }, 5000);

  return clean;
}

export function fbqSafe(
  command: 'init' | 'track' | 'trackCustom',
  eventOrId: PixelEvent | string,
  params?: Record<string, unknown>,
) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq(command, eventOrId, params);
}

export function usePixelRouteTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastRoute = '';
    let cleanup: (() => void) | null = null;

    const trackPageView = () => {
      const route = window.location.hash || '/';
      if (route === lastRoute) return;
      lastRoute = route;
      fbqSafe('track', 'PageView');
    };

    cleanup = waitForFbq(() => {
      fbqSafe('init', PIXEL_ID);
      trackPageView();
    });

    const handleHashChange = () => trackPageView();
    const handlePopState = () => trackPageView();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
      if (cleanup) cleanup();
    };
  }, []);
}

export function usePixelEvent(event: PixelEvent, params?: Record<string, unknown>) {
  useEffect(() => {
    const cleanup = waitForFbq(() => fbqSafe('track', event, params));
    return cleanup;
  }, []);
}

export function usePixelViewContent(params?: Record<string, unknown>) {
  usePixelEvent('ViewContent', params);
}

export function trackPixelEvent(event: PixelEvent, params?: Record<string, unknown>) {
  fbqSafe('track', event, params);
}
