import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Car,
  TrendingUp,
  Wrench,
  FileText,
  LogOut,
  Route,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Car, label: "Vehicles", href: "/vehicles" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Wrench, label: "Maintenance", href: "/maintenance" },
  { icon: FileText, label: "Documents", href: "/documents" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen sticky top-0 p-2 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      <div className="flex items-center gap-2.5 px-3 py-3 mb-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sidebar-foreground flex items-center justify-center shrink-0">
          <Route size={16} className="text-sidebar" />
        </div>
        <span className="font-semibold text-sm text-sidebar-foreground">
          MyDriveLog
        </span>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150 " +
                (isActive
                  ? "bg-sidebar-foreground text-sidebar font-medium"
                  : "text-sidebar-foreground/50 hover:text-sidebar-foreground")
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors duration-150 cursor-pointer w-full shrink-0">
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
