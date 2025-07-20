"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  NewspaperIcon,
  FireIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navLinks = [
    {
      name: "Feed",
      path: "/dashboard/feed",
      icon: <NewspaperIcon className="h-5 w-5" />,
    },
    {
      name: "Trending",
      path: "/dashboard/trending",
      icon: <FireIcon className="h-5 w-5" />,
    },
    {
      name: "Favorites",
      path: "/dashboard/favourites",
      icon: <BookmarkIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`
        h-full bg-white dark:bg-black shadow-lg p-4 transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"}
        fixed sm:relative sm:z-0 z-50 top-0 left-0
      `}
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && (
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-800 dark:text-white hover:text-gray-400"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.name}
              href={link.path}
              className={`flex items-center px-2 py-2 rounded text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white font-semibold"
                  : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
              }`}
            >
              {React.cloneElement(link.icon, {
                className: `h-5 w-5 ${
                  collapsed ? "mx-auto" : "mr-3"
                } transition-all`,
              })}
              {!collapsed && link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
