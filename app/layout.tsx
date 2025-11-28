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
        <div className="nav-bar flex justify-between p-5 m-2 shadow-2xl">
          <h1 className="">
            Oui <span>Cheffe !</span>
          </h1>
          <div className=" link_wrapper flex gap-4 justify-between">
            <Link href="/">ACCUEIL</Link>
            <Link href="/my-list">MA LISTE </Link>
            <Link href="/my-dishes">PLATS CUISINES</Link>
            <Link href="/my-list">ABOUT US </Link>
          </div>
          <div> 
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
