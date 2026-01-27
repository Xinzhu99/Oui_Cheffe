import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import { WandSparkles, CookingPot, CalendarHeart,  ShoppingBasket  } from 'lucide-react';

export const metadata: Metadata = {
  title: "OuiCheffe",
  description: "Your smart cooking tool",
};

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
// });

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={montserrat.className}>
      <body className="bg-[#FFFAF7]">
        {/* Navbar logo - SIMPLIFIÉ */}
        <nav className="fixed bg-white top-0 left-0 right-0 z-50 border-b border-gray-200 
                flex justify-center items-center px-4 h-20">
          <img 
            src="/images/logo/OuiCheffe02_clean.svg"
            alt="OuiCheffe logo"
            className="h-10 w-auto" 
          />
        </nav>

        {/* Contenu avec padding bottom pour la navbar */}
        <main className="pb-30 pt-20">{children}</main>

        {/* Navbar fixée en bas */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
            {/* Recettes */}
            <Link
              href="/"
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <CookingPot/>
              <span className="text-xs font-medium">Recettes</span>
            </Link>

            

            {/* Mon Menu */}
            <Link
              href="/my-dishes"
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <CalendarHeart />

              <span className="text-xs font-medium">Mon Menu</span>
            </Link>

            {/* Ma Liste */}
            <Link
              href="/my-list"
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <ShoppingBasket/>
              <span className="text-xs font-medium">Ma Liste</span>
            </Link>

            {/* Proposer une recette - NOUVEAU */}
            <Link
              href="/new-recipe"
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <WandSparkles/>
              <span className="text-xs font-medium">Proposer</span> 
            </Link>
          </div>
        </nav>
      </body>
    </html>
  );
}