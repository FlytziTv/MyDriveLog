import NavBar from "@/components/layout/NavBar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full max-w-[430px] mx-auto min-h-screen pb-24 px-6 py-8 relative bg-[#FAFAFA] overflow-hidden flex flex-col gap-6">
      {children}
      <NavBar />
    </main>
  );
}
