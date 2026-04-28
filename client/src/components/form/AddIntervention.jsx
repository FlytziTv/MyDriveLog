import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import api from "../../services/api";
import InputGroup from "../ui/InputGroup";
import { Plus } from "lucide-react";

export default function AddInterventionDialog({ onSuccess, vehicleId }) {
  const [open, setOpen] = useState(false);
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

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/interventions/${vehicleId}`,
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
      setOpen(false);
      onSuccess(); // rafraîchit la liste des véhicules dans le dashboard
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erreur lors de la création de l'intervention",
      );
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Bouton qui ouvre le dialog */}
      <Dialog.Trigger
        asChild
        className="flex flex-row items-center justify-center gap-2"
      >
        <button className="btn-primary">
          <Plus size={16} /> Ajouter une intervention
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Fond sombre derrière */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />

        {/* La modale */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-card p-6 w-full max-w-lg z-50">
          {/* Titre */}
          <Dialog.Title className="text-base font-semibold text-app-text mb-4">
            Ajouter une intervention
          </Dialog.Title>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputGroup
              id="title"
              label="Titre"
              type="text"
              name="title"
              value={title}
              onChange={setTitle}
              placeholder="Changement d'huile, Révision, etc."
            />
            <InputGroup
              id="description"
              label="Description"
              type="text"
              name="description"
              value={description}
              onChange={setDescription}
              placeholder="Détail de l'intervention, pièces remplacées, etc."
            />
            <InputGroup
              id="category"
              label="Catégorie"
              type="text"
              name="category"
              value={category}
              onChange={setCategory}
              placeholder="Entretien, Réparation, etc."
            />
            <InputGroup
              id="done_by"
              label="Effectué par"
              type="text"
              name="done_by"
              value={done_by}
              onChange={setDoneBy}
              placeholder="Nom du mécanicien, garage, etc."
            />
            <InputGroup
              id="garage_name"
              label="Nom du garage"
              type="text"
              name="garage_name"
              value={garage_name}
              onChange={setGarageName}
              placeholder="ABC-123, XYZ-789, etc."
            />
            <InputGroup
              id="mileage_at_intervention"
              label="Kilométrage à l'intervention"
              type="number"
              name="mileage_at_intervention"
              value={mileage_at_intervention}
              onChange={setMileageAtIntervention}
              placeholder="Kilométrage à l'intervention"
            />

            <InputGroup
              id="intervention_date"
              label="Date de l'intervention"
              type="date"
              name="intervention_date"
              value={intervention_date}
              onChange={setInterventionDate}
            />

            <InputGroup
              id="cost"
              label="Coût de l'intervention"
              type="number"
              name="cost"
              value={cost}
              onChange={setCost}
              placeholder="Coût de l'intervention"
            />

            <InputGroup
              id="parts_used"
              label="Pièces utilisées (optionnel)"
              type="text"
              name="parts_used"
              value={parts_used}
              onChange={setPartsUsed}
              placeholder="Liste des pièces utilisées, séparées par des virgules"
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
