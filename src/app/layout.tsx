import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { QueryProvider } from "@/queries/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Northline",
    template: "%s | Northline",
  },
  description:
    "Shop everyday products from the Northline catalog. Search, filter, and keep items in your cart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <QueryProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
          <footer className="border-t border-border">
            <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted sm:px-6">
              Catalog listings from{" "}
              <a className="underline" href="https://dummyjson.com/docs/products">
                DummyJSON
              </a>
              .
            </p>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
