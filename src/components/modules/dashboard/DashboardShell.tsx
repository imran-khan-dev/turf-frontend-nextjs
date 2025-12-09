/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

export default function DashboardShell({ user, role, children, turfProfileSlug = null }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      
      {/* Sidebar receives mobile open state */}
      <Sidebar role={role} open={open} setOpen={setOpen} turfProfileSlug={turfProfileSlug} />

      <div className="flex-1 flex flex-col">
        
        {/* Navbar receives toggle button */}
        <Navbar user={user} open={open} setOpen={setOpen} />

        <main className="flex-1 overflow-y-auto p-6 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
