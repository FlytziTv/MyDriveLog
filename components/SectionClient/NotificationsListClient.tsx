"use client";

import { useState } from "react";
import NotifCard from "@/components/dashboard/notifCard";
import { NotificationMeta } from "@/lib/notifications";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";
import { dismissNotification } from "@/server/actions/notifications";
import { Notification } from "@prisma/client";

function timeAgo(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(hours / 24);

  if (hours < 1) return "À l'instant";
  if (hours < 24) return `${hours}h`;
  return `${days}j`;
}

export default function NotificationsClient({
  initialNotifications,
}: {
  initialNotifications: Notification[];
}) {
  const [notifList, setNotifList] = useState(initialNotifications);
  const unreadCount = notifList.filter((n) => n.unread).length;

  async function handleDismiss(id: string) {
    setNotifList((list) => list.filter((n) => n.id !== id));
    await dismissNotification(id);
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
          <h2 className="text-2xl font-bold text-neutral-900">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-neutral-500 mt-0.5">
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {notifList.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-neutral-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-neutral-900 mb-1">
            Aucune notification
          </p>
          <p className="text-xs text-neutral-400">Vous êtes à jour !</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifList.map((notif) => {
            const { icon, color } = NotificationMeta[notif.type];
            return (
              <NotifCard
                key={notif.id}
                id={notif.id}
                unread={notif.unread}
                icon={icon}
                color={color}
                title={notif.title}
                time={timeAgo(notif.createdAt)}
                body={notif.body}
                dismiss={handleDismiss}
              />
            );
          })}
        </div>
      )}

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
