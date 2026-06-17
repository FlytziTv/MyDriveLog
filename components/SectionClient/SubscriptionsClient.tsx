"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SectionProfile } from "@/components/profile/Sections";
import SubscriptionCard from "@/components/profile/subscriptionsCard";
import { SubscriptionMeta } from "@/lib/subscriptions";
import { changePlan, cancelSubscription } from "@/server/actions/subscription";
import { SubscriptionPlan } from "@prisma/client";

export default function SubscriptionsClient({
  subscription,
}: {
  subscription: { plan: SubscriptionPlan; planRenewsAt: Date | null } | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const plan = subscription?.plan ?? "FREE";
  const meta = SubscriptionMeta[plan];

  async function handleChangePlan(newPlan: SubscriptionPlan) {
    setLoading(true);
    await changePlan(newPlan);
    setLoading(false);
    router.refresh();
  }

  async function handleCancel() {
    setLoading(true);
    await cancelSubscription();
    setLoading(false);
    router.refresh();
  }

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

      <div className="bg-neutral-900 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-neutral-400">Plan actuel</p>
            <p className="text-xl font-semibold text-white">{meta.title}</p>
          </div>
          <div className="px-3.5 py-1 bg-white/10 rounded-full">
            <span className="text-xs text-center font-medium text-white">
              Actif
            </span>
          </div>
        </div>

        {plan === "PREMIUM" && subscription?.planRenewsAt && (
          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <p className="text-xs text-neutral-400">Prochain renouvellement</p>
            <p className="text-xs font-medium text-white">
              {new Date(subscription.planRenewsAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      <SectionProfile title="Comparatif des plans">
        <SubscriptionCard
          title={SubscriptionMeta.FREE.title}
          description={SubscriptionMeta.FREE.description}
          price={SubscriptionMeta.FREE.price}
          features={SubscriptionMeta.FREE.features}
          actif={plan === "FREE"}
        />

        <SubscriptionCard
          title={SubscriptionMeta.PREMIUM.title}
          description={SubscriptionMeta.PREMIUM.description}
          price={SubscriptionMeta.PREMIUM.price}
          priceAnnual={SubscriptionMeta.PREMIUM.priceAnnual}
          features={SubscriptionMeta.PREMIUM.features}
          actif={plan === "PREMIUM"}
        />
      </SectionProfile>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleChangePlan(plan === "FREE" ? "PREMIUM" : "FREE")}
          disabled={loading}
          className="cursor-pointer w-full h-10 border border-neutral-200 bg-white text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 disabled:opacity-40 transition-colors"
        >
          {loading
            ? "..."
            : plan === "FREE"
              ? "Passer en Premium"
              : "Passer en Gratuit"}
        </button>

        {plan === "PREMIUM" && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="cursor-pointer w-full h-10 border border-red-100 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-40 transition-colors"
          >
            Annuler l&apos;abonnement
          </button>
        )}

        <p className="text-center text-xs text-neutral-400 mt-2">
          Facturé le 9 de chaque mois · Annulation à tout moment
        </p>
      </div>
    </>
  );
}
