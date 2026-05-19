import { useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import {
  LinkedInInsightTag,
  useLinkedInTracking,
  useLinkedInPageView,
} from "linkedin-insight-tag";

function App() {
  const [consent, setConsent] = useState(false);
  const { pathname } = useLocation();
  const { track, trackPurchase } = useLinkedInTracking();

  useLinkedInPageView({ conversionId: "page-view-001", pathname });

  return (
    <>
      <LinkedInInsightTag partnerId="12345678" consent={consent} />
      {!consent && (
        <button onClick={() => setConsent(true)}>Accept Cookies</button>
      )}
      <button onClick={() => track("signup-001")}>Sign Up</button>
      <button
        onClick={() =>
          trackPurchase("purchase-001", { value: 49.99, currency: "USD" })
        }
      >
        Buy Now
      </button>
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
