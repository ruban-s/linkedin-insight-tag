# linkedin-insight-tag

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

### Debug Mode

```tsx
<LinkedInInsightTag partnerId="123456" debug />
```

Logs all tracking calls to console: `[linkedin-insight-tag] track: { conversion_id: "..." }`

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

### With Value and Currency

```tsx
track("PURCHASE_CONV_ID", { value: 99.99, currency: "USD" });
```

### With Event ID (for CAPI Deduplication)

```tsx
track("CONV_ID", { eventId: "unique-event-id-123" });
```

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

## Imperative API (Vanilla JS / Vue / Svelte / Any Framework)

```ts
import { LinkedInTag } from "linkedin-insight-tag";

// Initialize
LinkedInTag.init({ partnerId: "123456", debug: true });

// Track conversions
LinkedInTag.track("CONV_ID");
LinkedInTag.track("CONV_ID", { value: 49.99, currency: "EUR" });
LinkedInTag.track("CONV_ID", { eventId: "dedup-id-123" });

// Check if CDN script loaded
LinkedInTag.isLoaded(); // boolean
```

## API Reference

### `<LinkedInInsightTag />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `partnerId` | `string \| string[]` | *required* | LinkedIn Partner ID(s) |
| `noscript` | `boolean` | `true` | Render noscript img fallback |
| `consent` | `boolean` | `true` | Defer loading until `true` (GDPR) |
| `debug` | `boolean` | `false` | Log tracking calls to console |

### `useLinkedInTracking()`

Returns `{ track }`:

```ts
track(conversionId: string, options?: {
  eventId?: string;   // for CAPI deduplication
  value?: number;     // conversion value
  currency?: string;  // ISO currency code
})
```

### `useLinkedInPageView(options)`

| Option | Type | Description |
|--------|------|-------------|
| `conversionId` | `string` | Conversion ID for page view events |
| `pathname` | `string?` | Current route pathname |

### `LinkedInTag` (Imperative)

| Method | Description |
|--------|-------------|
| `init(config)` | Inject script and register partner ID(s) |
| `track(id, opts?)` | Fire conversion event |
| `isLoaded()` | Check if CDN script has fully loaded |

## SSR / Next.js

All browser APIs guarded with `typeof window` checks. Safe in Next.js, Remix, Gatsby, or any SSR framework.

## License

MIT
