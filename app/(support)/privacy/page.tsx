"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import { question_privacy } from "@/lib/support";
import QuestionCard from "@/components/help/questionCard";

const badges = [
  {
    icon: Shield,
    label: "RGPD conforme",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Lock,
    label: "Chiffrement AES-256",
    color: "text-blue-600 bg-blue-50",
  },
];

export default function Privacy() {
  const [openPrivacySection, setOpenPrivacySection] = useState<number | null>(
    0,
  );
  const openSection = openPrivacySection;
  const setOpenSection = setOpenPrivacySection;

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
          <h2 className="text-2xl font-bold text-neutral-900">
            Confidentialité
          </h2>
          <p className="text-xs text-neutral-400">
            Dernière mise à jour : 1 juin 2025
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-3">
        {badges.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${item.color.split(" ")[1]}`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${item.color.split(" ")[0]}`}
                strokeWidth={2}
              />
              <span
                className={`text-xs font-medium ${item.color.split(" ")[0]}`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <p className="text-xs text-neutral-600 leading-relaxed">
          Chez MyDriveLog, la protection de vos données personnelles est une
          priorité. Cette politique explique de façon claire et transparente
          comment nous collectons, utilisons et protégeons vos informations.
        </p>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-2">
        {question_privacy.map((section, i) => {
          const open = openSection === i;
          return (
            <QuestionCard
              key={i}
              title={section.title}
              content={section.content}
              open={open}
              setOpenSection={setOpenSection}
              i={i}
            />
          );
        })}
      </div>

      {/* Contact */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-neutral-900">
            Questions sur vos données ?
          </p>
          <p className="text-xs text-neutral-500">
            Notre délégué à la protection des données est disponible pour toute
            question.
          </p>
        </div>
        <Link
          href="/contact"
          className="h-9 px-4 w-fit flex items-center justify-center bg-neutral-900 text-white rounded-lg text-xs font-medium"
        >
          Contacter notre DPO
        </Link>
      </div>
    </>
  );
}
