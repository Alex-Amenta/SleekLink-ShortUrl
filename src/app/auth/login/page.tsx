"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-screen mt-[-4rem] flex justify-center items-center"
    >
      <section className="py-10 bg-white dark:bg-black/50 rounded-md shadow-xl w-full sm:w-[30rem] flex flex-col justify-center items-center">
        <h2 className="mb-3 text-center font-bold text-3xl">Iniciar Sesión</h2>
        <p className="text-black/60 dark:text-white/60 text-center text-sm text-pretty w-[60%]">
          ¡Bienvenido de vuelta! Por favor, inicia sesión para continuar.
        </p>

        <div className="mt-5 flex flex-col justify-start items-stretch w-[70%]">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="mt-2 mb-10 p-2 flex justify-center items-center gap-3 bg-white dark:hover:bg-white/85 text-black shadow-md border border-slate-300 rounded-md hover:border-slate-500 dark:hover:border-slate-400 transition"
          >
            <Image
              src="/google.svg"
              alt="Icono de google"
              width={20}
              height={20}
            />
            Iniciar Sesión con Google
          </button>

          <label>Email</label>
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
            placeholder="sleeklink@gmail.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}

          <label className="mt-5">Password</label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            className="p-2 rounded-md border"
            type="password"
            placeholder="******"
          />

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-10 bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg"
          >
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Iniciar Sesión
          </button>
          <p className="mt-5 text-black/50 dark:text-white/50 text-sm text-center">
            Todavia no tenes una cuenta?{" "}
            <Link
              className="text-green-500 hover:underline underline-offset-2 animation"
              href="/auth/signup"
            >
              Registrate
            </Link>
          </p>
        </div>
      </section>
    </form>
  );
};

export default LoginPage;
