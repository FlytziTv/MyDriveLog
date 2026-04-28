export default function HeaderVehicle({ vehicle }) {
  return (
    <div className="col-span-2 bg-card-bg border border-app-border p-5 rounded-xl flex gap-6">
      {/* Image - Taille inchangée, style épuré */}
      <div className="w-[350px] aspect-video bg-surface-soft rounded-lg overflow-hidden border border-app-border shrink-0">
        {vehicle.image ? (
          <img
            src={vehicle.image}
            alt={vehicle.model}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-app-text/40 text-sm">
            Aucune image disponible
          </div>
        )}
      </div>

      {/* Infos - Alignées proprement */}
      <div className="flex flex-col justify-center gap-1.5">
        <h2 className="text-2xl font-bold mb-2">{vehicle.nickname}</h2>

        <p className="text-sm">
          <span className="text-app-text/50">Marque :</span> {vehicle.brand}
        </p>
        <p className="text-sm">
          <span className="text-app-text/50">Modèle :</span> {vehicle.model}
        </p>
        <p className="text-sm">
          <span className="text-app-text/50">Année :</span> {vehicle.year}
        </p>
        <p className="text-sm">
          <span className="text-app-text/50">Immatriculation :</span>{" "}
          {vehicle.license_plate}
        </p>
        <p className="text-sm">
          <span className="text-app-text/50">Carburant :</span>{" "}
          {vehicle.fuel_type}
        </p>
      </div>
    </div>
  );
}
