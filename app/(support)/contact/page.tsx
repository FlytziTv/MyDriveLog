"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import {
  LabelBase,
  InputBase,
  GroupInput,
  TextareaBase,
  SelectBase,
} from "@/components/ui/Input";

const ContactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "support@mydrivelog.app",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: "discord.gg/mydrivelog",
    color: "text-green-600 bg-green-50",
  },
];

export default function ContactPages() {
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: "",
  });
  const [contactSent, setContactSent] = useState(false);

  const form = contactForm;
  const setForm = setContactForm;
  const sent = contactSent;
  const setSent = setContactSent;

  const handleSend = () => {
    if (form.subject && form.message && form.email) setSent(true);
  };

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
            Contactez-nous
          </h2>
          <p className="text-xs text-neutral-400">
            Nous vous répondrons sous 24 heures
          </p>
        </div>
      </div>

      {sent ? (
        <div className="flex-1 flex flex-col gap-5 items-center justify-center px-8 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <Mail className="w-7 h-7 text-green-600" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-neutral-900">
              Message envoyé !
            </p>
            <p className="text-sm text-neutral-500">
              Notre équipe vous répondra à{" "}
              <span className="font-medium text-neutral-700">email</span> sous
              24h.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            {ContactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-neutral-200 rounded-xl p-4"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${item.color.split(" ")[1]}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${item.color.split(" ")[0]}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm font-semibold text-neutral-900 mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-500">{item.value}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="text-[13px] text-neutral-400">ou</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4 ">
            <GroupInput>
              <LabelBase label="Votre email" />
              <InputBase
                type="email"
                placeholder="vous@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </GroupInput>

            <GroupInput>
              <LabelBase label="Sujet" />
              <SelectBase
                options={[
                  { value: "bug", label: "Signaler un problème" },
                  { value: "feature", label: "Suggérer une fonctionnalité" },
                  { value: "billing", label: "Question facturation" },
                  { value: "account", label: "Mon compte" },
                  { value: "other", label: "Autre" },
                ]}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </GroupInput>

            <GroupInput>
              <LabelBase label="Message" />
              <TextareaBase
                placeholder="Décrivez votre demande…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
              />
            </GroupInput>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSend}
                disabled={!form.subject || !form.message || !form.email}
                className="w-full h-10 bg-neutral-900 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Envoyer le message
              </button>

              <p className="text-center text-[12px] text-neutral-400">
                Temps de réponse moyen : moins de 12h
              </p>
            </div>
          </form>
        </>
      )}
    </>
  );
}
