// helpers/toastNotify.js
import {
  toast,
  ToastOptions,
  ToastPosition,
  TypeOptions,
} from "react-toastify";

export const toastNotify = (
  message: string,
  type: TypeOptions = "info", // Puedes restringir el tipo con los valores disponibles en `react-toastify`
  position: ToastPosition = "top-center" // Similar con la posición
): void => {
  const options: ToastOptions = { type, position };
  toast(message, options);
};
