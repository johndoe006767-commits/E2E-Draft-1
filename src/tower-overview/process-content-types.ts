export type TowerProcess = {
  id: string; title: string; group: string; purpose: string; cadence: string; purposeSummary: string; cadenceSummary: string;
  stages: {title: string; owner: string; detail: string; displayTitle: string; description: string; systems: string[]; challenges: string[]; challengeScope?: string}[];
  challenges: string[]; improvements: string[];
  loopFrom: number | null; loopTo: number | null; loopLabel: string;
  source: string; sourceFile: string; coverageNote?: string; flowNote?: string;
};
export type TowerContext = {label: string; text: string};
export type TowerContent = {
  name: string; organ: string; processes: TowerProcess[];
  // Editorial copy for the tower intro panel and the process picker. Every tower file carries its own.
  tagline?: string; pickerTitle?: string; pickerIntro?: string; context?: TowerContext[];
  // Derived by scripts/derive-tower-metrics.mjs from the tower's own processes.
  metrics?: {solutions: number; automated: number; ai: number};
  collaborators?: string[]; // tower ids
};
