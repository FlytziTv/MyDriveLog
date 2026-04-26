import { useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function InterventionNew() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [done_by, setDoneBy] = useState("");
  const [garage_name, setGarageName] = useState("");
  const [mileage_at_intervention, setMileageAtIntervention] = useState("");
  const [intervention_date, setInterventionDate] = useState("");
  const [cost, setCost] = useState("");
  const [parts_used, setPartsUsed] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/interventions/${id}`,
        {
          title,
          description,
          category,
          done_by,
          garage_name,
          mileage_at_intervention,
          intervention_date,
          cost,
          parts_used,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Intervention created:", response.data);
      navigate(`/vehicles/${id}/interventions`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la création de l'intervention",
      );
    }
  };

  return (
    <div>
      <h1>Ajouter une intervention</h1>
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
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="done_by">Effectué par</label>
          <input
            type="text"
            id="done_by"
            name="done_by"
            value={done_by}
            onChange={(e) => setDoneBy(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="garage_name">Nom du garage</label>
          <input
            type="text"
            id="garage_name"
            name="garage_name"
            value={garage_name}
            onChange={(e) => setGarageName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mileage_at_intervention">Kilométrage</label>
          <input
            type="number"
            id="mileage_at_intervention"
            name="mileage_at_intervention"
            value={mileage_at_intervention}
            onChange={(e) => setMileageAtIntervention(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="intervention_date">Date de l'intervention</label>
          <input
            type="date"
            id="intervention_date"
            name="intervention_date"
            value={intervention_date}
            onChange={(e) => setInterventionDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cost">Coût</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="parts_used">Pièces utilisées</label>
          <input
            type="text"
            id="parts_used"
            name="parts_used"
            value={parts_used}
            onChange={(e) => setPartsUsed(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
