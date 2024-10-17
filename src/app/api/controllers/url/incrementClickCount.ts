import prisma from "@/lib/prisma";

export const incrementClickCount = async (urlId) => {
    try {
        // Utilizar una transacción para actualizar el conteo de clics y agregar un nuevo registro en clicks
        await prisma.$transaction(async (prisma) => {
            await prisma.url.update({
                where: { id: urlId },
                data: {
                    countClick: {
                        increment: 1
                    }
                }
            });

            // Insertar un nuevo registro en la tabla clicks
            await prisma.clicks.create({
                data: {
                    url_id: urlId,
                    clickedAt: new Date()
                }
            });
        });
    } catch (error) {
        throw new Error(`Error incrementing click count: ${error.message}`);
    }
};