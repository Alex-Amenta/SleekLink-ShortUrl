"use client";

import { toast } from "react-toastify";
import AnimationModal from "../animations/animation-modal";
import CustomHr from "../custom-hr";
import { useForm } from "react-hook-form";
import { useUrlStore } from "@/zustand/store";

interface HashUrlModal {
  isOpen: boolean;
  onRequestClose: () => void;
}

const HashUrlModal = ({ isOpen, onRequestClose }: HashUrlModal) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { createShortUrl } = useUrlStore();

  const onSubmit = handleSubmit(async (data) => {
    const { title, originalUrl, customDomain } = data;

    const success = await createShortUrl(title, originalUrl, customDomain);

    if (success) {
      toast.success("URL creada con éxito!");
      onRequestClose();
    } else {
      toast.error("Error al acortar la URL");
    }
  });

  return (
    <AnimationModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2 className="text-center font-bold text-2xl">Acortar URL con hash</h2>
      <CustomHr spacing="mb-7 mt-2" />
      <form onSubmit={onSubmit} className="flex flex-col">
        <label>Titulo de la URL:</label>
        <input
          {...register("title", { required: "El titulo es requerido" })}
          className="p-2 border border-l-8 border-black/20 dark:border-white/10 rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="LinkShopify"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
        )}

        <label className="mt-5">Tu URL:</label>
        <input
          {...register("originalUrl", { required: "La url es requerida" })}
          className="p-2 border border-l-8 border-black/20 dark:border-white/10 rounded-md max-w-[500px] w-full focus-visible:border-green-400 shadow-lg"
          type="url"
          placeholder="Ejemplo: https://tu-url.com/"
        />
        {errors.originalUrl && (
          <p className="mt-2 text-sm text-red-500">
            {errors.originalUrl.message}
          </p>
        )}

        <label className="mt-5">Tu alias:</label>
        <input
          {...register("customDomain", {
            required: "El alias es requerido",
            pattern: {
              value: /^[a-z0-9_-]+$/,
              message:
                "El dominio solo puede incluir letras minúsculas, números, guiones y guiones bajos.",
            },
          })}
          className="p-2 border border-l-8  border-black/20 dark:border-white/10 rounded-md max-w-[600px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ingresa tu marca: mi-marca"
        />
        {errors.customDomain && (
          <p className="mt-2 text-sm text-red-500">
            {errors.customDomain.message}
          </p>
        )}

        <div className="mt-10 flex justify-end items-center gap-4">
          <button
            type="submit"
            className=" shadow-lg p-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition"
          >
            Acortar URL
          </button>

          <button
            type="button"
            onClick={onRequestClose}
            className=" shadow-lg p-2 border rounded-md text-black bg-white hover:bg-white/80 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </AnimationModal>
  );
};

export default HashUrlModal;
