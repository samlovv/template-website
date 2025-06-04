import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import { LoadingProvider } from "@/components/loading-context";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TemplateUI - Free templates for your website",
  description: 'Browse and preview beautiful website templates made with HTML/CSS/Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <LoadingProvider>
            <Navbar/>
            {children}
            <Footer/>
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
