# linkedin-insight-tag

Lightweight React component and hook for LinkedIn Insight Tag with TypeScript support, SSR safety, and SPA route tracking.

## Install

```bash
npm install linkedin-insight-tag
```

```bash
yarn add linkedin-insight-tag
```

```bash
pnpm add linkedin-insight-tag
```

## Quick Start

Add the component once in your app root (e.g., `App.tsx` or `layout.tsx`):

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

This injects the LinkedIn tracking script and renders a noscript fallback pixel.

## Conversion Tracking

Use the `useLinkedInTracking` hook to fire conversion events:

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

## SPA Page View Tracking

Track page views on route changes in single-page apps:

```tsx
import { useLinkedInPageView } from "linkedin-insight-tag";
import { useLocation } from "react-router-dom";

function PageViewTracker() {
  const { pathname } = useLocation();

  useLinkedInPageView({
    conversionId: "YOUR_PAGE_VIEW_CONVERSION_ID",
    pathname,
  });

  return null;
}
```

## API Reference

### `<LinkedInInsightTag />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `partnerId` | `string` | *required* | Your LinkedIn Partner ID |
| `noscript` | `boolean` | `true` | Render noscript img fallback |

### `useLinkedInTracking()`

Returns `{ track }` where `track(conversionId: string)` fires a LinkedIn conversion event.

### `useLinkedInPageView(options)`

| Option | Type | Description |
|--------|------|-------------|
| `conversionId` | `string` | Conversion ID for page view events |
| `pathname` | `string?` | Current route pathname. Pass from your router to trigger on navigation. |

## SSR / Next.js

All browser APIs are guarded with `typeof window` checks. Safe to use in Next.js App Router or Pages Router, Remix, Gatsby, or any SSR framework. Place `<LinkedInInsightTag />` in your root layout.

## License

MIT
