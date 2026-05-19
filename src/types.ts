export interface LinkedInInsightTagProps {
  partnerId: string | string[];
  noscript?: boolean;
  consent?: boolean;
  debug?: boolean;
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
