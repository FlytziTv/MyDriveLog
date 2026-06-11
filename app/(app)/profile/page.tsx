import {
  SectionProfile,
  SectionItem,
  SectionItemIcon,
} from "@/components/profile/Sections";
import Link from "next/link";
import { StatProfile } from "@/components/profile/StatsCard";
import { ChevronRight, User, Bell, SettingsIcon, Zap } from "lucide-react";

import { getUserStats } from "@/server/queries/stats";
import { getVehicles } from "@/server/queries/vehicle";

const params = [
  {
    icon: User,
    title: "Informations personnelles",
    subtitle: "Nom, email, téléphone",
    href: "/profile/personal-info",
  },
  {
    icon: Bell,
    title: "Notifications",
    subtitle: "Rappels et alertes",
    href: "/profile/notifications",
  },
  {
    icon: SettingsIcon,
    title: "Préférences",
    subtitle: "Unités, langue",
    href: "/profile/preferences",
  },
  {
    icon: Zap,
    title: "Abonnement",
    subtitle: "Premium · Actif",
    href: "/profile/subscriptions",
  },
];

const helps = [
  { title: "Centre d'aide", href: "/help" },
  { title: "Contactez-nous", href: "/contact" },
  { title: "Confidentialité", href: "/privacy" },
];

export default async function ProfilePage() {
  const stats = await getUserStats();
  const vehicles = await getVehicles();

  return (
    <>
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Profile</h2>
          <p className="text-[14px] text-neutral-500">Votre profil Alexis !</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center gap-6 cursor-pointer hover:bg-neutral-100">
        <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center text-base font-semibold text-white">
          ADJ
        </div>
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-900">
            Alexis DE JESUS
          </p>
          <p className="text-xs text-neutral-500">alexis.dejesus@gmail.com</p>
        </div>
        <ChevronRight className="w-5 h-5 text-neutral-300" />
      </div>

      {/* Stats */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-row items-center justify-around">
        <StatProfile value={stats.vehiclesCount} label="Véhicules" />
        <div className="w-px bg-neutral-200 self-stretch my-1" />
        <StatProfile value={stats.interventionsCount} label="Entretiens" />
        <div className="w-px bg-neutral-200 self-stretch my-1" />
        <StatProfile value="3" label="Mois" />
      </div>

      {/* Sections Parameters */}
      <SectionProfile title="Paramètres">
        {params.map((param, index) => (
          <Link href={param.href} key={index}>
            <SectionItemIcon
              key={index}
              icon={param.icon}
              title={param.title}
              subtitle={param.subtitle}
            />
          </Link>
        ))}
      </SectionProfile>

      {/* Sections Helps */}
      <SectionProfile title="Aide">
        {helps.map((help, index) => (
          <Link href={help.href} key={index}>
            <SectionItem title={help.title} />
          </Link>
        ))}
      </SectionProfile>

      {/* Sign Out */}
      <button className="w-full h-10 text-sm border border-red-200 bg-red-200 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
        Déconnexion
      </button>

      {/* Version */}
      <p className="text-center text-[12px] text-neutral-400 mt-2">
        Version 1.0.0
      </p>
    </>
  );
}
