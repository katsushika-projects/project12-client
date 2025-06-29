export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="prose mx-auto px-4 grow py-10">{children}</main>;
}
