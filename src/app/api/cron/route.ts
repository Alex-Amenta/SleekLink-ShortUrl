import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    await prisma.url.deleteMany({
      where: {
        expirationDate: { lt: oneDayAgo },
        active: false,
      },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting expired URLs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
