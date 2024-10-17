"use client";
import { SessionProvider } from "next-auth/react";
import { ChildrenProps } from "../../types";

const Provider = ({ children }: ChildrenProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
