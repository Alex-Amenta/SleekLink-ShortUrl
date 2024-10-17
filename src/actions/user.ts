"use server"

import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function signupUser(data) {
    const { image, name, email, password } = data
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (existingUser) {
            return { success: false, message: "El usuario con ese email ya existe" };
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //creamos el usuario
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                image: image || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png",
                password_hash: hashedPassword
            }
        })


        return { success: true, data: newUser };
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return { success: false, message: "Error al registrar usuario" };

    }
}


export async function deleteUserAccount(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return { success: false, message: "Usuario no encontrado" }

        await prisma.url.deleteMany({
            where: { user_id: userId }
        });
        await prisma.user.delete({
            where: { id: userId }
        });

        return { success: true, message: "Cuenta de usuario y urls eliminado con exito!" };
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return { success: false, message: "Error al eliminar usuario y sus urls" };
    }
}

export async function updateUserAccount(userId, data) {
    const { name, password } = data;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) return { success: false, message: "Usuario no encontrado" };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { id: userId },
                data: { password_hash: hashedPassword }
            })
        }

        if (name) {
            await prisma.user.update({
                where: { id: userId },
                data: { name: name }
            });
        }

        return { success: true, message: "Usuario actualizado con exito!" }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return { success: false, message: "Error al actualizar usuario" };
    }
} 