import type { LeaderboardEntry, ScorerEntry } from "../types";

const API_KEY = import.meta.env.VITE_SHEETS_API_KEY as string;
const SHEET_ID = import.meta.env.VITE_SHEET_ID as string;

async function fetchSheet(range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet data: ${res.status}`);
  }
  const data = await res.json();
  return data.values ?? [];
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const rows = await fetchSheet("Leaderboard!A2:I");
  return rows.map((row) => ({
    position: parseInt(row[0] ?? "0", 10),
    name: row[2] ?? "",
    points: parseInt(row[3] ?? "0", 10),
    munsterWinner: row[4] ?? "",
    leinsterWinner: row[5] ?? "",
    topScorerMunster: row[6] ?? "",
    topScorerLeinster: row[7] ?? "",
  }));
}

export async function fetchMunsterScorers(): Promise<ScorerEntry[]> {
  const rows = await fetchSheet("Top Scorers Munster!A3:Z");
  return rows.map((row) => ({
    player: row[0] ?? "",
    county: row[1] ?? "",
    totalPoints: row[2] ?? "",
    games: row.slice(3, -1),
    final: row[row.length - 1] ?? "",
  }));
}

export async function fetchLeinsterScorers(): Promise<ScorerEntry[]> {
  const rows = await fetchSheet("Top Scorers Leinster!A3:Z");
  return rows.map((row) => ({
    player: row[0] ?? "",
    county: row[1] ?? "",
    totalPoints: row[2] ?? "",
    games: row.slice(3, -1),
    final: row[row.length - 1] ?? "",
  }));
}
