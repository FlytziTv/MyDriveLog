import { LucideIcon } from "lucide-react";
import { MaintenanceType, ExpenseCategory } from "@prisma/client";

interface NavBarProps {
  icon: LucideIcon;
  label: string;
  name: string;
  href: string;
}

interface StatProfileProps {
  value: string | number;
  label: string;
}

interface SectionProfileProps {
  title: string;
  children: React.ReactNode;
}

interface SectionIconProfileProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

interface SectionProfileSupportProps {
  title: string;
}

interface DetailInterCardProps {
  icon: LucideIcon;
  type: string;
  vehicle: string;
  cost: number;
  date: string;
  km?: number;
}

interface MiniInterCardProps {
  icon: LucideIcon;
  type: string;
  data: string | number;
  cost: number;
}

interface MiniaVehicleCardProps {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number | string;
  plate?: string;
  km: number;
}

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

interface SectionDashProps {
  title: string;
  link?: string;
  textLink?: string;
  children: React.ReactNode;
}

interface CategoryProps {
  label: string;
  icon: LucideIcon;
}

interface HistoryItem {
  id: string;
  kind: "maintenance" | "expense";
  type: MaintenanceType | ExpenseCategory;
  vehicleId: string;
  cost: number;
  date: string;
  km?: number;
}

interface MiniStatsCarProps {
  km: number;
  date?: string | null;
  total: string | number;
}

interface QuestionCardProps {
  title: string;
  content: string;
  open: boolean;
  setOpenSection: (id: string | number | null) => void;
  i: string | number;
}

interface SubscriptionCardProps {
  title: string;
  description: string;
  price: number;
  priceAnnual?: number;
  features: string[];
  actif?: boolean;
}

interface VehicleMinimal {
  id: string;
  name: string;
}

export type {
  NavBarProps,
  SectionIconProfileProps,
  SectionProfileProps,
  SectionProfileSupportProps,
  StatProfileProps,
  DetailInterCardProps,
  MiniInterCardProps,
  MiniaVehicleCardProps,
  StatCardProps,
  SectionDashProps,
  CategoryProps,
  HistoryItem,
  MiniStatsCarProps,
  QuestionCardProps,
  SubscriptionCardProps,
  VehicleMinimal,
};
