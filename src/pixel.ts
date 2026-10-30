import { useEffect } from 'react';

/**
 * Integração segura com o Meta Pixel (Facebook).
 *
 * O script base e o PageView inicial são carregados em index.html.
 * Este arquivo fornece helpers para eventos adicionais e navegação SPA.
 */

export type PixelEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | string;

declare global {
  interface Window {
    fbq?: (
      command: 'track' | 'trackCustom',
      event: PixelEvent,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function fbqSafe(
  command: 'track' | 'trackCustom',
  event: PixelEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(command, event, params);
  }
}

/**
 * Dispara PageView em mudanças de rota (hash router).
 * O PageView inicial já é enviado pelo script em index.html.
 */
export function usePixelRouteTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastRoute = window.location.hash || '/';

    const trackIfChanged = () => {
      const route = window.location.hash || '/';
      if (route === lastRoute) return;
      lastRoute = route;
      fbqSafe('track', 'PageView');
    };

    window.addEventListener('hashchange', trackIfChanged);
    window.addEventListener('popstate', trackIfChanged);

    return () => {
      window.removeEventListener('hashchange', trackIfChanged);
      window.removeEventListener('popstate', trackIfChanged);
    };
  }, []);
}

export function usePixelEvent(event: PixelEvent, params?: Record<string, unknown>) {
  useEffect(() => {
    fbqSafe('track', event, params);
  }, []);
}

export function usePixelViewContent(params?: Record<string, unknown>) {
  usePixelEvent('ViewContent', params);
}

export function trackPixelEvent(event: PixelEvent, params?: Record<string, unknown>) {
  fbqSafe('track', event, params);
}
