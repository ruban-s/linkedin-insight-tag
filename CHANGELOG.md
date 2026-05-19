# Changelog

## 1.3.0

- Next.js `<LinkedInInsightScript>` component using `next/script` with `afterInteractive` strategy
- A/B variant tracking via `variant` option in track calls
- Retargeting segment helper (`matchSegment`, `useRetargetingSegment`)
- Test suite with Node.js test runner
- CHANGELOG added

## 1.2.0

- Event helpers: `trackPurchase`, `trackSignup`, `trackFormSubmit`, `trackLead`, `trackDownload`
- `hashEmail()` SHA-256 utility for LinkedIn Matched Audiences
- `excludePaths` prop to skip sensitive pages per LinkedIn's terms
- `onLoad` callback fires when CDN script fully loads
- `setPageEventId()` for page load CAPI deduplication

## 1.1.0

- GDPR consent mode — `consent` prop defers script loading
- Multiple partner IDs — `partnerId` accepts `string[]`
- `LinkedInTag` imperative API for vanilla JS / Vue / Svelte
- Debug mode — `debug` prop logs all tracking calls
- Conversion value and currency support
- Event ID support for CAPI deduplication
- Shared core module

## 1.0.2

- Fix: add `lintrk` queue setup before CDN script load

## 1.0.1

- Update author and repository URL

## 1.0.0

- Initial release
- `<LinkedInInsightTag>` React component
- `useLinkedInTracking` hook
- `useLinkedInPageView` hook for SPA route tracking
- SSR-safe, zero dependencies
