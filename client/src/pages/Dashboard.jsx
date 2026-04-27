import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SideBar from "../components/layout/SideBar";
import AddVehicleDialog from "../components/form/AddVehicle";

export default function Dashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(null);

  const fetchVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex bg-app-bg">
      <SideBar user={user?.username} />

      <main className="ml-[260px] flex-1 p-8">
        <h2>Your Vehicles</h2>
        <ul>
          {vehicles.map((vehicle) => (
            <li
              key={vehicle.id}
              onClick={() => navigate(`/vehicles/${vehicle.id}`)}
            >
              {vehicle.nickname} {vehicle.brand} {vehicle.model} ({vehicle.year}
              )
            </li>
          ))}
        </ul>

        <AddVehicleDialog onSuccess={fetchVehicles} />
      </main>
    </div>
  );
}
