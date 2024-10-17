import { authOptions } from "@/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user.email;

        const urls = await prisma.url.findMany({
            where: { user: { email } }
        });
        return NextResponse.json(urls, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 404 })
    }
}