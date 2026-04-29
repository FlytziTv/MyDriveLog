import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { DocsCard, DocsMessage } from "../components/documents/DocsCard";
import { StatsCard } from "../components/documents/StatsCard";
import UploadCard from "../components/documents/UploadCard";

export default function DocumentsPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="Documents"
          description="Store and manage your vehicle-related documents"
          buttonText="Upload Document"
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <StatsCard title="Total Documents" amount="4" />
          <StatsCard title="Insurance" amount="1" />
          <StatsCard title="Maintenance" amount="2" />
          <StatsCard title="Fuel" amount="1" />
        </div>

        <DocsCard title="All Documents">
          <DocsMessage
            name="Insurance Policy.pdf"
            type="PDF"
            vehicle="2020 Toyota Camry"
            date="2024-05-01"
            size="1.2 MB"
          />
        </DocsCard>
        <DocsCard title="Upload New Document">
          <UploadCard />
        </DocsCard>
      </div>
    </div>
  );
}
