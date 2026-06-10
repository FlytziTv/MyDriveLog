import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SectionProfile } from "@/components/profile/Sections";
import SubscriptionCard from "@/components/profile/subscriptionsCard";

const features = {
  free: [
    "3 véhicules max",
    "Historique 6 mois",
    "Export PDF (5/mois)",
    "Support communautaire",
  ],
  premium: [
    "Véhicules illimités",
    "Historique complet",
    "Export illimité (PDF + CSV)",
    "Alertes personnalisées",
    "Statistiques avancées",
    "Support prioritaire < 12h",
  ],
};

export default function Subscriptions() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-neutral-500"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-sm">Retour</span>
        </Link>

        <div className="flex flex-col gap-0">
          <h2 className="text-2xl font-bold text-neutral-900">Abonnement</h2>
          <p className="text-xs text-neutral-400">
            Gérez votre plan MyDriveLog
          </p>
        </div>
      </div>

      {/* Actif */}
      <div className="bg-neutral-900 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          {/* Info plan */}
          <div className="flex flex-col gap-1">
            <p className="text-xs text-neutral-400">Plan actuel</p>
            <p className="text-xl font-semibold text-white">Premium</p>
          </div>
          <div className="px-3.5 py-1 bg-white/10 rounded-full">
            <span className="text-xs text-center font-medium text-white">
              Actif
            </span>
          </div>
        </div>
        {/* Détails du prochain renouvellement */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <p className="text-xs text-neutral-400">Prochain renouvellement</p>
          <p className="text-xs font-medium text-white">9 juillet 2025</p>
        </div>
      </div>

      <SectionProfile title="Comparatif des plans">
        {/* Plan Gratuit */}
        <SubscriptionCard
          title="Gratuit"
          description="Pour débuter"
          price={0}
          features={features.free}
          actif={false}
        />

        {/* Plan Premium */}
        <SubscriptionCard
          title="Premium"
          description="Pour les passionnés"
          price={4.99}
          priceAnnual={39.99}
          features={features.premium}
          actif={true}
        />
      </SectionProfile>

      <div className="flex flex-col gap-2">
        <button className="cursor-pointer w-full h-10 border border-neutral-200 bg-white text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
          Changer de plan
        </button>
        <button className="cursor-pointer w-full h-10 border border-red-100 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
          Annuler l&apos;abonnement
        </button>
        <p className="text-center text-xs text-neutral-400 mt-2">
          Facturé le 9 de chaque mois · Annulation à tout moment
        </p>
      </div>
    </>
  );
}
