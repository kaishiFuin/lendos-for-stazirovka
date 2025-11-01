export {}; // ensures this file is treated as a module

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    appConfig?: {
      abVariants?: string[];
    };
  }
}
