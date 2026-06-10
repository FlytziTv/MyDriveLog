import { NavBarProps } from "@/types";
import { House, Car, History, UserRound } from "lucide-react";

export const NavBarItems: NavBarProps[] = [
  {
    icon: House,
    label: "Accueil",
    name: "home",
    href: "/dashboard",
  },
  {
    icon: Car,
    label: "Garage",
    name: "garage",
    href: "/vehicles",
  },
  {
    icon: History,
    label: "Historique",
    name: "historique",
    href: "/historique",
  },
  {
    icon: UserRound,
    label: "Profile",
    name: "profile",
    href: "/profile",
  },
];
