import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ChildrenProps } from "$/types";
import Provider from "../components/provider";
import { ThemeProvider } from "next-themes";
import ToastProvider from "@/components/toast-provider";
import Navbar from "@/components/navbar";
import BackgroundPage from "@/components/bg-page";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "SleekLink - Best URL Shortener",
  description:
    "Simplify your links, customize URLs, and track clicks with SleekLink, your reliable URL shortener.",
  keywords: [
    "URL shortener",
    "custom URLs",
    "link management",
    "click tracking",
    "shorten links",
    "SleekLink",
    "link analytics",
  ],
  icons: {
    icon: "/logo-sleeklink.png", // Ruta relativa al favicon
    shortcut: "/logo-sleeklink.png", // Atajo para navegadores que lo soporten
  },
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-[#ebebeb] dark:bg-[#181818]`}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              <Navbar />
              <div id="main-content" className="px-5 lg:px-48">
                <BackgroundPage />
                {children}
              </div>
            </ToastProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
