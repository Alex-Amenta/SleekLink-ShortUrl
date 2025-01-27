// @ts-nocheck

import { verifyPassword } from "@/helpers/verify-password";
import { prisma } from "@/lib/prisma";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("No user found.");
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image:
            user.image ||
            "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Añadir el proveedor al token
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      // Añadir el proveedor a la sesión
      session.user.provider = token.provider;
      return session;
    },
  },
} satisfies NextAuthConfig;
