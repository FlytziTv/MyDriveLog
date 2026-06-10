"use client";

import { useState } from "react";

import NotifCard from "@/components/dashboard/notifCard";
import { FakeNotifications } from "@/lib/fake";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [notifList, setNotifList] = useState(FakeNotifications);

  const notifs = notifList;
  const unreadCount = notifs.filter((n) => n.unread).length;

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
          <h2 className="text-2xl font-bold text-neutral-900">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-neutral-500 mt-0.5">
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {FakeNotifications.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-neutral-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-neutral-900 mb-1">
            Aucune notification
          </p>
          <p className="text-xs text-neutral-400">Vous êtes à jour !</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {notifList.map((notif) => (
          <NotifCard
            key={notif.id}
            id={notif.id}
            unread={notif.unread}
            icon={notif.icon}
            color={notif.color}
            title={notif.title}
            time={notif.time}
            body={notif.body}
            dismiss={(id) =>
              setNotifList((list) => list.filter((n) => n.id !== id))
            }
          />
        ))}
      </div>

      {/* Préférences de notification */}
      <Link
        href="/profile/notifications"
        className="w-full h-11 border border-neutral-200 bg-white text-neutral-600 rounded-xl text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
      >
        <Bell size={16} strokeWidth={1.5} />
        Gérer les préférences de notification
      </Link>
    </>
  );
}
