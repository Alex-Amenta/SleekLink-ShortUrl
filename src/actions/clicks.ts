"use server";

import { TransformedData } from "$/types/click";
import { prisma } from "@/lib/prisma";

export async function getClicksByUrls(urlId: string) {
  try {
    const clicks = await prisma.click.findMany({
      where: { url_id: urlId },
      orderBy: { clickedAt: "desc" },
      select: { clickedAt: true },
    });

    if (!clicks) throw new Error("No clicks found");

    if (!Array.isArray(clicks)) {
      throw new Error("Unexpected response format");
    }

    // Transformar los datos
    const transformedData: TransformedData[] = clicks.map((item) => ({
      date: new Date(item.clickedAt!).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
      }),
      clicks: 1,
    }));

    // Agrupar por mes
    const groupedData = transformedData.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += curr.clicks;
      return acc;
    }, {} as { [key: string]: number });

    // Convertir a un arreglo
    const finalData: TransformedData[] = Object.keys(groupedData).map(
      (date) => ({
        date,
        clicks: groupedData[date],
      })
    );

    return finalData;
  } catch (error) {
    console.log("Error al obtener clicks:", error);
    return [];
  }
}

export async function incrementClickCount(urlId: string) {
  try {
    // Utilizar una transacción para actualizar el conteo de clics y agregar un nuevo registro en clicks
    await prisma.$transaction(async (prisma) => {
      await prisma.url.update({
        where: { id: urlId },
        data: {
          countClick: {
            increment: 1,
          },
        },
      });

      // Insertar un nuevo registro en la tabla clicks
      await prisma.click.create({
        data: {
          url_id: urlId,
          clickedAt: new Date(),
        },
      });
    });
  } catch (error) {
    console.log("Error incrementing click count:", error);
  }
}
