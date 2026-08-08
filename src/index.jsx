import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import Dashboard from './pages/Dashboard';

// Mounts directly into the dashboard-root section embedded in the static landing
// page (public/index.html) — not a full-page #root mount, since App.js's full-viewport
// gradient wrapper doesn't make sense embedded mid-page alongside the static content.
const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));
root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);
