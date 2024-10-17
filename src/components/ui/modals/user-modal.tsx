"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import LinkedinIcon from "../icons/social/linkedin-icon";
import { LayoutDashboard, SettingsIcon, LogOutIcon, XIcon } from "lucide-react";
import CustomHr from "../custom-hr";
import AnimatedContainer from "../animations/animated-container";
import AnimatedItems from "../animations/animated-items";
import { ThemeIcon, useThemeToggle } from "@/hooks/useThemeToggle";
import useModal from "@/hooks/useModal";

const ModalUser = ({ userData }) => {
  const { isOpen, closeModal, openModal, toggleModal } = useModal("ModalUser");
  const { theme, handleToggleTheme } = useThemeToggle();

  return (
    <>
      {userData && (
        <button
          onClick={toggleModal}
          className="flex justify-center items-center gap-2 hover:scale-105 transition"
          type="button"
        >
          <span>
            <img
              className="rounded-full w-12 border-2 border-green-600"
              src={userData.image}
              alt={`Imagen de ${userData.name}`}
            />
          </span>

          <p className="hidden sm:flex font-bold">{userData.name}</p>
        </button>
      )}

      {isOpen && userData && (
        <AnimatedContainer
          className="px-10 lg:px-48 fixed top-10 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="relative bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md py-4 px-10">
            <div className="flex items-center justify-end py-1">
              <button
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center mb-2"
              >
                <XIcon size={15} />
              </button>
            </div>
            <CustomHr spacing="mb-3" />
            <h3 className="mt-3 text-xl text-center font-semibold text-gray-900 dark:text-white">
              {userData.name} 🖐
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {userData.email}
            </p>
            <div className="my-4 space-y-2">
              <AnimatedItems>
                <Link
                  href="/dashboard"
                  className="flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                >
                  <LayoutDashboard size={20} />
                  Panel de control
                </Link>
              </AnimatedItems>
              <AnimatedItems>
                <Link
                  href="/dashboard/settings"
                  className="flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                >
                  <SettingsIcon size={20} />
                  Configuración
                </Link>
              </AnimatedItems>
              <AnimatedItems>
                <a
                  className="flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                  href="https://www.linkedin.com/in/alexander-amenta/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon />
                  Contacto
                </a>
              </AnimatedItems>

              <div className="md:hidden">
                <AnimatedItems>
                  <button
                    onClick={handleToggleTheme}
                    className="w-full flex justify-start items-center gap-1 hover:bg-gray-100 dark:hover:bg-white/10 transition p-1 rounded-md"
                  >
                    <ThemeIcon />
                    {theme === "light" ? "Dark" : "Light"}
                  </button>
                </AnimatedItems>
              </div>

              <AnimatedItems>
                <button
                  onClick={() => signOut()}
                  className="w-full flex justify-start items-center gap-1 hover:bg-red-100 dark:hover:bg-red-950 transition p-1 rounded-md"
                >
                  <LogOutIcon size={20} />
                  Salir
                </button>
              </AnimatedItems>
            </div>
          </div>
        </AnimatedContainer>
      )}
    </>
  );
};

export default ModalUser;
