import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import ReactGA from "react-ga4";
import App from "./App";
import "./index.css";
import AnalyticsTracker from "./components/AnalyticsTracker";

// Initialize GA4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnalyticsTracker />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
