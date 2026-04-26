import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function VehicleInterventions() {
  const { id } = useParams();
  const [interventions, setInterventions] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        const response = await api.get(`/interventions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterventions(response.data);
      } catch (error) {
        console.error("Error fetching interventions:", error);
      }
    };
    fetchInterventions();
  }, [id, token]);

  if (!interventions) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Interventions</h1>
      <ul>
        {interventions.map((intervention) => (
          <li key={intervention.id}>
            <p>{intervention.title}</p>
            <p>{intervention.description}</p>
            <p>Date: {intervention.intervention_date}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/vehicles/${id}/interventions/new`)}>
        Ajouter une intervention
      </button>
    </div>
  );
}
