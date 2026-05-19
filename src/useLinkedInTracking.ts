import { useCallback } from "react";
import { trackEvent } from "./core";

export function useLinkedInTracking() {
  const track = useCallback(
    (
      conversionId: string,
      options?: { eventId?: string; value?: number; currency?: string },
    ) => {
      trackEvent(conversionId, options);
    },
    [],
  );

  return { track };
}
