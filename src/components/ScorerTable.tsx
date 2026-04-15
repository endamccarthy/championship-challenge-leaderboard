import type { ScorerEntry } from "../types";

interface ScorerTableProps {
  data: ScorerEntry[];
  title: string;
  gameHeaders: string[];
}

export function ScorerTable({ data, title, gameHeaders }: ScorerTableProps) {
  return (
    <div class="table-container">
      <h2 class="table-title">{title}</h2>
      <div class="table-scroll">
        <table class="scorer-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>County</th>
              <th>Total</th>
              {gameHeaders.map((h) => (
                <th key={h}>{h}</th>
              ))}
              <th>Final</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.player}>
                <td data-label="Player">
                  <strong>{entry.player}</strong>
                </td>
                <td data-label="County">{entry.county}</td>
                <td data-label="Total">
                  <strong>{entry.totalPoints}</strong>
                </td>
                {entry.games.map((g, i) => (
                  <td key={i} data-label={gameHeaders[i] ?? `Game ${i + 1}`}>
                    {g}
                  </td>
                ))}
                <td data-label="Final">{entry.final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
