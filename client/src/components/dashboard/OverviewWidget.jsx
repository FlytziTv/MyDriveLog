export default function OverviewWidget() {
  return (
    <div className="w-full bg-card-bg border border-app-border p-4 rounded-xl shadow-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-app-text">
          Vue d'ensemble
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-2 items-start bg-primary/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-primary">Distance totale</p>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <p className="text-2xl font-bold text-app-text">12 345 km</p>
            <span className="text-sm text-green-500">+8%</span>
          </div>
          <p className="text-xs text-primary-hover">vs mois précédent</p>
        </div>

        <div className="col-span-1 flex flex-col gap-2 items-start bg-primary/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-primary">Dépenses ce mois</p>
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <p className="text-2xl font-bold text-app-text">842.50 €</p>
            <span className="text-sm text-green-500">-4%</span>
          </div>
          <p className="text-xs text-primary-hover">vs mois précédent</p>
        </div>

        <div className="col-span-1 flex flex-col gap-2 items-start bg-primary/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-primary">Interventions</p>
          <p className="text-2xl font-bold text-app-text">3</p>
          <p className="text-xs text-primary-hover">Ce mois</p>
        </div>

        <div className="col-span-1 flex flex-col gap-2 items-start bg-red-500/10 py-4 px-5 rounded-lg">
          <p className="text-xs font-semibold text-red-500">Rappels à venir</p>
          <p className="text-2xl font-bold text-app-text">2</p>
          <p className="text-xs text-primary-hover">
            Dans les 30 prochains jours
          </p>
        </div>
      </div>

      <div className="w-full bg-card-bg border border-app-border rounded-lg h-40 text-sm flex items-center justify-center text-app-muted">
        Aucun graphique disponible pour le moment
      </div>
    </div>
  );
}
