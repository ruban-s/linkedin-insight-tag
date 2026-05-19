import { useEffect, useRef } from "react";
import type { UseLinkedInPageViewOptions } from "./types";
import { trackEvent } from "./core";

export function useLinkedInPageView({
  conversionId,
  pathname,
}: UseLinkedInPageViewOptions) {
  const previousPathnameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPathname =
      pathname ?? (typeof location !== "undefined" ? location.pathname : "");

    if (previousPathnameRef.current === currentPathname) return;
    previousPathnameRef.current = currentPathname;

    trackEvent(conversionId);
  }, [conversionId, pathname]);
}
