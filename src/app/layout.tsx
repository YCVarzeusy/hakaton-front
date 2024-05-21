import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import styles from "./page.module.css";
import MuiTheme from "@/styles/MuiTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1Lvl up",
  description: "Hakaton para medir el nivel  de conocimientos de los participantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          <MuiTheme>
            <main className={styles.main}>
              {children}
              <Toaster />
            </main>
          </MuiTheme>
        </body>
    </html>
  );
}
