"use client";

import { NavBarItems } from "@/lib/navbar";
import { NavBarProps } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const leftItems = NavBarItems.slice(0, 2);
  const rightItems = NavBarItems.slice(2);

  return (
    <div className="fixed max-w-[430px] mx-auto bottom-0 left-0 right-0 p-4 bg-white border-t border-neutral-200">
      <div className="flex items-center justify-around">
        {leftItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}

        <button className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center shadow-lg">
          <Plus size={20} className="text-white" />
        </button>

        {rightItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

function NavItem({ icon, label, name, href }: NavBarProps) {
  const Icon = icon;
  const placeholder = usePathname();

  return (
    <Link
      href={href}
      title={name}
      className={`h-9.5 w-15 flex flex-col items-center gap-1 ${placeholder === href ? "text-neutral-900" : "text-neutral-400"}`}
    >
      <Icon size={18} />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
