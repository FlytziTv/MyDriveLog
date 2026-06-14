import { SubscriptionPlan } from "@prisma/client";

type PlanMeta = {
  title: string;
  description: string;
  price: number;
  priceAnnual?: number;
  features: string[];
};

export const SubscriptionMeta: Record<SubscriptionPlan, PlanMeta> = {
  FREE: {
    title: "Gratuit",
    description: "Pour débuter",
    price: 0,
    features: [
      "3 véhicules max",
      "Historique 6 mois",
      "Export PDF (5/mois)",
      "Support communautaire",
    ],
  },
  PREMIUM: {
    title: "Premium",
    description: "Pour les passionnés",
    price: 4.99,
    priceAnnual: 39.99,
    features: [
      "Véhicules illimités",
      "Historique complet",
      "Export illimité (PDF + CSV)",
      "Alertes personnalisées",
      "Statistiques avancées",
      "Support prioritaire < 12h",
    ],
  },
};
