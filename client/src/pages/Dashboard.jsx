import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Your Vehicles</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li
            key={vehicle.id}
            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          >
            {vehicle.nickname} {vehicle.brand} {vehicle.model} ({vehicle.year})
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/vehicles/new")}>
        Ajouter un véhicule
      </button>
    </div>
  );
}
