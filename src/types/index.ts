export interface LeaderboardEntry {
  position: number;
  name: string;
  points: number;
  munsterWinner: string;
  leinsterWinner: string;
  topScorerMunster: string;
  topScorerLeinster: string;
}

export interface ScorerEntry {
  player: string;
  county: string;
  totalDisplay: string;
  totalNumeric: number;
  games: string[];
  final: string;
}

export interface ScorerResult {
  entries: ScorerEntry[];
  gameHeaders: string[];
}

export type Tab = "leaderboard" | "munster" | "leinster";
