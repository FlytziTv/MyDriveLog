import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import api from "../services/api";

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  cover_photo_url: string | null;
  current_mileage: number;
  total_cost: string;
};

type VehicleContextType = {
  vehicles: Vehicle[];
  loading: boolean;
  refreshVehicles: () => Promise<void>;
};
const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <VehicleContext.Provider
      value={{ vehicles, loading, refreshVehicles: fetchVehicles }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error(
      "useVehicles doit être utilisé à l'intérieur d'un VehicleProvider",
    );
  }
  return context;
}
