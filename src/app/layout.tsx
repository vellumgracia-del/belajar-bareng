import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import AppHeader from "@/components/AppHeader";
import SidebarNav from "@/components/SidebarNav";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "BARBAR — Platform Belajar Masa Depan",
  description: "Platform microlearning revolusioner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <AnimatedBackground />
          <SplashScreen />
          <AppHeader />
          <SidebarNav />
          <div className="page-container">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
