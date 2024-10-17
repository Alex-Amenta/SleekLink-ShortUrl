import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { urlId } = params;

    if (!urlId) {
        return NextResponse.json({ message: "UrlId is required" }, { status: 404 })
    }

    try {
        const clicks = await prisma.click.findMany({
            where: { url_id: urlId },
            orderBy: { clickedAt: 'desc' },
            select: { clickedAt: true }
        });
        return NextResponse.json(clicks, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: `Error getting clicks ${error.message}` }, { status: 500 });
    }
}