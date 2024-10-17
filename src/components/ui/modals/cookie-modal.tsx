"use client";

import { CookieIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";

const CookieModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const acceptedCookie = localStorage.getItem("acceptCookie");
    if (acceptedCookie) {
      setIsOpen(false);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAccept = () => {
    localStorage.setItem("acceptCookie", "true");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="bg-white dark:bg-[#131313] p-4 rounded-md max-w-lg w-full mx-auto md:mb-10 shadow-lg outline-none self-end"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <h3 className="text-xl font-bold mb-2">
        <span className="inline-flex align-middle rounded-md p-1 bg-amber-600">
          <CookieIcon />
        </span>{" "}
        Cookies
      </h3>
      <p className="hidden sm:block text-black/80 dark:text-white/80">
        Usamos cookies para mejorar tu experiencia en nuestro sitio. Estas
        cookies nos permiten personalizar el contenido que ves, ofrecer
        funcionalidades de redes sociales y analizar nuestro tráfico. Al
        aceptar, consientes el uso de cookies de acuerdo con nuestra política de
        privacidad. Puedes cambiar tus preferencias de cookies en cualquier
        momento.
      </p>
      <p className="sm:hidden">
        Utilizamos cookies para mejorar tu experiencia, personalizar contenido y
        analizar tráfico. Al aceptar, consientes el uso de cookies según nuestra
        política de privacidad. Puedes cambiar tus preferencias en cualquier
        momento.
      </p>
      <div className="mt-6 flex justify-end items-center gap-4">
        <button
          onClick={handleAccept}
          className=" shadow-lg p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition"
        >
          Confirmar
        </button>

        <button
          onClick={closeModal}
          className="shadow-lg p-2 border rounded-md text-black bg-white hover:bg-white/80 transition"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default CookieModal;
