# AI Test Workflow Manager - Frontend (React)

A lightweight React MVP with a Corporate Navy theme and a classic layout (TopNav, Sidebar, Main). It provides three core screens:
- Test Suite List
- Editor with "AI Suggest"
- Run History

## Environment

The app reads these variables:
- `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL`: Backend API base URL. If not provided, it falls back to `http://<host>:3001`.
- `REACT_APP_HEALTHCHECK_PATH`: Health endpoint path (default `/health`).
- `REACT_APP_FEATURE_FLAGS`: Comma-separated flags (e.g., `ai-suggest,editor-beta`) surfaced in the top-right badge.

Optional variables present in the environment but not directly used in the MVP:
- `REACT_APP_FRONTEND_URL`, `REACT_APP_WS_URL`, `REACT_APP_NODE_ENV`, `REACT_APP_NEXT_TELEMETRY_DISABLED`, `REACT_APP_ENABLE_SOURCE_MAPS`, `REACT_APP_PORT`, `REACT_APP_TRUST_PROXY`, `REACT_APP_LOG_LEVEL`, `REACT_APP_EXPERIMENTS_ENABLED`.

## Scripts

- `npm start`: Start dev server at http://localhost:3000
- `npm test`: Run tests
- `npm run build`: Production build

## API Client Assumptions

This MVP expects the backend to expose these routes:
- `GET {API_BASE}/health`
- `GET {API_BASE}/suites`
- `GET {API_BASE}/suites/:id`
- `POST {API_BASE}/suites` (create/update)
- `POST {API_BASE}/ai/suggest`
- `POST {API_BASE}/suites/:id/run`
- `GET {API_BASE}/runs`

If your backend differs, adjust endpoints in `src/lib/apiClient.js`.

## Theming

The Corporate Navy theme is defined in `src/theme.css` and applied across components without external UI frameworks.
