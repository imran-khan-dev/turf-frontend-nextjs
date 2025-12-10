// import { Home, Calendar, Users, Settings, FormInput } from "lucide-react";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const dashboardConfig: Record<string, any> = {
//   owner: {
//     sidebar: [
//       { label: "Dashboard", href: "/dashboard/owner/bookings", icon: Home },
//       { label: "Bookings", href: "/dashboard/owner/bookings", icon: Calendar },
//       { label: "Customers", href: "/dashboard/owner/customers", icon: Users },
//       { label: "Add Turf Profile", href: "/dashboard/owner/add-turf-profile", icon: FormInput },
//       { label: "Update Turf Profile", href: "/dashboard/owner/update-turf-profile", icon: FormInput },
//       { label: "Add Turf Field", href: "/dashboard/owner/add-turf-field", icon: FormInput },

//     ],
//   },

//   admin: {
//     sidebar: [
//       { label: "Dashboard", href: "/dashboard/admin", icon: Home },
//       { label: "All Turfs", href: "/dashboard/admin/turfs", icon: Calendar },
//       { label: "Users", href: "/dashboard/admin/users", icon: Users },
//       { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
//     ],
//   },

//   turfUser: {
//     sidebar: [
//       { label: "My Bookings", href: "/turfProfileSlug/user-dashboard/my-bookings", icon: Calendar },
//       { label: "Profile", href: "/turfProfileSlug/user-dashboard/my-profile", icon: Users },
//     ],
//   },
// };


import { Home, Calendar, Users, Settings, FormInput } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type DashboardConfigType = {
  owner: { sidebar: SidebarItem[] };
  admin: { sidebar: SidebarItem[] };
  turfUser: (profileSlug: string) => { sidebar: SidebarItem[] };
};

export const dashboardConfig: DashboardConfigType = {
  owner: {
    sidebar: [
      { label: "Dashboard", href: "/dashboard/owner/bookings", icon: Home },
      { label: "Bookings", href: "/dashboard/owner/bookings", icon: Calendar },
      { label: "Customers", href: "/dashboard/owner/customers", icon: Users },
      { label: "Add Turf Profile", href: "/dashboard/owner/add-turf-profile", icon: FormInput },
      { label: "Update Turf Profile", href: "/dashboard/owner/update-turf-profile", icon: FormInput },
      { label: "Add Turf Field", href: "/dashboard/owner/add-turf-field", icon: FormInput },
    ],
  },

  admin: {
    sidebar: [
      { label: "Dashboard", href: "/dashboard/admin", icon: Home },
      { label: "All Turf Customers", href: "/dashboard/admin/all-turf-users", icon: Users },
      { label: "All Turf Owners", href: "/dashboard/admin/all-turf-owners", icon: Users },
      { label: "Add Admin", href: "/dashboard/admin/add-admin", icon: FormInput },
      { label: "Delete Admin", href: "/dashboard/admin/delete-admin", icon: FormInput },
    ],
  },

  turfUser: (profileSlug: string) => ({
    sidebar: [
      { label: "My Bookings", href: `/${profileSlug}/user-dashboard/my-bookings`, icon: Calendar },
      { label: "Profile", href: `/${profileSlug}/user-dashboard/my-profile`, icon: Users },
    ],
  }),
};
