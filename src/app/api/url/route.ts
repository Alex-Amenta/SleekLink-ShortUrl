export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { checkUserOrAnonymousLimits, getExpirationDate, getShortUrl, validateAndCheckDuplicateUrl } from "@/helpers/urls-helpers";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { getOrCreateAnonymousId } from "@/helpers/cookies";
import { authOptions } from "@/auth";

export async function GET() {
    try {
        const result = await prisma.url.findMany();
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}

export async function POST(request) {
    const { originalUrl, customDomain, title } = await request.json();

    try {
        const session = await getServerSession(authOptions);

        let userId = null;

        if (session) {
            const userInDb = await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            userId = userInDb?.id || null;
        }

        // Obtener o crear ID anónimo
        const anonymousId = session ? null : getOrCreateAnonymousId().value;

        const existingUrl = await validateAndCheckDuplicateUrl(originalUrl, userId, anonymousId);

        if (!existingUrl.success) {
            return NextResponse.json({ message: existingUrl.message }, { status: 400 });
        }

        // Obtener URL corta
        const { shortCode, shortUrl } = await getShortUrl(customDomain);

        // Obtener fecha de expiración
        const expirationDate = await getExpirationDate(session);

        // Verificar límites
        const limitCheck = await checkUserOrAnonymousLimits(session, anonymousId);

        if (!limitCheck.success) {
            return NextResponse.json({ message: limitCheck.message }, { status: 400 });
        }

        // Crear URL
        const createdUrl = await prisma.url.create({
            data: {
                title,
                originalUrl,
                shortCode,
                shortUrl,
                user_id: userId,
                anonymous_id: anonymousId,
                expirationDate,
                active: true
            }
        });

        return NextResponse.json(createdUrl, { status: 200 })
    } catch (error) {
        console.log("URL shortening error: ", error);
        return NextResponse.json({ error: "An error occurred while shortening the URL." }, { status: 404 });
    }
}

