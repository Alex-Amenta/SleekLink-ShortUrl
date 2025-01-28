// @ts-nocheck

"use client";

import ConfirmModal from "@/components/ui/modals/confirm-modal";
import CustomHr from "@/components/ui/custom-hr";
import useModal from "@/hooks/useModal";
import { motion } from "framer-motion";
import { Trash2Icon, SaveIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Passwordinput from "@/components/input-password";
import { deleteUserAccount, updateUserAccount } from "@/actions/user";

const SettingsPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const { data: session } = useSession();

  const isGoogleUser = session?.user?.provider === "google";

  const { isOpen, closeModal, openModal } = useModal("ConfirmDeleteUser");
  const [isChangedPassword, setIsChangedPassword] = useState(false);

  const handleDeleteUser = useCallback(async () => {
    const userId = session?.user?.id;
    const result = await deleteUserAccount(userId);

    if (result.success) {
      toast.success(result.message);
      closeModal();
      setTimeout(() => {
        signOut();
      }, 2000);
    } else {
      toast.error(result.message);
    }
  }, [session?.user?.id]);

  const handleUpdateUser = handleSubmit(async (data) => {
    const { name, password } = data;

    const userId = session?.user?.id;
    const originalName = session?.user?.name;
    const isNameChanged = name !== originalName;

    if (!isNameChanged && !password) {
      toast.error("No se han realizado cambios.");
      return;
    }

    const result = await updateUserAccount(userId, data);

    if (result.success) {
      if (password) {
        toast.success(
          "Contraseña actualizada con éxito. Por seguridad, se ha cerrado la sesión. Por favor, inicie sesión nuevamente."
        );
        setTimeout(() => {
          signOut();
        }, 3000);
      } else {
        toast.success(result.message);
      }
      setIsChangedPassword(false);
    } else {
      toast.error(result.message);
    }
  });

  const password = watch("password", "");

  return (
    <section className="min-h-screen mt-[4rem]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col justify-center items-start p-4 rounded-md bg-white dark:bg-[#131313] dark:border-white/20 border shadow-lg"
      >
        <h3 className="font-bold text-2xl">Configuración de cuenta</h3>
        {isGoogleUser ? (
          <p className="mb-5 text-red-900 dark:text-red-500">
            ⚠ Estas registado con Google, por ello no puedes modificar tus
            datos!
          </p>
        ) : (
          <p className="mb-5 text-black/70 dark:text-white/70">
            Actualizá tu información personal:
          </p>
        )}

        <form
          onSubmit={handleUpdateUser}
          className="flex flex-col justify-center items-start w-full"
        >
          <label className="mb-2" htmlFor="">
            Tu nombre:
          </label>
          <input
            {...register("name", { required: "El nombre es requerido" })}
            className="disabled:bg-black/10 disabled:text-black/70
             disabled:dark:text-white/70 disabled:dark:bg-white/10 
            mb-5 p-2 rounded-md border w-full md:w-[70%]"
            type="text"
            defaultValue={session?.user?.name}
            disabled={isGoogleUser}
          />

          <label className="mb-2" htmlFor="">
            Tu email:
          </label>
          <input
            className="p-2 rounded-md border text-black/70 dark:text-white/70 w-full md:w-[70%] bg-black/10 dark:bg-white/10"
            type="email"
            defaultValue={session?.user?.email}
            disabled
          />
          <p className="mt-2 text-sm dark:text-white/70 text-black/70 mb-5">
            ⚠ El correo electrónico no puede ser modificado por seguridad.
            Contacta soporte si necesitas cambiarlo.
          </p>
          {!isGoogleUser && (
            <>
              <CustomHr />
              <label className="mb-5">
                Cambiar contraseña:
                <input
                  className="ml-2 scale-125 rounded-md border"
                  type="checkbox"
                  checked={isChangedPassword}
                  onChange={(e) => setIsChangedPassword(e.target.checked)}
                />
              </label>
            </>
          )}

          {isChangedPassword && (
            <div className="w-full md:w-[70%]">
              <Passwordinput
                register={register}
                password={password}
                errors={errors}
                passwordLabel="Nueva contraseña:"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isGoogleUser}
            className="disabled:bg-green-900 disabled:text-white/40 
            my-5 border p-2 rounded-md self-end hover:bg-green-900
            bg-green-700 text-white shadow-md transition"
          >
            <span className="inline-flex align-middle mr-1">
              <SaveIcon />
            </span>{" "}
            Guardar
          </button>
        </form>

        <CustomHr />
        <div className="w-full mb-5 flex flex-col justify-center items-center">
          <p className="mt-5">¿Quieres eliminar tu cuenta?</p>
          <button
            type="button"
            onClick={openModal}
            className="mt-3 border p-2 rounded-md text-black dark:text-white 
            hover:bg-red-700 hover:text-white shadow-md transition"
          >
            <span className="inline-flex align-middle mr-2">
              <Trash2Icon />
            </span>
            Eliminar cuenta
          </button>

          {isOpen && (
            <ConfirmModal
              isOpen={isOpen}
              message="⚠ Si eliminas tu cuenta, se borrarán todas tus URLs creadas. ¿Estás seguro de que quieres eliminar tu cuenta?"
              onConfirm={handleDeleteUser}
              onCancel={closeModal}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default SettingsPage;
