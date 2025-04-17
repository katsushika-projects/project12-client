import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1">
      <Header />
      <main>{children}</main>
    </div>
  );
}
