import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import Link from "next/link";
import Navbar from "@/components/custom/Navbar";
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sleek AI",
  description: "An AI-powered powered weekly to-do list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <main className="flex min-h-screen flex-col container">
              <Navbar />
              {children}
            </main>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
