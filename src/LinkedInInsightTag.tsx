import { useEffect, useRef } from "react";
import type { LinkedInInsightTagProps } from "./types";
import { injectScript, isPathExcluded } from "./core";

/** React component that loads the LinkedIn Insight Tag with GDPR consent and path exclusion support. */
export function LinkedInInsightTag({
  partnerId,
  noscript = true,
  consent = true,
  debug = false,
  onLoad,
  excludePaths,
}: LinkedInInsightTagProps) {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!consent) return;
    if (injectedRef.current) return;
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    if (excludePaths && isPathExcluded(excludePaths)) return;

    injectedRef.current = true;
    injectScript(partnerId, debug, onLoad);
  }, [partnerId, consent, debug, onLoad, excludePaths]);

  if (!consent || !noscript) return null;
  if (typeof window !== "undefined" && excludePaths && isPathExcluded(excludePaths))
    return null;

  const ids = Array.isArray(partnerId) ? partnerId : [partnerId];

  return (
    <noscript>
      {ids.map((id) => (
        <img
          key={id}
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${id}&fmt=gif`}
        />
      ))}
    </noscript>
  );
}
