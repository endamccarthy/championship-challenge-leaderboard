import { useState, useEffect } from "preact/hooks";
import type { Tab, LeaderboardEntry, ScorerEntry } from "./types";
import { Navbar } from "./components/Navbar";
import { LeaderboardTable } from "./components/LeaderboardTable";
import { ScorerTable } from "./components/ScorerTable";
import {
  dummyLeaderboard,
  dummyMunsterScorers,
  dummyLeinsterScorers,
} from "./data/dummy";
import {
  fetchLeaderboard,
  fetchMunsterScorers,
  fetchLeinsterScorers,
} from "./services/sheets";

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>("leaderboard");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [munsterScorers, setMunsterScorers] = useState<ScorerEntry[]>([]);
  const [leinsterScorers, setLeinsterScorers] = useState<ScorerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const useDummy =
      !import.meta.env.VITE_SHEETS_API_KEY || !import.meta.env.VITE_SHEET_ID;

    if (useDummy) {
      setLeaderboard(dummyLeaderboard);
      setMunsterScorers(dummyMunsterScorers);
      setLeinsterScorers(dummyLeinsterScorers);
      setLoading(false);
      return;
    }

    Promise.all([
      fetchLeaderboard(),
      fetchMunsterScorers(),
      fetchLeinsterScorers(),
    ])
      .then(([lb, ms, ls]) => {
        setLeaderboard(lb);
        setMunsterScorers(ms);
        setLeinsterScorers(ls);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setError("Unable to load data. Showing sample data.");
        setLeaderboard(dummyLeaderboard);
        setMunsterScorers(dummyMunsterScorers);
        setLeinsterScorers(dummyLeinsterScorers);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div class="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main class="main-content" role="tabpanel">
        {error && (
          <div class="error-banner" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div class="loading" aria-live="polite">
            <div class="spinner" />
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === "leaderboard" && (
              <LeaderboardTable data={leaderboard} />
            )}
            {activeTab === "munster" && (
              <ScorerTable
                data={munsterScorers}
                title="Munster Top Scorers - Scores From Play"
                gameHeaders={["Game 1", "Game 2", "Game 3", "Game 4"]}
              />
            )}
            {activeTab === "leinster" && (
              <ScorerTable
                data={leinsterScorers}
                title="Leinster Top Scorers - Scores From Play"
                gameHeaders={["Game 1", "Game 2", "Game 3", "Game 4", "Game 5"]}
              />
            )}
          </>
        )}
      </main>

      <footer class="site-footer">
        <p>© 2026 Gortnahoe Glengoole GAA</p>
      </footer>
    </div>
  );
}
