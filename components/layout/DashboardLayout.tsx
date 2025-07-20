"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen bg-gray-700">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden pt-5">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 ml-14 sm:ml-0">
          {/* You can now use `searchQuery` to filter content inside children */}
          {children}
        </main>
      </div>
    </div>
  );
};
