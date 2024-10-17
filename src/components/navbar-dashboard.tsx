"use client";

import { dashboardLinks } from "@/constants/dashboard-links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex max-[380px]:flex-col justify-start max-[380px]:items-start items-center gap-3 md:gap-8 bg-white/80 dark:bg-black/80 w-min p-2 rounded-xl">
      {dashboardLinks.map((link, index) => (
        <Link
          key={index}
          className={`flex justify-center items-center gap-2 p-1 rounded-xl ${
            pathname === link.href
              ? "bg-green-600 text-white"
              : "border-transparent text-black/60 dark:text-white/60 hover:text-black"
          }  dark:hover:text-white`}
          href={link.href}
        >
          <link.icon size={20} />
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavbar;
