import type { Tab } from "../types";

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "leaderboard", label: "Leaderboard" },
  { id: "munster", label: "Munster Top Scorers" },
  { id: "leinster", label: "Leinster Top Scorers" },
];

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header class="site-header">
      <div class="header-content">
        <h1 class="site-title">Championship Challenge</h1>
        <p class="site-subtitle">Gortnahoe Glengoole GAA · 2026</p>
      </div>
      <nav class="tab-nav" role="tablist" aria-label="Main navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            class={`tab-btn ${activeTab === tab.id ? "tab-btn--active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
