import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import Link from "next/link";

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
        <main className="flex min-h-screen flex-col p-8">
          <Link
            href="/"
            className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl 
            bg-clip-text bg-gradient-to-r text-transparent from-blue-400 to-blue-900 gradien">
            Sleek
          </Link>
        </main>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
