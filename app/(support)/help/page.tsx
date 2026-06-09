"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Zap, Lock, ExternalLink } from "lucide-react";
import { faqs } from "@/lib/support";
import { SectionProfile } from "@/components/profile/Sections";
import QuestionCard from "@/components/help/questionCard";

const helpActions = [
  {
    icon: FileText,
    label: "Guide de démarrage",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Zap,
    label: "Nouveautés",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Lock,
    label: "Sécurité",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: ExternalLink,
    label: "Tutoriels vidéo",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function Help() {
  const [openHelpSection, setOpenHelpSection] = useState<number | null>(null);
  const openSection = openHelpSection;
  const setOpenSection = setOpenHelpSection;

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
            Centre d&apos;aide
          </h2>
          <p className="text-xs text-neutral-400">
            Trouvez des réponses à vos questions
          </p>
        </div>
      </div>

      {/* Button Action */}
      <div className="grid grid-cols-2 gap-2">
        {helpActions.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color.split(" ")[0]}`}
              >
                <Icon
                  className={`w-4 h-4 ${item.color.split(" ")[1]}`}
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-[13px] font-medium text-neutral-800 leading-tight">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {faqs.map((faq, index) => (
        <SectionProfile key={index} title={faq.category}>
          {faq.questions.map((question, i) => {
            const open = openSection === i;

            return (
              <QuestionCard
                key={i}
                title={question.q}
                content={question.a}
                open={open}
                setOpenSection={setOpenSection}
                i={i}
              />
            );
          })}
        </SectionProfile>
      ))}

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
