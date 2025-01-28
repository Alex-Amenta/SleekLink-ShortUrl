"use client";
import { loginUser } from "@/actions/user";
import ButtonGoogle from "@/components/button-google";
import { getErrorMessage } from "@/helpers/get-error-message";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const response = await loginUser(email, password);

    if (response.error) {
      setError("general", {
        type: "server",
        message: response.error,
      });
    } else {
      router.push("/dashboard");
    }
  });

  const emailErrorMessage = getErrorMessage(errors.email);
  const generalErrorMessage = getErrorMessage(errors.general);
  const passwordErrorMessage = getErrorMessage(errors.password);

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
          <ButtonGoogle />

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
          {emailErrorMessage && (
            <p className="mt-2 text-sm text-red-500">{emailErrorMessage}</p>
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

          {/* Error general de nexthauth */}
          {generalErrorMessage && (
            <p className="mt-2 text-sm text-red-500">
              {generalErrorMessage}
            </p>
          )}

          {passwordErrorMessage && (
            <p className="mt-2 text-sm text-red-500">
              {passwordErrorMessage}
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
