import type { LinkedInTagConfig } from "./types";
import { injectScript, trackEvent, isLoaded } from "./core";

export const LinkedInTag = {
  init(config: LinkedInTagConfig): void {
    injectScript(config.partnerId, config.debug);
  },

  track(
    conversionId: string,
    options?: { eventId?: string; value?: number; currency?: string },
  ): void {
    trackEvent(conversionId, options);
  },

  isLoaded,
};
