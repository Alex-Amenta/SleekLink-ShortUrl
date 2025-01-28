import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl, auth } = req;

  const isLoggedIn = !!auth?.user; // Verifica si el usuario está autenticado

  if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
    NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});
