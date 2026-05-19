import { useEffect, useRef, type ComponentType } from "react";
import type { LinkedInInsightTagProps } from "./types";
import { isPathExcluded } from "./core";

const SCRIPT_URL = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

interface NextScriptProps {
  id?: string;
  src: string;
  strategy?: "afterInteractive" | "lazyOnload" | "beforeInteractive" | "worker";
  onLoad?: () => void;
}

export function LinkedInInsightScript({
  partnerId,
  noscript = true,
  consent = true,
  debug = false,
  onLoad,
  excludePaths,
  ScriptComponent,
}: LinkedInInsightTagProps & { ScriptComponent: ComponentType<NextScriptProps> }) {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!consent) return;
    if (injectedRef.current) return;
    if (typeof window === "undefined") return;
    if (excludePaths && isPathExcluded(excludePaths)) return;

    injectedRef.current = true;

    const ids = Array.isArray(partnerId) ? partnerId : [partnerId];
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    for (const id of ids) {
      if (!window._linkedin_data_partner_ids.includes(id)) {
        window._linkedin_data_partner_ids.push(id);
      }
    }

    if (!window.lintrk) {
      window.lintrk = Object.assign(
        (a: string, b: Record<string, string>) => {
          window.lintrk!.q!.push([a, b]);
          if (debug) console.log("[linkedin-insight-tag]", "queued:", a, b);
        },
        { q: [] as unknown[][] },
      );
    }
  }, [partnerId, consent, debug, excludePaths]);

  if (!consent) return null;
  if (typeof window !== "undefined" && excludePaths && isPathExcluded(excludePaths))
    return null;

  const ids = Array.isArray(partnerId) ? partnerId : [partnerId];
  const Script = ScriptComponent;

  return (
    <>
      <Script
        id="linkedin-insight-tag-script"
        src={SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={onLoad}
      />
      {noscript &&
        ids.map((id) => (
          <noscript key={id}>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${id}&fmt=gif`}
            />
          </noscript>
        ))}
    </>
  );
}
