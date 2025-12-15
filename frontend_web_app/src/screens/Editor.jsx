import React, { useEffect, useState } from "react";
import { ApiClient } from "../lib/apiClient";

// PUBLIC_INTERFACE
export default function Editor({ suite, onSave, onRun }) {
  /** Simple editor for a suite's content with AI suggest and run actions. */
  const [name, setName] = useState(suite?.name || "");
  const [content, setContent] = useState(suite?.content || "");
  const [suggesting, setSuggesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(suite?.name || "");
    setContent(suite?.content || "");
  }, [suite]);

  async function save() {
    setSaving(true); setError(null);
    try {
      const saved = await ApiClient.upsertSuite({ id: suite?.id, name, content });
      onSave?.(saved);
    } catch (e) {
      setError(e.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function suggest() {
    setSuggesting(true); setError(null);
    try {
      const res = await ApiClient.aiSuggest({ name, content });
      if (res?.suggestion) {
        setContent(prev => prev ? `${prev}\n\n# AI Suggestion\n${res.suggestion}` : res.suggestion);
      }
    } catch (e) {
      setError(e.message || "Failed to get AI suggestion.");
    } finally {
      setSuggesting(false);
    }
  }

  async function run() {
    try {
      await save();
      await ApiClient.runSuite(suite?.id || name);
      onRun?.();
    } catch (e) {
      setError(e.message || "Failed to run.");
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="kicker">Editor</div>
          <div className="card-title">Suite Editor</div>
        </div>
        <div className="header-actions">
          <button className="btn ghost" onClick={suggest} disabled={suggesting}>
            {suggesting ? "Suggesting..." : "AI Suggest"}
          </button>
          <button className="btn secondary" onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button className="btn" onClick={run}>Run</button>
        </div>
      </div>

      {error && <div className="tag error" role="alert" style={{ marginBottom: 10 }}>{error}</div>}

      <div style={{ display: "grid", gap: 10 }}>
        <label>
          <div className="kicker" style={{ marginBottom: 6 }}>Suite Name</div>
          <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Checkout Flow" />
        </label>

        <label>
          <div className="kicker" style={{ marginBottom: 6 }}>Suite Content (YAML/JSON)</div>
          <textarea className="textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Write tests here..." />
        </label>
      </div>
    </div>
  );
}
