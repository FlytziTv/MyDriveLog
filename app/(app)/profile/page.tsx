import {
  SectionProfile,
  SectionItem,
  SectionItemIcon,
} from "@/components/profile/Sections";
import { StatProfile } from "@/components/profile/StatsCard";
import { ChevronRight, User, Bell, SettingsIcon, Zap } from "lucide-react";

const params = [
  {
    icon: User,
    title: "Informations personnelles",
    subtitle: "Nom, email, téléphone",
  },
  { icon: Bell, title: "Notifications", subtitle: "Rappels et alertes" },
  { icon: SettingsIcon, title: "Préférences", subtitle: "Unités, langue" },
  { icon: Zap, title: "Abonnement", subtitle: "Premium · Actif" },
];

const helps = [
  { title: "Centre d'aide" },
  { title: "Contactez-nous" },
  { title: "Confidentialité" },
];

export default function ProfilePage() {
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
        <StatProfile value="3" label="Véhicules" />
        <div className="w-px bg-neutral-200 self-stretch my-1" />
        <StatProfile value="0" label="Entretiens" />
        <div className="w-px bg-neutral-200 self-stretch my-1" />
        <StatProfile value="3" label="Mois" />
      </div>

      {/* Sections Parameters */}
      <SectionProfile title="Paramètres">
        {params.map((param, index) => (
          <SectionItemIcon
            key={index}
            icon={param.icon}
            title={param.title}
            subtitle={param.subtitle}
          />
        ))}
      </SectionProfile>

      {/* Sections Helps */}
      <SectionProfile title="Aide">
        {helps.map((help, index) => (
          <SectionItem key={index} title={help.title} />
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
