import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VehicleNew from "./pages/VehicleNew";
import ProtectedRoute from "./components/ProtectedRoute";
import VehicleDetail from "./pages/VehicleDetail";
import VehicleInterventions from "./pages/Interventions";
import InterventionNew from "./pages/InterventionNew";

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/new"
          element={
            <ProtectedRoute>
              <VehicleNew />
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
        />
        <Route
          path="/vehicles/:id/interventions"
          element={
            <ProtectedRoute>
              <VehicleInterventions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/:id/interventions/new"
          element={
            <ProtectedRoute>
              <InterventionNew />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
