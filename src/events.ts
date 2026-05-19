import { trackEvent, hashEmail } from "./core";
import type { TrackOptions } from "./types";

/** Track a purchase conversion with value and currency. */
export function trackPurchase(
  conversionId: string,
  options: { value: number; currency: string } & TrackOptions,
): void {
  trackEvent(conversionId, options);
}

/** Track a signup conversion event. */
export function trackSignup(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

/** Track a form submission conversion event. */
export function trackFormSubmit(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

/** Track a content download conversion event. */
export function trackDownload(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

/** Track a lead generation conversion event. */
export function trackLead(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

/** SHA-256 hash an email address for LinkedIn Matched Audiences. */
export { hashEmail };
