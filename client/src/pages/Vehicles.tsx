import { HeaderDashboard } from "../components/layout/HeaderDashboard";

export default function VehiclesPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="My Vehicles"
          description="Manage and track all your vehicles"
          buttonText="Add Vehicle"
        />
      </div>
    </div>
  );
}
