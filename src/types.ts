export interface LinkedInInsightTagProps {
  partnerId: string;
  noscript?: boolean;
}

export interface LinkedInTrackingOptions {
  conversionId: string;
}

export interface UseLinkedInPageViewOptions {
  conversionId: string;
  pathname?: string;
}

declare global {
  interface Window {
    _linkedin_data_partner_ids?: string[];
    lintrk?: ((action: string, data: Record<string, string>) => void) & {
      q?: unknown[][];
    };
  }
}
