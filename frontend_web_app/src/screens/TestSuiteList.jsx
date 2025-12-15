import React, { useEffect, useState } from "react";
import { ApiClient } from "../lib/apiClient";

// PUBLIC_INTERFACE
export default function TestSuiteList({ onOpenEditor }) {
  /** Lists test suites with simple create/edit affordances. */
  const [loading, setLoading] = useState(true);
  const [suites, setSuites] = useState([]);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await ApiClient.listSuites();
      setSuites(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || "Failed to load suites.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createSuite() {
    if (!newName.trim()) return;
    try {
      const created = await ApiClient.upsertSuite({ name: newName.trim(), content: "" });
      setNewName("");
      // optimistic add or reload
      setSuites(prev => [created, ...prev]);
    } catch (e) {
      setError(e.message || "Failed to create suite.");
    }
  }

  return (
    <div className="card" aria-live="polite">
      <div className="card-header">
        <div>
          <div className="kicker">Suites</div>
          <div className="card-title">Test Suite Library</div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={load}>Refresh</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, marginBottom: 12 }}>
        <input
          className="input"
          placeholder="New suite name..."
          value={newName}
          onChange={e => setNewName(e.target.value)}
          aria-label="New suite name"
        />
        <button className="btn secondary" onClick={createSuite}>Create</button>
      </div>

      {loading && <div>Loading suites...</div>}
      {error && <div className="tag error" role="alert">Error: {error}</div>}

      {!loading && !error && (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Suite</th>
                <th>Last Modified</th>
                <th>Owner</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suites.length === 0 && (
                <tr><td colSpan="4" style={{ padding: 16, color: "#6B7280" }}>No suites yet.</td></tr>
              )}
              {suites.map(s => (
                <tr key={s.id || s.name}>
                  <td>{s.name}</td>
                  <td>{s.updated_at || "—"}</td>
                  <td>{s.owner || "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn ghost" onClick={() => onOpenEditor(s)}>Edit</button>
                      <button className="btn" onClick={() => onOpenEditor(s, { run: true })}>Run</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
