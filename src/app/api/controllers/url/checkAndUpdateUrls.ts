export const checkAndUpdateUrls = async () => {
    try {
        // Desactivar todas las URLs expiradas
        await conn.query("UPDATE url SET active = false WHERE active = true AND expirationDate <= NOW()");

        // Eliminar URLs desactivadas hace más de 10 días
        const deletetionDate = new Date();
        deletetionDate.setDate(deletetionDate.getDate() - 10);
        await conn.query("DELETE FROM url WHERE active = false AND expirationDate <= ?", [deletetionDate]);
    } catch (error) {
        console.error(`Error al actualizar o eliminar URLs: ${error.message}`);
    }
};