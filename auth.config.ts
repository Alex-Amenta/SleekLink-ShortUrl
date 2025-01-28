import { verifyPassword } from "@/helpers/verify-password";
import { prisma } from "@/lib/prisma";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      provider?: string; // Agregar la propiedad `provider` opcional
    } & DefaultSession["user"]; // Mantener las propiedades predeterminadas de `user`
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
  }
}

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
          where: { email: email as string },
        });

        if (!user || !user.password) {
          throw new Error("No user found.");
        }

        const isValidPassword = await verifyPassword(
          password as string,
          user.password
        );

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
      if (session.user) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
