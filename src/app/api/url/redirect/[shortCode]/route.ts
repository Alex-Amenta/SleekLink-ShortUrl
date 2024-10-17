import { incrementClickCount } from "@/app/api/controllers/url/incrementClickCount";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const { BASE_URL } = process.env

export async function GET(request, { params }) {
    const { shortCode } = params;

    try {
        const url = await prisma.url.findUnique({ where: { shortCode: shortCode } })

        if (!url) {
            return NextResponse.json({ message: "Url not found" }, { status: 404 });
        }

        if (!url.active) {
            return NextResponse.redirect(`${BASE_URL}/url-inactive`, 302);
        }

        await incrementClickCount(url.id);

        return NextResponse.redirect(url.originalUrl, 302);
    } catch (error) {
        return NextResponse.json({ error: `An error occurred while redirecting the URL: ${error.message}` }, { status: 500 });
    }
}