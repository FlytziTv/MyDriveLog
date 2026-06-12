import { getPreferences } from "@/server/queries/preferences";
import { getVehicles } from "@/server/queries/vehicle";
import { PreferencesProvider } from "@/lib/preferences-context";
import NavBar from "@/components/layout/NavBar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [preferences, vehicles] = await Promise.all([
    getPreferences(),
    getVehicles(),
  ]);

  return (
    <PreferencesProvider preferences={preferences}>
      <main className="w-full max-w-[430px] mx-auto min-h-screen pb-24 px-6 py-8 relative bg-[#FAFAFA] overflow-hidden flex flex-col gap-6">
        {children}
        <NavBar vehicles={vehicles} />
      </main>
    </PreferencesProvider>
  );
}
