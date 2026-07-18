export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  isBanned: boolean;
  credits: number;
  isPremium: boolean;
  premiumUntil: string | null;
  joinedAt: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  originalImage: string;
  cleanedImage: string;
  removalsCount: number;
  processedAt: string;
  isSavedProject: boolean;
}

export interface SystemSettings {
  premiumEnabled: boolean;
  dailyFreeLimit: number;
  monthlyFreeLimit: number;
  premiumPrice: number;
  trialDays: number;
  adsEnabled: boolean;
  uploadLimitMB: number;
  adLocations: {
    sidebar: boolean;
    banner: boolean;
    interstitial: boolean;
  };
  homepageHeroTitle: string;
  logoUrl: string;
  hasGeminiKey?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ServerLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warn' | 'error' | 'security';
  message: string;
}

export interface DetectedElement {
  label: string;
  description: string;
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface Advertisement {
  id: string;
  name: string;
  type: 'banner' | 'responsive' | 'image' | 'html' | 'adsense' | 'third_party' | 'affiliate';
  contentCode: string;
  imageUrl: string;
  destinationUrl: string;
  placement: 'homepage' | 'article' | 'sidebar' | 'header' | 'footer' | 'between_content' | 'popup';
  priority: number;
  enabled: boolean;
  startDate: string | null;
  endDate: string | null;
  impressions: number;
  clicks: number;
  deviceTarget?: 'all' | 'desktop' | 'mobile';
  geoTarget?: string;
  abTestGroup?: 'none' | 'A' | 'B';
}
