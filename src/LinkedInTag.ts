import type { LinkedInTagConfig, TrackOptions } from "./types";
import {
  injectScript,
  trackEvent,
  setPageEventId,
  isLoaded,
  hashEmail,
} from "./core";

export const LinkedInTag = {
  init(config: LinkedInTagConfig): void {
    injectScript(config.partnerId, config.debug, config.onLoad);
  },

  track(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  trackPurchase(
    conversionId: string,
    options: { value: number; currency: string } & TrackOptions,
  ): void {
    trackEvent(conversionId, options);
  },

  trackSignup(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  trackFormSubmit(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  trackLead(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  trackDownload(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  setPageEventId,
  isLoaded,
  hashEmail,
};
