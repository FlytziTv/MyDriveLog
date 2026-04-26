import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TripNew() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/trips`,
        {
          title,
          description,
          mode,
          start_date,
          end_date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Trip created:", response.data);
      navigate(`/trips`);
    } catch (error) {
      setError(
        error.response?.data?.message || "Erreur lors de la création du trip",
      );
    }
  };

  return (
    <div>
      <h1>Ajouter un trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mode">Mode</label>
          <input
            type="text"
            id="mode"
            name="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="start_date">Date de début</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">Date de fin</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
