import Link from "next/link";
import { Home, Calendar, Users, DollarSign, LogOut } from "lucide-react";
import LogoutButton from "../logout/logoutButton";

export default function OwnerSidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Owner Panel</h2>

      <nav className="flex flex-col gap-3 flex-1">
        <Link href="/dashboard/owner" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg">
          <Home size={18} /> Dashboard
        </Link>

        <Link href="/dashboard/owner/earnings" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg">
          <DollarSign size={18} /> Earnings
        </Link>

        <Link href="/dashboard/owner/bookings" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg">
          <Calendar size={18} /> Bookings
        </Link>

        <Link href="/dashboard/owner/customers" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg">
          <Users size={18} /> Customers
        </Link>
      </nav>

      <LogoutButton role="owner" />
    </aside>
  );
}
