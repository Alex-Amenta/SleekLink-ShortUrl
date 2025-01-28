import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface Session {
  id: string;
  name: string;
  email: string;
  image: string;
  provider?: string;
}
