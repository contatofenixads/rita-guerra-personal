import { useEffect } from 'react';

/**
 * Envia eventos do Meta Pixel de forma segura.
 *
 * O Pixel base é carregado em index.html. Este hook:
 * - evita PageView duplicado em SPA (o base já dispara no carregamento inicial);
 * - dispara PageView manualmente quando a rota/hash muda;
 * - dispara eventos personalizados via fbq('trackCustom') quando apropriado.
 */

export type PixelEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | string;

declare global {
  interface Window {
    fbq?: (
      command: 'track' | 'trackCustom',
      event: PixelEvent,
      params?: Record<string, unknown>,
    ) => void;
    _fbq?: unknown;
  }
}

export function fbqSafe(command: 'track' | 'trackCustom', event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(command, event, params);
  }
}

export function usePixelRouteTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastRoute = '';

    const trackIfChanged = () => {
      const route = window.location.hash || '/';
      if (route === lastRoute) return;
      lastRoute = route;
      fbqSafe('track', 'PageView');
    };

    // Rastreia mudanças de hash (SPA com hash router)
    window.addEventListener('hashchange', trackIfChanged);

    // Também verifica após possíveis mudanças programáticas de location
    const popstateHandler = () => trackIfChanged();
    window.addEventListener('popstate', popstateHandler);

    return () => {
      window.removeEventListener('hashchange', trackIfChanged);
      window.removeEventListener('popstate', popstateHandler);
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
