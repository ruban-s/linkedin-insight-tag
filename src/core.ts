import type { TrackOptions } from "./types";

const SCRIPT_URL = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
const SCRIPT_ID = "linkedin-insight-tag-script";

let debugEnabled = false;

function log(...args: unknown[]) {
  if (debugEnabled) console.log("[linkedin-insight-tag]", ...args);
}

/** Inject the LinkedIn Insight Tag script into the document head. */
export function injectScript(
  partnerId: string | string[],
  debug = false,
  onLoad?: () => void,
): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  debugEnabled = debug;
  const ids = Array.isArray(partnerId) ? partnerId : [partnerId];

  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  for (const id of ids) {
    if (!window._linkedin_data_partner_ids.includes(id)) {
      window._linkedin_data_partner_ids.push(id);
      log("registered partner ID:", id);
    }
  }

  if (!window.lintrk) {
    window.lintrk = Object.assign(
      (a: string, b: Record<string, string>) => {
        window.lintrk!.q!.push([a, b]);
        log("queued:", a, b);
      },
      { q: [] as unknown[][] },
    );
  }

  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = SCRIPT_URL;
  script.async = true;
  script.type = "text/javascript";
  if (onLoad) {
    script.onload = () => {
      log("CDN script loaded");
      onLoad();
    };
  }
  document.head.appendChild(script);
  log("script injected");
}

/** Fire a conversion event with optional value, currency, and dedup ID. */
export function trackEvent(
  conversionId: string,
  options?: TrackOptions,
): void {
  if (typeof window === "undefined" || !window.lintrk) return;

  const data: Record<string, string> = { conversion_id: conversionId };
  if (options?.eventId) data.event_id = options.eventId;
  if (options?.value !== undefined) data.value = String(options.value);
  if (options?.currency) data.currency = options.currency;
  if (options?.variant) data.variant = options.variant;

  window.lintrk("track", data);
  log("track:", data);
}

/** Set a page-level event ID for Conversions API deduplication. */
export function setPageEventId(eventId: string): void {
  if (typeof window === "undefined") return;
  window._linkedin_event_id = eventId;
  log("page event ID set:", eventId);
}

/** Check whether the LinkedIn CDN script has fully loaded. */
export function isLoaded(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.lintrk &&
    !window.lintrk.q
  );
}

/** Test whether the current pathname matches any excluded path patterns. */
export function isPathExcluded(excludePaths: string[]): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return excludePaths.some((pattern) => {
    if (pattern.endsWith("*")) {
      return path.startsWith(pattern.slice(0, -1));
    }
    return path === pattern;
  });
}

/** SHA-256 hash an email address for LinkedIn Matched Audiences. */
export async function hashEmail(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
