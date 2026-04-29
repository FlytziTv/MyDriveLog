import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { StatsMaintenance } from "../components/maintenance/StatsCard";
import {
  TasksCard,
  TasksMessage,
  SmartMessage,
} from "../components/maintenance/TasksCard";

export default function Maintenance() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="Maintenance & Reminders"
          description="Track and schedule vehicle maintenance tasks"
          buttonText="Add Task"
        />

        <div className="w-full grid grid-cols-3 gap-4">
          <StatsMaintenance title="Upcoming" amount="2" />
          <StatsMaintenance title="Overdue" amount="1" />
          <StatsMaintenance title="Completed" amount="1" />
        </div>

        <TasksCard>
          <TasksMessage
            status="upcoming"
            task="Oil Change"
            vehicle="Toyota Camry"
            dueDate="2023-10-15"
            dueMileage={30000}
            estimatedCost={150}
          />
          <TasksMessage
            status="overdue"
            task="Brake Inspection"
            vehicle="Honda Civic"
            dueDate="2023-09-20"
            dueMileage={25000}
            estimatedCost={100}
          />
          <TasksMessage
            status="done"
            task="Tire Rotation"
            vehicle="Ford Mustang"
            dueDate="2023-10-01"
            dueMileage={28000}
            estimatedCost={50}
          />
        </TasksCard>

        <TasksCard>
          <SmartMessage
            description="Tesla Model 3 will reach 25,000 km in approximately 500 km. Schedule an oil change soon to avoid overdue maintenance."
            type="yellow"
          />
          <SmartMessage
            description="Honda Civic annual inspection is due in 2 weeks. Book your appointment to stay compliant."
            type="blue"
          />
        </TasksCard>
      </div>
    </div>
  );
}
