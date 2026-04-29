import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";
import { AllMaintenance } from "../components/maintenance/AllMaintenance";
import { SmartMessage } from "../components/maintenance/SmartMessage";
import Sidebar from "../components/layout/SideBar";

export default function Maintenance() {
  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        <HeaderDashboard
          title="Maintenance & Reminders"
          description="Track and schedule vehicle maintenance tasks"
          buttonText="Add Task"
        />

        <div className="w-full grid grid-cols-3 gap-4">
          <MiniStatsCard title="Upcoming" amount="2" />
          <MiniStatsCard title="Overdue" amount="1" />
          <MiniStatsCard title="Completed" amount="1" />
        </div>

        <BlockCard title="All Maintenance Tasks">
          <AllMaintenance
            status="upcoming"
            task="Oil Change"
            vehicle="Toyota Camry"
            dueDate="2023-10-15"
            dueMileage={30000}
            estimatedCost={150}
          />
          <AllMaintenance
            status="overdue"
            task="Brake Inspection"
            vehicle="Honda Civic"
            dueDate="2023-09-20"
            dueMileage={25000}
            estimatedCost={100}
          />
          <AllMaintenance
            status="done"
            task="Tire Rotation"
            vehicle="Ford Mustang"
            dueDate="2023-10-01"
            dueMileage={28000}
            estimatedCost={50}
          />
        </BlockCard>

        <BlockCard title="Smart Reminders">
          <SmartMessage
            description={
              <>
                <strong>Tesla Model 3</strong> will reach 25,000 km in
                approximately <strong>500 km</strong>. Schedule an oil change
                soon to avoid overdue maintenance.
              </>
            }
            type="yellow"
          />
          <SmartMessage
            description={
              <>
                <strong>Honda Civic</strong> annual inspection is due in{" "}
                <strong>2 weeks</strong>. Book your appointment to stay
                compliant.
              </>
            }
            type="blue"
          />
        </BlockCard>
      </div>
    </div>
  );
}
