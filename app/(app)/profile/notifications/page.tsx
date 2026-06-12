import NotificationsClient from "@/components/SectionClient/NotificationsClient";
import { getPreferences } from "@/server/queries/preferences";

export default async function NotificationsPage() {
  const preferences = await getPreferences();
  return <NotificationsClient preferences={preferences} />;
}
