import "./globals.css";
import Link from "next/link";
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  title: "OuiCheffe",
  description: "Your smart cooking tool",
};

const roboto = Roboto({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-[#FFFAF7]">
        <div className="nav-bar flex p-5  justify-evenly shadow-xl sticky">
          <div className=" link_wrapper flex gap-4 justify-between">
            <Link href="/">Oui<span>Cheffe !</span></Link>
            <Link href="/my-list">Ma Liste </Link>
            <Link href="/my-dishes">Mon Menu</Link>
          </div>
          <div> 
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
