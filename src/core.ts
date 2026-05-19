const SCRIPT_URL = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
const SCRIPT_ID = "linkedin-insight-tag-script";

let debugEnabled = false;

function log(...args: unknown[]) {
  if (debugEnabled) console.log("[linkedin-insight-tag]", ...args);
}

export function injectScript(
  partnerId: string | string[],
  debug = false,
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
  document.head.appendChild(script);
  log("script injected");
}

export function trackEvent(
  conversionId: string,
  options?: { eventId?: string; value?: number; currency?: string },
): void {
  if (typeof window === "undefined" || !window.lintrk) return;

  const data: Record<string, string> = { conversion_id: conversionId };
  if (options?.eventId) data.event_id = options.eventId;
  if (options?.value !== undefined) data.value = String(options.value);
  if (options?.currency) data.currency = options.currency;

  window.lintrk("track", data);
  log("track:", data);
}

export function isLoaded(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.lintrk &&
    !window.lintrk.q
  );
}
