# linkedin-insight-tag

[![npm version](https://img.shields.io/npm/v/linkedin-insight-tag)](https://www.npmjs.com/package/linkedin-insight-tag)
[![npm downloads](https://img.shields.io/npm/dm/linkedin-insight-tag)](https://www.npmjs.com/package/linkedin-insight-tag)
[![license](https://img.shields.io/npm/l/linkedin-insight-tag)](https://github.com/ruban-s/linkedin-insight-tag/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/linkedin-insight-tag)](https://bundlephobia.com/package/linkedin-insight-tag)
[![CI](https://img.shields.io/github/actions/workflow/status/ruban-s/linkedin-insight-tag/ci.yml)](https://github.com/ruban-s/linkedin-insight-tag/actions/workflows/ci.yml)

Lightweight LinkedIn Insight Tag for React and vanilla JS. TypeScript-first, SSR-safe, zero dependencies.

## Install

```bash
npm install linkedin-insight-tag
# or
yarn add linkedin-insight-tag
# or
pnpm add linkedin-insight-tag
```

## React — Quick Start

Add the component once in your app root:

```tsx
import { LinkedInInsightTag } from "linkedin-insight-tag";

function App() {
  return (
    <>
      <LinkedInInsightTag partnerId="123456" />
      {/* your app */}
    </>
  );
}
```

### Multiple Partner IDs

```tsx
<LinkedInInsightTag partnerId={["123456", "789012"]} />
```

### GDPR Consent Mode

Defer script loading until user consents:

```tsx
const [consent, setConsent] = useState(false);

<LinkedInInsightTag partnerId="123456" consent={consent} />
<button onClick={() => setConsent(true)}>Accept Cookies</button>
```

No script loads, no cookies set, no noscript pixel rendered until `consent` is `true`.

### Sensitive Page Exclusion

Exclude health, financial, or other sensitive pages per LinkedIn's terms:

```tsx
<LinkedInInsightTag
  partnerId="123456"
  excludePaths={["/account/*", "/health/*", "/checkout/payment"]}
/>
```

Supports exact paths and wildcard prefix matching (`/admin/*` matches `/admin/users`).

### onLoad Callback

```tsx
<LinkedInInsightTag
  partnerId="123456"
  onLoad={() => console.log("LinkedIn pixel ready")}
/>
```

### Debug Mode

```tsx
<LinkedInInsightTag partnerId="123456" debug />
```

Logs all tracking calls: `[linkedin-insight-tag] track: { conversion_id: "..." }`

## Conversion Tracking

```tsx
import { useLinkedInTracking } from "linkedin-insight-tag";

function SignupButton() {
  const { track } = useLinkedInTracking();

  return (
    <button onClick={() => track("YOUR_CONVERSION_ID")}>
      Sign Up
    </button>
  );
}
```

### Event Helpers

Typed convenience methods for common conversion types:

```tsx
const { trackPurchase, trackSignup, trackFormSubmit, trackLead, trackDownload } =
  useLinkedInTracking();

trackPurchase("PURCHASE_ID", { value: 99.99, currency: "USD" });
trackSignup("SIGNUP_ID");
trackFormSubmit("FORM_ID");
trackLead("LEAD_ID", { value: 50, currency: "EUR" });
trackDownload("DOWNLOAD_ID");
```

### A/B Variant Tracking

Pass experiment variant data with any conversion:

```tsx
track("CONV_ID", { variant: "B" });
trackPurchase("CONV_ID", { value: 99, currency: "USD", variant: "checkout-v2" });
```

### With Event ID (CAPI Deduplication)

```tsx
track("CONV_ID", { eventId: "unique-event-id-123" });
```

### Page-Level Event ID

For page load conversion deduplication with LinkedIn's Conversions API:

```tsx
import { setPageEventId } from "linkedin-insight-tag";

setPageEventId("unique-page-load-id");
```

## Retargeting Segments

Define URL-based audience segments and match visitors:

```tsx
import { matchSegment, useRetargetingSegment } from "linkedin-insight-tag";

const segments = [
  { name: "high-intent", paths: ["/pricing", "/demo", "/contact"] },
  { name: "blog-readers", paths: ["/blog/*"] },
  { name: "product-interest", paths: ["/features/*", "/integrations/*"] },
];

// React hook
function MyComponent() {
  const { pathname } = useLocation();
  const segment = useRetargetingSegment(segments, pathname);
  // segment = "high-intent" | "blog-readers" | null
}

// Imperative
const segment = matchSegment(segments, "/pricing"); // "high-intent"
```

## Email Hashing

SHA-256 hash emails for LinkedIn Matched Audiences:

```tsx
import { hashEmail } from "linkedin-insight-tag";

const hashed = await hashEmail("user@example.com");
```

Auto-normalizes (trim + lowercase) before hashing.

## SPA Page View Tracking

```tsx
import { useLinkedInPageView } from "linkedin-insight-tag";
import { useLocation } from "react-router-dom";

function PageViewTracker() {
  const { pathname } = useLocation();
  useLinkedInPageView({ conversionId: "PAGE_VIEW_CONV_ID", pathname });
  return null;
}
```

## Next.js

Optimized component using `next/script` with `afterInteractive` strategy:

```tsx
import { LinkedInInsightScript } from "linkedin-insight-tag/next";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <LinkedInInsightScript
          partnerId="123456"
          ScriptComponent={Script}
        />
      </body>
    </html>
  );
}
```

## Imperative API (Vanilla JS / Vue / Svelte)

```ts
import { LinkedInTag } from "linkedin-insight-tag";

// Initialize
LinkedInTag.init({
  partnerId: "123456",
  debug: true,
  onLoad: () => console.log("ready"),
});

// Track conversions
LinkedInTag.track("CONV_ID");
LinkedInTag.trackPurchase("CONV_ID", { value: 49.99, currency: "EUR" });
LinkedInTag.trackSignup("CONV_ID");
LinkedInTag.trackFormSubmit("CONV_ID");
LinkedInTag.trackLead("CONV_ID");
LinkedInTag.trackDownload("CONV_ID");

// A/B testing
LinkedInTag.track("CONV_ID", { variant: "B" });

// CAPI deduplication
LinkedInTag.track("CONV_ID", { eventId: "dedup-id-123" });
LinkedInTag.setPageEventId("page-load-dedup-id");

// Retargeting
LinkedInTag.matchSegment(segments, "/pricing");

// Utilities
LinkedInTag.isLoaded();
const hashed = await LinkedInTag.hashEmail("user@example.com");
```

## API Reference

### `<LinkedInInsightTag />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `partnerId` | `string \| string[]` | *required* | LinkedIn Partner ID(s) |
| `noscript` | `boolean` | `true` | Render noscript img fallback |
| `consent` | `boolean` | `true` | Defer loading until `true` (GDPR) |
| `debug` | `boolean` | `false` | Log tracking calls to console |
| `onLoad` | `() => void` | — | Callback when CDN script loads |
| `excludePaths` | `string[]` | — | Paths where tag should not load |

### `useLinkedInTracking()`

Returns:

| Method | Signature |
|--------|-----------|
| `track` | `(conversionId, options?) => void` |
| `trackPurchase` | `(conversionId, { value, currency, ...opts }) => void` |
| `trackSignup` | `(conversionId, options?) => void` |
| `trackFormSubmit` | `(conversionId, options?) => void` |
| `trackLead` | `(conversionId, options?) => void` |
| `trackDownload` | `(conversionId, options?) => void` |

### `TrackOptions`

| Field | Type | Description |
|-------|------|-------------|
| `eventId` | `string?` | For CAPI deduplication |
| `value` | `number?` | Conversion value |
| `currency` | `string?` | ISO currency code |
| `variant` | `string?` | A/B test variant identifier |

### Standalone Functions

| Function | Description |
|----------|-------------|
| `setPageEventId(id)` | Set `window._linkedin_event_id` for page load dedup |
| `isLoaded()` | Check if CDN script has fully loaded |
| `hashEmail(email)` | SHA-256 hash (returns Promise) |
| `matchSegment(segments, pathname?)` | Match current path to retargeting segment |
| `useRetargetingSegment(segments, pathname?)` | React hook for segment matching |

### `LinkedInTag` (Imperative)

Full imperative API with all methods above plus `init(config)`.

## License

MIT
