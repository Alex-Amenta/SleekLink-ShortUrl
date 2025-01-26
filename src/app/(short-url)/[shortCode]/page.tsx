import { redirectByShortCode } from "@/actions/url";
import { notFound, redirect } from "next/navigation";

const RedirectPage = async ({ params }: { params: { shortCode: string } }) => {
  const { shortCode } = params;

  // Llamar a la acción para obtener la URL
  const result = await redirectByShortCode(shortCode);

  if (!result) {
    return notFound(); // Si no se encuentra la URL, devuelve un 404
  }

  if (result.inactive) {
    redirect("/url-inactive");
  }

  // Redirigir a la URL original si está activa
  if (result.originalUrl) {
    redirect(result.originalUrl);
  }

  return notFound();
};

export default RedirectPage;
