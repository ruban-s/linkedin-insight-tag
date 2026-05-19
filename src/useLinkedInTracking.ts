import { useCallback } from "react";
import { trackEvent } from "./core";
import type { TrackOptions } from "./types";

/** React hook providing memoized conversion tracking methods. */
export function useLinkedInTracking() {
  const track = useCallback(
    (conversionId: string, options?: TrackOptions) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  const trackPurchase = useCallback(
    (
      conversionId: string,
      options: { value: number; currency: string } & TrackOptions,
    ) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  const trackSignup = useCallback(
    (conversionId: string, options?: TrackOptions) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  const trackFormSubmit = useCallback(
    (conversionId: string, options?: TrackOptions) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  const trackLead = useCallback(
    (conversionId: string, options?: TrackOptions) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  const trackDownload = useCallback(
    (conversionId: string, options?: TrackOptions) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  return { track, trackPurchase, trackSignup, trackFormSubmit, trackLead, trackDownload };
}
