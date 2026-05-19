import type { RetargetingSegment } from "./types";

/** Match a pathname against retargeting segment definitions and return the first match. */
export function matchSegment(
  segments: RetargetingSegment[],
  pathname?: string,
): string | null {
  if (typeof window === "undefined") return null;
  const path = pathname ?? window.location.pathname;

  for (const segment of segments) {
    for (const pattern of segment.paths) {
      if (pattern.endsWith("*")) {
        if (path.startsWith(pattern.slice(0, -1))) return segment.name;
      } else if (path === pattern) {
        return segment.name;
      }
    }
  }
  return null;
}

/** React hook that returns the matched retargeting segment name for the current path. */
export function useRetargetingSegment(
  segments: RetargetingSegment[],
  pathname?: string,
): string | null {
  return matchSegment(segments, pathname);
}
