import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register.tsx";
import DashboardPage from "./pages/Dashboard.tsx";
import VehiclesPage from "./pages/Vehicles";
import AnalyticsPage from "./pages/Analytics";
import Maintenance from "./pages/Maintenance.tsx";
import DocumentsPage from "./pages/Documents.tsx";
import VehicleDetail from "./pages/VehicleDetail.tsx";
import { TabOverview } from "./components/vehicle_detail/TabOverview.tsx";
import { TabExpenses } from "./components/vehicle_detail/TabExpenses.tsx";
import { TabMaintenance } from "./components/vehicle_detail/TabMaintenance.tsx";
import { TabDocuments } from "./components/vehicle_detail/TabDocuments.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehiclesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/:id"
          element={
            <ProtectedRoute>
              <VehicleDetail />
            </ProtectedRoute>
          }
        >
          <Route index element={<TabOverview />} />
          <Route path="expenses" element={<TabExpenses />} />
          <Route path="maintenance" element={<TabMaintenance />} />
          <Route path="documents" element={<TabDocuments />} />
        </Route>

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <Maintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
