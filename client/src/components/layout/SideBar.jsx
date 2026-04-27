import { useNavigate, NavLink } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Logo from "../icons/logo";
import { Home, Car, Map, LogOut, User, Settings } from "lucide-react";

export default function SideBar({ user }) {
  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-app-border fixed flex flex-col p-4">
      {/* Logo */}
      <div className="flex flex-row items-center gap-2">
        <Logo size={22} />
        <h1 className="text-xl font-semibold text-app-primary">MyDriveLog</h1>
      </div>
      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1">
        <NavItem label="Accueil" href="/dashboard" icon={Home} />
        <NavItem label="Véhicules" href="/vehicles" icon={Car} />
        <NavItem label="Road trips" href="/trips" icon={Map} />
      </nav>
      {/* Logout en bas */}
      <div className="mt-auto flex flex-col gap-3">
        <UserProfile user={user} />
      </div>
    </aside>
  );
}

function NavItem({ label, href, icon: Icon }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center gap-3 text-sm px-3 py-2 rounded-md transition-all duration-200
        ${
          isActive
            ? "bg-primary-light text-primary font-medium"
            : "text-app-muted hover:bg-surface-hover hover:text-app-text"
        }`
      }
    >
      <Icon size={18} className="opacity-80" />
      {label}
    </NavLink>
  );
}

function UserProfile({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex flex-row items-center gap-2.5 p-2.5 rounded-lg bg-app-bg border border-app-border hover:bg-surface-hover transition-colors duration-200">
          <div className="uppercase h-9 w-9 shrink-0 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm">
            {user ? user.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium text-app-text">
              {user || "User"}
            </p>
            <p className="text-xs text-app-muted truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="min-w-[200px] bg-app-bg border border-app-border rounded-lg p-1.5 shadow-xl animate-in fade-in zoom-in duration-200 z-50"
        >
          <DropdownMenu.Item
            onClick={() => navigate(`/profile`)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-app-text outline-none rounded-md cursor-pointer hover:bg-surface-hover transition-colors"
          >
            <User size={18} className="text-app-muted" />
            Profil
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => navigate(`/settings`)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-app-text outline-none rounded-md cursor-pointer hover:bg-surface-hover transition-colors"
          >
            <Settings size={18} className="text-app-muted" />
            Paramètres
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-app-border my-1.5" />

          <DropdownMenu.Item
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 outline-none rounded-md cursor-pointer hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
