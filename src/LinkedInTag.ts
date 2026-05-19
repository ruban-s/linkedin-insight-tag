import type { LinkedInTagConfig, TrackOptions } from "./types";
import {
  injectScript,
  trackEvent,
  setPageEventId,
  isLoaded,
  hashEmail,
} from "./core";
import { matchSegment } from "./retargeting";

export const LinkedInTag = {
  /** Initialize the LinkedIn Insight Tag with partner ID and options. */
  init(config: LinkedInTagConfig): void {
    injectScript(config.partnerId, config.debug, config.onLoad);
  },

  /** Fire a conversion event with optional tracking options. */
  track(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  /** Track a purchase conversion with value and currency. */
  trackPurchase(
    conversionId: string,
    options: { value: number; currency: string } & TrackOptions,
  ): void {
    trackEvent(conversionId, options);
  },

  /** Track a signup conversion event. */
  trackSignup(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  /** Track a form submission conversion event. */
  trackFormSubmit(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  /** Track a lead generation conversion event. */
  trackLead(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  /** Track a content download conversion event. */
  trackDownload(conversionId: string, options?: TrackOptions): void {
    trackEvent(conversionId, options);
  },

  setPageEventId,
  isLoaded,
  hashEmail,
  matchSegment,
};
