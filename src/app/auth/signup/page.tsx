"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupUser } from "@/actions/user";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import Loader from "@/components/ui/loader/loader";
import Passwordinput from "@/components/input-password";
import { delay } from "@/helpers/delay";
import { getErrorMessage } from "@/helpers/get-error-message";

interface RegisterUserFormValues {
  image: string;
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterUserFormValues>();

  const { loading, startLoading, stopLoading } = useLoading();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data: RegisterUserFormValues) => {
    startLoading();
    await delay(2000);

    const response = await signupUser(data);

    if (response.success) {
      toast.success("Usuario creado exitosamente");
      router.push("/auth/login");
      // router.refresh();
    } else {
      toast.error(response.message);
    }

    stopLoading();
  });

  const password = watch("password", "");

  const emailErrorMessage = getErrorMessage(errors.email);
  const imageErrorMessage = getErrorMessage(errors.image);
  const nameErrorMessage = getErrorMessage(errors.name);

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen mt-[-4rem] flex justify-center items-center"
    >
      <section className="my-10 py-10 bg-white dark:bg-black/50 rounded-md shadow-xl w-full sm:w-[40rem] flex flex-col justify-center items-center">
        <h2 className="mb-3 text-center font-bold text-3xl">Registrarse</h2>
        <p className="text-black/60 dark:text-white/60 text-center text-sm text-pretty w-[60%]">
          Registrate, para tener todos tus enlaces controlados!.
        </p>

        <div className="mt-5 flex flex-col justify-start items-stretch w-[70%]">
          <label>Image</label>
          <input
            {...register("image")}
            className="p-2 rounded-md border"
            type="url"
            placeholder="https://url-de-imagen"
          />
          {imageErrorMessage && (
            <p className="mt-2 text-sm text-red-500">{imageErrorMessage}</p>
          )}

          <label className="mt-5">Nombre</label>
          <input
            {...register("name", {
              required: "El nombre es requerido",
            })}
            className="p-2 rounded-md border"
            type="text"
            placeholder="John Doe"
          />
          {nameErrorMessage && (
            <p className="mt-2 text-sm text-red-500">{nameErrorMessage}</p>
          )}

          <label className="mt-5">Email</label>
          <input
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Correo electrónico no válido",
              },
            })}
            className="p-2 rounded-md border"
            type="email"
            placeholder="tuemail@gmail.com"
          />
          {emailErrorMessage && (
            <p className="mt-2 text-sm text-red-500">{emailErrorMessage}</p>
          )}

          <Passwordinput
            register={register}
            errors={errors}
            password={password}
            passwordLabel="Contraseña"
          />

          <button
            type="submit"
            className="mt-10 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            {loading ? (
              <span className="flex justify-center items-center gap-1">
                <Loader />
                Registando...
              </span>
            ) : (
              "Registrarse"
            )}
          </button>

          <p className="mt-5 text-black/50 dark:text-white/50 text-sm text-center">
            Ya tienes una cuenta?{" "}
            <Link
              className="text-green-500 hover:underline underline-offset-2 animation"
              href="/auth/login"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </section>
    </form>
  );
};

export default RegisterPage;
