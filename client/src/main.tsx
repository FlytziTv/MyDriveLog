import "./i18n.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { VehicleProvider } from "./contexts/VehicleContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VehicleProvider>
      <App />
    </VehicleProvider>
  </StrictMode>,
);
