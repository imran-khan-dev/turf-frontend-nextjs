/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, Menu } from "lucide-react";

export default function OwnerNavbar({ user }: any) {
  return (
    <header className="w-full border-b bg-white h-14 flex items-center px-4 justify-between">
      <div className="flex items-center gap-3">
        <Menu className="md:hidden" />
        <h1 className="font-semibold">Welcome, {user.name}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Bell size={20} />
        <img
        //   src={user.photo ?? "/default-user.png"}
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
}
