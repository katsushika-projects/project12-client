import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserProvider";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "everstudy",
  description:
    "学習習慣を強制的に。AIが学習状況をチェックし、達成できなければお金が徴収される新しい学習アプリ。",
  keywords: ["学習アプリ", "習慣化", "時間管理", "AI監視", "ペナルティ"],
  openGraph: {
    title: "everstudy",
    description:
      "学習習慣を強制的に。AIが学習状況をチェックし、達成できなければお金が徴収される新しい学習アプリ。",
    url: "",
    siteName: "everstudy",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "everstudy",
    description:
      "学習習慣を強制的に。AIが学習状況をチェックし、達成できなければお金が徴収される新しい学習アプリ。",
    images: [""],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-svh flex flex-col">
          <UserProvider>{children}</UserProvider>
          <Footer />
        </div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
