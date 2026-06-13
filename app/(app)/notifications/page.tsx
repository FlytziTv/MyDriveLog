import NotificationsClient from "@/components/SectionClient/NotificationsListClient";
import { getNotifications } from "@/server/queries/notifications";

export default async function NotificationsPage() {
  const notifications = await getNotifications();
  return <NotificationsClient initialNotifications={notifications} />;
}
