import { useEffect, useRef } from "react";
import type { UseLinkedInPageViewOptions } from "./types";

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

    if (window.lintrk) {
      window.lintrk("track", { conversion_id: conversionId });
    }
  }, [conversionId, pathname]);
}
