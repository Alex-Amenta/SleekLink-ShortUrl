import { Session as User } from "$/types";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { nanoid } from "nanoid";
import { Session } from "next-auth";

const BASE_URL = process.env.BASE_URL;
const MAX_URLS_PER_ANONYMOUS = 5;
const MAX_URLS_PER_USER = 15;

export const formatValidUrl = async (originalUrl: string) => {
  try {
    const response = await axios.head(originalUrl);
    return response.status === 200;
  } catch (error) {
    console.log("Error al validar url:", error);
    return false;
  }
};

export const validateAndCheckDuplicateUrl = async (
  originalUrl: string,
  userId: string | null | undefined,
  anonymousId: string | null | undefined
) => {
  const isValid = await formatValidUrl(originalUrl);
  if (!isValid) return { success: false, message: "URL no válida!" };

  const existingUrl = await prisma.url.findFirst({
    where: {
      originalUrl,
      ...(userId ? { user_id: userId } : { anonymous_id: anonymousId }),
    },
  });

  if (existingUrl) {
    return { success: false, message: "Esta URL ya fue acortada" };
  }

  return { success: true };
};

export const generateShortUrl = async (
  customDomain: string | null | undefined,
  userId: string | null | undefined
) => {
  if (customDomain) {
    const existingCustomDomain = await prisma.url.findUnique({
      where: { shortCode: customDomain, user_id: userId },
    });

    if (existingCustomDomain)
      return {
        success: false,
        message: "Ya usaste este dominio personalizado",
      };

    return {
      success: true,
      shortCode: customDomain,
      shortUrl: `${BASE_URL}/${customDomain}`,
    };
  }

  const shortCode = nanoid(6);
  return {
    success: true,
    shortCode,
    shortUrl: `${BASE_URL}/${shortCode}`,
  };
};

export const getExpirationDate = async (session: Session | null) => {
  const expirationDate = new Date();
  if (session) {
    expirationDate.setDate(expirationDate.getDate() + 30);
  } else {
    expirationDate.setHours(expirationDate.getHours() + 5);
  }
  return expirationDate;
};

export const checkUserOrAnonymousLimits = async (
  user: User | undefined,
  anonymousId: string
) => {
  let count;

  if (user) {
    count = await prisma.url.count({ where: { user_id: user.id } });
    if (count >= MAX_URLS_PER_USER)
      return {
        success: false,
        message: "Has alcanzado el límite de URLs generadas.",
      };
  } else {
    count = await prisma.url.count({ where: { anonymous_id: anonymousId } });
    if (count >= MAX_URLS_PER_ANONYMOUS)
      return {
        success: false,
        message: "Has alcanzado el límite de URLs generadas.",
      };
  }
  return { success: true };
};
