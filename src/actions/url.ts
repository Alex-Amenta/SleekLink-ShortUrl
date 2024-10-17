"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { delay } from "@/helpers/delay";
import { validateAndCheckDuplicateUrl, checkUserOrAnonymousLimits, getExpirationDate, getShortUrl } from "@/helpers/urls-helpers";
import prisma from "@/lib/prisma"
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getOrCreateAnonymousId() {
    let anonymousId = cookies().get('anonymousId');

    if (!anonymousId) {
        anonymousId = nanoid();
        cookies().set({
            name: "anonymousId",
            value: anonymousId,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    return anonymousId;
}

export async function getUrlsForAnonymousUser() {
    const anonymousId = await getOrCreateAnonymousId().value;

    const urls = await prisma.url.findMany({
        where: {
            anonymous_id: anonymousId,
        },
    });

    return urls;
}

export async function getUrlsBySearchTerm(searchTerm, userEmail) {
    await delay(2000);

    return await prisma.url.findMany({
        where: {
            user: { email: userEmail },
            title: {
                contains: searchTerm,
                mode: 'insensitive',
            }
        }
    });
}

export async function getUrlById(urlId) {
    try {
        const url = await prisma.url.findUnique({
            where: { id: urlId },
        })

        return url;
    } catch (error) {
        console.log("Error al obtener url" + error.message);
    }
}

export async function getUrlsByUserEmail(email) {
    try {
        const urls = await prisma.url.findMany({
            where: { user: { email: email } }
        });

        return urls;
    } catch (error) {
        console.log("Error al obtener urls de usario" + error.message);

    }
}

export async function createShortUrl(data) {
    const { title, originalUrl, customDomain = "" } = data;

    try {
        const session = await getServerSession(authOptions);

        const userInDb = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        const existingUrl = await validateAndCheckDuplicateUrl(originalUrl);

        if (!existingUrl.success) {
            return { success: false, message: existingUrl.message };
        }

        // Obtener URL corta
        const { shortCode, shortUrl } = await getShortUrl(customDomain);

        // Obtener fecha de expiración
        const expirationDate = await getExpirationDate(session);

        // Obtener o crear ID anónimo
        const anonymousId = session ? null : getOrCreateAnonymousId().value;

        // Verificar límites
        await checkUserOrAnonymousLimits(session, anonymousId);

        // Crear URL
        const createdUrl = await prisma.url.create({
            data: {
                title,
                originalUrl,
                shortCode,
                shortUrl,
                user_id: userInDb?.id,
                anonymous_id: anonymousId,
                expirationDate,
                active: true
            }
        });

        // Revalidar rutas según el tipo de usuario
        if (session) {
            revalidatePath('/dashboard');
        } else {
            revalidatePath('/');
        }

        return { success: true, data: createdUrl };
    } catch (error) {
        console.error("URL shortening error: ", error);
        // Enviar un mensaje de error más amigable para otros errores
        let errorMessage = "Error al intentar acortar esta url";
        if (error.message) {
            errorMessage = error.message;
        }

        return { success: false, message: errorMessage };
    }
};

export async function updateStatusUrl(urlId, isActive) {
    try {
        const updatedUrl = await prisma.url.update({
            where: { id: urlId },
            data: { active: isActive }
        });

        return { success: true, data: updatedUrl };
    } catch (error) {
        console.error("URL updating error: ", error);

        return { success: false, message: "Error al intentar actualizar el estado de la url" };
    }
}