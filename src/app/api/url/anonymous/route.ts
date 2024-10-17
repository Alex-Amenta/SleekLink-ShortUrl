export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Obtén las cookies de la solicitud
        const cookieStore = cookies();
        const anonymousIdCookie = cookieStore.get('anonymousId');

        if (!anonymousIdCookie) {
            return NextResponse.json({ message: "Anonymous ID not found" }, { status: 400 });
        }

        const anonymousId = anonymousIdCookie.value;

        const urls = await prisma.url.findMany({
            where: { anonymous_id: anonymousId }
        });

        return NextResponse.json(urls, { status: 200 });
    } catch (error) {
        console.error("Error fetching URLs for anonymous user: ", error);
        return NextResponse.json({ error: "An error occurred while fetching URLs." }, { status: 500 });
    }
}