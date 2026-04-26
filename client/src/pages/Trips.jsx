import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get(`/trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, [token]);

  if (!trips) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Trips</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <p>{trip.title}</p>
            <p>{trip.description}</p>
            <p>{trip.start_date}</p>
            <p>{trip.end_date}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/trips/new`)}>Ajouter un trip</button>
    </div>
  );
}
