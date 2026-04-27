import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import api from "../../services/api";
import InputGroup from "../ui/InputGroup";

export default function AddVehicleDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [license_plate, setLicensePlate] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [error, setError] = useState("");

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
      setOpen(false);
      onSuccess(); // rafraîchit la liste des véhicules dans le dashboard
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la création du véhicule",
      );
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Bouton qui ouvre le dialog */}
      <Dialog.Trigger asChild>
        <button className="btn-primary">+ Ajouter un véhicule</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Fond sombre derrière */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />

        {/* La modale */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-card p-6 w-full max-w-lg z-50">
          {/* Titre */}
          <Dialog.Title className="text-base font-semibold text-app-text mb-4">
            Ajouter un véhicule
          </Dialog.Title>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputGroup
              id="nickname"
              label="Pseudo"
              type="text"
              name="nickname"
              value={nickname}
              onChange={setNickname}
              placeholder="Mon fidèle destrier"
            />
            <InputGroup
              id="brand"
              label="Marque"
              type="text"
              name="brand"
              value={brand}
              onChange={setBrand}
              placeholder="Toyota, Honda, etc."
            />
            <InputGroup
              id="model"
              label="Modèle"
              type="text"
              name="model"
              value={model}
              onChange={setModel}
              placeholder="Camry, Civic, etc."
            />
            <InputGroup
              id="year"
              label="Année"
              type="number"
              name="year"
              value={year}
              onChange={setYear}
              placeholder="2020, 2021, etc."
            />
            <InputGroup
              id="license_plate"
              label="Plaque d'immatriculation"
              type="text"
              name="license_plate"
              value={license_plate}
              onChange={setLicensePlate}
              placeholder="ABC-123, XYZ-789, etc."
            />
            <InputGroup
              id="fuel_type"
              label="Type de carburant"
              type="text"
              name="fuel_type"
              value={fuel_type}
              onChange={setFuelType}
              placeholder="Essence, Diesel, Electrique, etc."
            />

            <button type="submit" className="btn-primary">
              Ajouter
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Bouton fermer */}
          <Dialog.Close className="absolute top-4 right-4 text-app-muted hover:text-app-text">
            ✕
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
