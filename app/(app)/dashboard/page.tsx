import { Bell } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
          <p className="text-[14px] text-neutral-500">Bonjour Alexis</p>
        </div>
        <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center relative transition-colors">
          <Bell className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </>
  );
}
