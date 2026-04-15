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
  totalPoints: string;
  games: string[];
  final: string;
}

export type Tab = "leaderboard" | "munster" | "leinster";
