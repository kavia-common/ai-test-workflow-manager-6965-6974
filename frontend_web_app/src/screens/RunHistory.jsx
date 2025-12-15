import React, { useEffect, useState } from "react";
import { ApiClient } from "../lib/apiClient";

// PUBLIC_INTERFACE
export default function RunHistory() {
  /** Shows recently executed runs, with simple status tags. */
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true); setError(null);
    try {
      const data = await ApiClient.getRuns();
      setRuns(Array.isArray(data) ? data : (data?.items || []));
    } catch (e) {
      setError(e.message || "Failed to load runs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="kicker">History</div>
          <div className="card-title">Run History</div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={load}>Refresh</button>
        </div>
      </div>

      {loading && <div>Loading runs...</div>}
      {error && <div className="tag error" role="alert">Error: {error}</div>}

      {!loading && !error && (
        <div className="card" style={{ padding: 0, overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Run ID</th>
                <th>Suite</th>
                <th>Status</th>
                <th>Started</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {runs.length === 0 && (
                <tr><td colSpan="5" style={{ padding: 16, color: "#6B7280" }}>No runs yet.</td></tr>
              )}
              {runs.map(r => (
                <tr key={r.id || `${r.suite}-${r.started_at}`}>
                  <td style={{ fontFamily: "monospace" }}>{r.id || "—"}</td>
                  <td>{r.suite || "—"}</td>
                  <td>
                    <span className={`tag ${r.status === "passed" ? "success" : r.status === "failed" ? "error" : ""}`}>
                      {r.status || "queued"}
                    </span>
                  </td>
                  <td>{r.started_at || "—"}</td>
                  <td>{r.duration || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
