export interface FocusCardData {
  id: string;
  title: string;
  summary: string;
  details: string;
  skills: string[];
  projects: string[];
}

export type SlothState = 'idle' | 'track' | 'wander' | 'sleep' | 'snack';
