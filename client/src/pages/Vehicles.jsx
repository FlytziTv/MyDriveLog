import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import SideBar from "../components/layout/SideBar";
import { Bell } from "lucide-react";
import VehicleCard from "../components/card/VehicleCard";
import AddVehicleDialog from "../components/form/AddVehicle";

export default function Vehicles() {
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

      <main className="ml-[260px] flex-1 p-4 gap-4 flex flex-col">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col gap-0 items-start">
            <h1 className="text-2xl font-bold">Bonjour, {user?.username}</h1>
            <p className="text-app-text/70 text-sm ">
              Voici toutes les véhicules que vous avez ajoutés à votre garage.
            </p>
          </div>

          <div className="flex flex-row items-stretch gap-2 h-10">
            <AddVehicleDialog onSuccess={fetchVehicles} />

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

        <div className="grid grid-cols-4 gap-2">
          {vehicles.length === 0 ? (
            <p className="text-sm text-app-muted">Aucun véhicule trouvé</p>
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
