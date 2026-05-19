import { trackEvent, hashEmail } from "./core";
import type { TrackOptions } from "./types";

export function trackPurchase(
  conversionId: string,
  options: { value: number; currency: string } & TrackOptions,
): void {
  trackEvent(conversionId, options);
}

export function trackSignup(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

export function trackFormSubmit(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

export function trackDownload(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

export function trackLead(
  conversionId: string,
  options?: TrackOptions,
): void {
  trackEvent(conversionId, options);
}

export { hashEmail };
