import { Home, Calendar, Users, DollarSign, Settings, FormInput } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dashboardConfig: Record<string, any> = {
  owner: {
    sidebar: [
      { label: "Dashboard", href: "/dashboard/owner/bookings", icon: Home },
      { label: "Bookings", href: "/dashboard/owner/bookings", icon: Calendar },
      { label: "Customers", href: "/dashboard/owner/customers", icon: Users },
      { label: "Add Turf Profile", href: "/dashboard/owner/add-turf-profile", icon: FormInput },
      { label: "Update Turf Profile", href: "/dashboard/owner/update-turf-profile", icon: FormInput },
      { label: "Add Turf Field", href: "/dashboard/owner/add-turf-field", icon: FormInput },
      { label: "Update Turf Field", href: "/dashboard/owner/update-turf-field", icon: FormInput },

    ],
  },

  admin: {
    sidebar: [
      { label: "Dashboard", href: "/dashboard/admin", icon: Home },
      { label: "All Turfs", href: "/dashboard/admin/turfs", icon: Calendar },
      { label: "Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  },

  turfUser: {
    sidebar: [
      { label: "My Bookings", href: "/dashboard/user/bookings", icon: Calendar },
      { label: "Profile", href: "/dashboard/user/profile", icon: Users },
    ],
  },
};
