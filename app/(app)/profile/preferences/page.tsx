import PreferencesClient from "@/components/SectionClient/PreferencesClient";
import { getPreferences } from "@/server/queries/preferences";

export default async function PreferencesPage() {
  const preferences = await getPreferences();

  return <PreferencesClient preferences={preferences} />;
}
