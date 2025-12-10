/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bell } from "lucide-react";

// export default function Navbar({ user }: any) {
//   return (
//     <header className="w-full border-b bg-white h-14 flex items-center px-4 justify-between">
//       <div className="flex items-center gap-3">
//         <h1 className="font-semibold">Welcome, {user?.name ?? "User"}</h1>
//       </div>

//       <div className="flex items-center gap-4">
//         <Bell size={20} />
//         <img
//           src={user?.photo ?? "/default-user.png"}
//           className="w-8 h-8 rounded-full border"
//         />
//       </div>
//     </header>
//   );
// }

export default function Navbar({ user, open, setOpen }: any) {
  return (
    <header className="w-full border-b bg-white h-14 flex items-center px-4 justify-between">
      {/* Hamburger for mobile */}
      <button
        className="p-2 mr-3 md:hidden border rounded bg-white shadow"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <h1 className="font-semibold">Welcome, {user?.name ?? "User"}</h1>

      <div className="flex items-center gap-4">
        <img
          src={user?.photo || "https://res.cloudinary.com/ddmtiv1si/image/upload/v1765302029/turf_users/mgvs2qwq4lj8gnqd5hgp.jpg"}
          onError={(e) => {
            e.currentTarget.src = "https://res.cloudinary.com/ddmtiv1si/image/upload/v1765302029/turf_users/mgvs2qwq4lj8gnqd5hgp.jpg";
          }}
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
}
