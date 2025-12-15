import React from "react";

/**
 * Sidebar component rendering navigation links for core screens.
 * Props:
 * - active: string key of current route
 * - onNavigate: function(key) to navigate
 */
// PUBLIC_INTERFACE
export default function Sidebar({ active, onNavigate }) {
  const items = [
    { key: "suites", label: "Test Suites" },
    { key: "editor", label: "Editor" },
    { key: "runs", label: "Run History" },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
      <div className="section-title">Navigation</div>
      <ul className="nav-list">
        {items.map((it) => {
          const isActive = active === it.key;
          const classes = "nav-link" + (isActive ? " active" : "");
          return (
            <li key={it.key}>
              <button
                type="button"
                className={classes}
                onClick={() => onNavigate(it.key)}
                aria-current={isActive ? "page" : undefined}
                style={{ width: "100%", textAlign: "left" }}
              >
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
