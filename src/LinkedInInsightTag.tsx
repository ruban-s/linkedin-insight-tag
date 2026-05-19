import { useEffect, useRef } from "react";
import type { LinkedInInsightTagProps } from "./types";
import { injectScript } from "./core";

export function LinkedInInsightTag({
  partnerId,
  noscript = true,
  consent = true,
  debug = false,
}: LinkedInInsightTagProps) {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!consent) return;
    if (injectedRef.current) return;
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    injectedRef.current = true;
    injectScript(partnerId, debug);
  }, [partnerId, consent, debug]);

  if (!consent || !noscript) return null;

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
