import { LucideIcon } from "lucide-react";

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
  km: number;
}

export type {
  NavBarProps,
  SectionIconProfileProps,
  SectionProfileProps,
  SectionProfileSupportProps,
  StatProfileProps,
  DetailInterCardProps,
};
