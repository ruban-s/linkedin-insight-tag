import type { RetargetingSegment } from "./types";

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

export function useRetargetingSegment(
  segments: RetargetingSegment[],
  pathname?: string,
): string | null {
  return matchSegment(segments, pathname);
}
