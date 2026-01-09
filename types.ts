
export enum DeviceType {
  PHONE = 'Phone (iOS/Android)',
  PC = 'PC (Windows/macOS)',
  TABLET = 'Tablet'
}

export enum TechNeed {
  REPAIRS = 'Troubleshooting & Repairs',
  SPEED = 'Performance & Speed',
  LEARNING = 'Learning & Basics',
  PRODUCTIVITY = 'AI & Productivity',
  SECURITY = 'Security & Privacy'
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  platform: string;
  link: string;
  category: string;
  icon: string;
}

export interface ToolMatchResponse {
  recommendations: Recommendation[];
}
