import React, { useEffect, useState } from "react";
import { health } from "../lib/apiClient";
import { getApiBaseUrl, getFeatureFlags } from "../lib/config";

// PUBLIC_INTERFACE
export default function TopNav() {
  /** Top navigation with brand, connectivity badge, and env info. */
  const [status, setStatus] = useState({ ok: false, detail: null });

  useEffect(() => {
    let mounted = true;
    // Poll once on mount
    (async () => {
      const res = await health();
      if (mounted) setStatus(res);
    })();
    return () => { mounted = false; };
  }, []);

  const flags = Array.from(getFeatureFlags());

  return (
    <div className="topnav" role="navigation" aria-label="Top Navigation">
      <div className="brand">
        <div className="brand-logo" aria-hidden="true" />
        <div className="brand-name">AI Test Workflow Manager</div>
      </div>
      <div className="topnav-actions">
        <span className={`badge ${status.ok ? "ok" : "err"}`} title={`API: ${getApiBaseUrl()}`}>
          <span aria-hidden="true" style={{ fontSize: 10 }}>
            {status.ok ? "●" : "○"}
          </span>
          {status.ok ? "Connected" : "No Connection"}
        </span>
        {flags.length > 0 && (
          <span className="badge" title={`Flags: ${flags.join(", ")}`}>
            Flags: {flags.length}
          </span>
        )}
      </div>
    </div>
  );
}
