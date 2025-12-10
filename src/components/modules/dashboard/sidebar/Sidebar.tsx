"use client";

import Link from "next/link";
import {
  dashboardConfig,
  SidebarItem,
} from "@/services/dashboard/dashboardConfig";
import LogoutButton from "../Logout/LogoutButton";

interface SidebarProps {
  role: "owner" | "admin" | "turfUser" | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  turfProfileSlug?: string | null;
}

export default function Sidebar({
  role,
  open,
  setOpen,
  turfProfileSlug,
}: SidebarProps) {
  if (!role) return null;

  let items: SidebarItem[] = [];

  if (role === "turfUser" && turfProfileSlug) {
    items = dashboardConfig.turfUser(turfProfileSlug).sidebar;
  } else if (role === "owner" || role === "admin") {
    items = dashboardConfig[role].sidebar;
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r p-4
          flex flex-col justify-between
          transition-transform
          md:static md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <h2 className="text-xl font-bold mb-6 capitalize">{role} Panel</h2>

          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t mt-4">
          <LogoutButton role={role} />
        </div>
      </aside>
    </>
  );
}
