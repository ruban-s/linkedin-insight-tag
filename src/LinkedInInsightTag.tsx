import { useEffect, useRef } from "react";
import type { LinkedInInsightTagProps } from "./types";

const SCRIPT_URL = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
const SCRIPT_ID = "linkedin-insight-tag-script";

export function LinkedInInsightTag({
  partnerId,
  noscript = true,
}: LinkedInInsightTagProps) {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    injectedRef.current = true;

    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    if (!window._linkedin_data_partner_ids.includes(partnerId)) {
      window._linkedin_data_partner_ids.push(partnerId);
    }

    if (!window.lintrk) {
      window.lintrk = Object.assign(
        (a: string, b: Record<string, string>) => {
          window.lintrk!.q!.push([a, b]);
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
  }, [partnerId]);

  if (!noscript) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`}
      />
    </noscript>
  );
}
