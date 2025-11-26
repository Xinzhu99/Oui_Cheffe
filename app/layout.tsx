import "./globals.css";
import Link from "next/link";
export const metadata: Metadata = {
  title: "OuiCheffe",
  description: "Your smart cooking tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="nav-bar flex bg-amber-400 gap-4 justify-between">

        <Link href="/">Home</Link>
        <Link href="/my-list">Ma liste </Link>
        <Link href="/my-dishes">Mes plats cuisinés</Link>

        </div>

        {children}
      </body>
    </html>
  );
}
