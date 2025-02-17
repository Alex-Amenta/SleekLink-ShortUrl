"use server";

import { auth } from "$/auth";
import { getOrCreateAnonymousId } from "@/helpers/cookies";
import { delay } from "@/helpers/delay";
import {
  validateAndCheckDuplicateUrl,
  checkUserOrAnonymousLimits,
  getExpirationDate,
  generateShortUrl,
} from "@/helpers/urls-helpers";
import { prisma } from "@/lib/prisma";
import { incrementClickCount } from "./clicks";
import { Session } from "next-auth";

export async function getUrlsForAnonymousUser() {
  const anonymousId = await getOrCreateAnonymousId();

  const urls = await prisma.url.findMany({
    where: {
      anonymous_id: anonymousId,
    },
  });

  return urls;
}

export async function getUrlsBySearchTerm(
  searchTerm: string,
  userEmail: string
) {
  await delay(2000);

  return await prisma.url.findMany({
    where: {
      user: { email: userEmail },
      title: {
        contains: searchTerm,
      },
    },
  });
}

export async function getUrlById(urlId: string) {
  await delay(2000);

  try {
    const url = await prisma.url.findUnique({
      where: { id: urlId },
    });

    if (!url) throw new Error("Url not found");

    return url;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error al obtener url" + error.message);
    }
  }
}

export async function getUrlsByUserEmail() {
  try {
    const session: Session | null = await auth();
    const email = session?.user?.email;

    const urls = await prisma.url.findMany({
      where: { user: { email } },
    });

    return urls;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error al obtener urls de usario" + error.message);
    }
    return [];
  }
}

export async function createShortUrl(data: {
  originalUrl: string;
  customDomain?: string;
  title: string;
}) {
  const { title, originalUrl, customDomain } = data;
  try {
    const session: Session | null = await auth();

    let userId: string | null = null;

    if (session?.user) {
      const userInDb = await prisma.user.findUnique({
        where: { email: session.user.email as string },
      });
      userId = userInDb?.id || null;
    }

    // Obtener o crear ID anónimo
    const anonymousId = session?.user ? null : await getOrCreateAnonymousId();

    const existingUrl = await validateAndCheckDuplicateUrl(
      originalUrl,
      userId,
      anonymousId
    );

    if (!existingUrl.success) {
      return { success: false, message: existingUrl.message };
    }

    // Generar short url
    const { shortCode, shortUrl } = await generateShortUrl(
      customDomain,
      userId
    );

    // Obtener fecha de expiración
    const expirationDate = await getExpirationDate(session);

    // Verificar límites
    if (session?.user && typeof session.user.id === "string") {
      const limitCheck = await checkUserOrAnonymousLimits(
        { id: session.user.id },
        anonymousId as string
      );

      if (!limitCheck.success) {
        return { success: false, message: limitCheck.message };
      }
    }

    // Crear URL
    const createdUrl = await prisma.url.create({
      data: {
        title,
        originalUrl,
        shortCode: shortCode ?? "",
        shortUrl: shortUrl ?? "",
        user_id: userId,
        anonymous_id: anonymousId,
        expirationDate,
        countClick: 0,
        active: true,
      },
    });

    return { success: true, data: createdUrl };
  } catch (error) {
    console.error("URL shortening error: ", error);
    // Enviar un mensaje de error más amigable para otros errores
    let errorMessage = "Error al intentar acortar esta url";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
}

export async function updateStatusUrl(urlId: string, isActive: boolean) {
  try {
    await prisma.url.update({
      where: { id: urlId },
      data: { active: isActive },
    });

    return {
      success: true,
      message: isActive
        ? "URL activated successfully"
        : "URL desactived successfully",
    };
  } catch (error) {
    console.error("URL updating error: ", error);

    return {
      success: false,
      message: "Error al intentar actualizar el estado de la url",
    };
  }
}

export async function redirectByShortCode(shortCode: string) {
  try {
    const url = await prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url) {
      return null;
    }

    if (!url.active) {
      return { inactive: true };
    }

    await incrementClickCount(url.id);

    return { originalUrl: url.originalUrl };
  } catch (error) {
    console.error("Error al obtener la URL:", error);
    return null;
  }
}
