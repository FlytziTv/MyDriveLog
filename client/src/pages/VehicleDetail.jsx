import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import SideBar from "../components/layout/SideBar";
import { Bell } from "lucide-react";
import AddInterventionDialog from "../components/form/AddIntervention";
import HistoInterVehicle from "../components/vehicle_detail/HistoInterVehicle";
import HeaderVehicle from "../components/vehicle_detail/HeaderVehicle";
import NextInterWidget from "../components/dashboard/NextInterWidget";
import RemindersWidget from "../components/dashboard/RemindersWidget";
import CostWidget from "../components/dashboard/CostWidget";

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [user, setUser] = useState(null);
  const [interventions, setInterventions] = useState([]);

  const fetchVehicles = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicle(response.data);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const fetchInterventions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/interventions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterventions(response.data);
    } catch (error) {
      console.error("Error fetching interventions:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchInterventions();
  }, [fetchInterventions]);

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

  if (!vehicle) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex bg-app-bg">
      <SideBar user={user?.username} />

      <main className="ml-[260px] flex-1 p-4 gap-4 flex flex-col">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col gap-0 items-start">
            <h1 className="text-2xl font-bold">Bonjour, {user?.username}</h1>
            <p className="text-app-text/70 text-sm ">
              Voici toutes les informations sur votre {vehicle.model}
            </p>
          </div>

          <div className="flex flex-row items-stretch gap-2 h-10">
            <AddInterventionDialog
              onSuccess={fetchInterventions}
              vehicleId={id}
            />

            <div className="w-px bg-app-border my-1" />

            <button
              onClick={() => console.log("Ouverture des notifications")}
              className="flex items-center justify-center border border-app-border text-app-text rounded-lg h-full aspect-square hover:bg-surface-hover transition-all duration-200 active:scale-95 relative"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full border-2 border-app-bg" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 h-full overflow-y-hidden">
          <div className="col-span-2 flex flex-col gap-4">
            <HeaderVehicle vehicle={vehicle} />

            <HistoInterVehicle interventions={interventions} />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <CostWidget vehicleId={id} />

            <NextInterWidget vehicleId={id} />

            <RemindersWidget vehicleId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}
