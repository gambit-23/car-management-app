import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Main App component
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css"; // Global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);