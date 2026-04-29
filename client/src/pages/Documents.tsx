import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { DocsMessage } from "../components/documents/DocsCard";
import UploadCard from "../components/documents/UploadCard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";
import Sidebar from "../components/layout/SideBar";

export default function DocumentsPage() {
  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        <HeaderDashboard
          title="Documents"
          description="Store and manage your vehicle-related documents"
          buttonText="Upload Document"
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <MiniStatsCard title="Total Documents" amount="4" />
          <MiniStatsCard title="Insurance" amount="1" />
          <MiniStatsCard title="Maintenance" amount="2" />
          <MiniStatsCard title="Fuel" amount="1" />
        </div>

        <BlockCard title="All Documents">
          <DocsMessage
            name="Insurance Policy.pdf"
            type="PDF"
            vehicle="2020 Toyota Camry"
            date="2024-05-01"
            size="1.2 MB"
          />
        </BlockCard>

        <BlockCard title="Upload New Document">
          <UploadCard />
        </BlockCard>
      </div>
    </div>
  );
}
