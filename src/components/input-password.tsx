"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PasswordInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  password: string;
  passwordLabel: string;
}

const Passwordinput = ({ register, errors, password, passwordLabel }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  return (
    <>
      <div className="relative mt-5">
        <label>{passwordLabel}</label>
        <input
          {...register("password", {
            required: "La contraseña es requerida",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          className="p-2 rounded-md border w-full"
          type={showPassword ? "text" : "password"}
          placeholder="******"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute top-0 right-0 mt-7 mr-3 p-1 hover:bg-white/10 rounded-full"
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">{errors.password?.message}</p>
        )}
      </div>

      <div className="relative mt-5">
        <label>Confirmar Contraseña:</label>
        <input
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
          className="p-2 rounded-md border w-full"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="******"
          aria-label={
            showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        />

        <button
          type="button"
          onClick={toggleShowConfirmPassword}
          className="absolute top-0 right-0 mt-7 mr-3 p-1 hover:bg-white/10 rounded-full"
          aria-label={
            showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showConfirmPassword ? <EyeOff /> : <Eye />}
        </button>

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Passwordinput;
