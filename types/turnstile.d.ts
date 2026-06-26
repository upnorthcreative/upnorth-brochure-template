// Global type declarations for the Cloudflare Turnstile widget JS API.
// Loaded via <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />

interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "flexible" | "compact";
  language?: string;
  tabindex?: number;
}

interface Turnstile {
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

declare global {
  interface Window {
    turnstile: Turnstile;
  }
}

export {};
