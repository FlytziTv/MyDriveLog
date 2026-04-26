import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await api.get(`/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };
    fetchVehicle();
  }, [id, token]);

  if (!vehicle) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{vehicle.nickname}</h1>
      <p>Marque: {vehicle.brand}</p>
      <p>Modèle: {vehicle.model}</p>
      <p>Année: {vehicle.year}</p>
      <p>Plaque d'immatriculation: {vehicle.license_plate}</p>
      <p>Type de carburant: {vehicle.fuel_type}</p>
    </div>
  );
}
