import { HeaderDashboard } from "../components/layout/HeaderDashboard";
import { DocsMessage } from "../components/documents/DocsCard";
import UploadCard from "../components/documents/UploadCard";
import { MiniStatsCard } from "../components/layout/MiniStatsCard";
import { BlockCard } from "../components/layout/BlockCard";
import Sidebar from "../components/layout/SideBar";
import { useTranslation } from "react-i18next";

export default function DocumentsPage() {
  const { t } = useTranslation("documents");
  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        <HeaderDashboard
          title={t("title")}
          description={t("subtitle")}
          buttonText={t("add_expense")}
        />
        <div className="w-full grid grid-cols-4 gap-4">
          <MiniStatsCard title={t("stats.total_documents")} amount="4" />
          <MiniStatsCard title={t("stats.insurance")} amount="1" />
          <MiniStatsCard title={t("stats.maintenance")} amount="2" />
          <MiniStatsCard title={t("stats.fuel")} amount="1" />
        </div>

        <BlockCard title={t("all_documents_block.title")}>
          <DocsMessage
            name="Insurance Policy.pdf"
            type="PDF"
            vehicle="2020 Toyota Camry"
            date="2024-05-01"
            size="1.2 MB"
          />
        </BlockCard>

        <BlockCard title={t("upload_documents_block.title")}>
          <UploadCard />
        </BlockCard>
      </div>
    </div>
  );
}
