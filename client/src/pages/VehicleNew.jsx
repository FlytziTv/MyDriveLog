import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function VehicleNew() {
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [license_plate, setLicensePlate] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/vehicles",
        {
          nickname,
          brand,
          model,
          year,
          license_plate,
          fuel_type,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Vehicle created:", response.data);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la création du véhicule",
      );
    }
  };

  return (
    <div>
      <h1>Ajouter un véhicule</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname">Pseudo</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="model">Modèle</label>
          <input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Année</label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="license_plate">Plaque d'immatriculation</label>
          <input
            type="text"
            id="license_plate"
            name="license_plate"
            value={license_plate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fuel_type">Type de carburant</label>
          <input
            type="text"
            id="fuel_type"
            name="fuel_type"
            value={fuel_type}
            onChange={(e) => setFuelType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
