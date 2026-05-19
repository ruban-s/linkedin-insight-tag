import { useCallback } from "react";

export function useLinkedInTracking() {
  const track = useCallback((conversionId: string) => {
    if (typeof window !== "undefined" && window.lintrk) {
      window.lintrk("track", { conversion_id: conversionId });
    }
  }, []);

  return { track };
}
