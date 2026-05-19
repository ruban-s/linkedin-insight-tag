export interface LinkedInInsightTagProps {
  partnerId: string | string[];
  noscript?: boolean;
  consent?: boolean;
  debug?: boolean;
  onLoad?: () => void;
  excludePaths?: string[];
}

export interface TrackOptions {
  eventId?: string;
  value?: number;
  currency?: string;
  variant?: string;
}

export interface LinkedInTrackingOptions {
  conversionId: string;
  eventId?: string;
  value?: number;
  currency?: string;
}

export interface UseLinkedInPageViewOptions {
  conversionId: string;
  pathname?: string;
}

export interface LinkedInTagConfig {
  partnerId: string | string[];
  debug?: boolean;
  onLoad?: () => void;
}

export interface RetargetingSegment {
  name: string;
  paths: string[];
}

declare global {
  interface Window {
    _linkedin_data_partner_ids?: string[];
    _linkedin_event_id?: string;
    lintrk?: ((action: string, data: Record<string, string>) => void) & {
      q?: unknown[][];
    };
  }
}
