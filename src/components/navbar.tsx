"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ModalUser from "./ui/modals/user-modal";
import ThemeSwitcher from "./ui/theme-switcher";
import GithubIcon from "./ui/icons/social/github-icon";
import LinkedinIcon from "./ui/icons/social/linkedin-icon";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar_blur sticky top-0 z-10 mb-5 px-10 lg:px-48">
      <div className="flex justify-between items-center py-3">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-sleeklink.png"
              alt="Logo oficial de SleekLink"
              width={70}
              height={70}
            />
            <p className="hidden text-2xl lg:flex font-semibold">SleekLink</p>
          </div>
        </Link>
        <div className="flex justify-center items-center gap-2">
          <a
            href="https://www.linkedin.com/in/alexander-amenta/"
            target="_blank"
            rel="noopener noreferrer "
            className="hover:bg-black/10 dark:hover:bg-white/10 transition p-2 rounded-md group"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/Alex-Amenta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-black/10 dark:hover:bg-white/10 transition p-2 rounded-md group"
          >
            <GithubIcon />
          </a>
          <div className="max-sm:hidden">
            <ThemeSwitcher className="p-2" />
          </div>

          {session ? (
            <ModalUser userData={session.user} />
          ) : (
            <Link
              href="/auth/login"
              className="p-2 px-3
            bg-green-700 text-white shadow-md 
            border border-green-600 hover:bg-green-800 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
