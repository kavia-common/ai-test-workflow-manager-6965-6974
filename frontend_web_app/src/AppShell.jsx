import React, { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import TestSuiteList from "./screens/TestSuiteList";
import Editor from "./screens/Editor";
import RunHistory from "./screens/RunHistory";

// PUBLIC_INTERFACE
export default function AppShell() {
  /**
   * Main application shell that renders the layout and in-app navigation
   * without adding a routing library (MVP).
   */
  const [route, setRoute] = useState("suites");
  const [editingSuite, setEditingSuite] = useState(null);

  function openEditor(suite, opts = {}) {
    setEditingSuite(suite || null);
    setRoute("editor");
    if (opts.run) {
      // If called with run, we allow the Editor to immediately "Run" after save by user
      // MVP keeps it manual for confirmation.
    }
  }

  return (
    <div className="app-shell">
      <TopNav />
      <div className="layout">
        <Sidebar active={route} onNavigate={setRoute} />
        <main className="main" role="main">
          {route === "suites" && <TestSuiteList onOpenEditor={openEditor} />}
          {route === "editor" && (
            <Editor
              suite={editingSuite}
              onSave={(s) => setEditingSuite(s)}
              onRun={() => setRoute("runs")}
            />
          )}
          {route === "runs" && <RunHistory />}
        </main>
      </div>
    </div>
  );
}
