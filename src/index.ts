export { LinkedInInsightTag } from "./LinkedInInsightTag";
export { LinkedInTag } from "./LinkedInTag";
export { useLinkedInTracking } from "./useLinkedInTracking";
export { useLinkedInPageView } from "./useLinkedInPageView";
export {
  trackPurchase,
  trackSignup,
  trackFormSubmit,
  trackDownload,
  trackLead,
  hashEmail,
} from "./events";
export { injectScript, setPageEventId, isLoaded, isPathExcluded, trackEvent } from "./core";
export { matchSegment, useRetargetingSegment } from "./retargeting";
export type {
  LinkedInInsightTagProps,
  LinkedInTagConfig,
  LinkedInTrackingOptions,
  TrackOptions,
  UseLinkedInPageViewOptions,
  RetargetingSegment,
} from "./types";
