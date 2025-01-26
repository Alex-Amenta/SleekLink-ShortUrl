"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const ButtonGoogle = () => {
  const signInWithGoogle = () => {
    return signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      className="mt-2 mb-10 p-2 flex justify-center items-center gap-3 bg-white dark:hover:bg-white/85 text-black shadow-md border border-slate-300 rounded-md hover:border-slate-500 dark:hover:border-slate-400 transition"
    >
      <Image src="/google.svg" alt="Icono de google" width={20} height={20} />
      Iniciar Sesión con Google
    </button>
  );
};

export default ButtonGoogle;
