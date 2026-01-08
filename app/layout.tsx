import "./globals.css"
import Link from "next/link"
import { Roboto } from 'next/font/google'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OuiCheffe",
  description: "Your smart cooking tool",
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={roboto.className}>
      <body className="bg-[#FFFAF7]">
        {/* Contenu avec padding bottom pour la navbar */}
        <main className="pb-20">
          {children}
        </main>

        {/* Navbar fixée en bas */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
            
            {/* Recettes */}
            <Link 
              href="/" 
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <span className="text-2xl mb-1">🍳</span>
              <span className="text-xs font-medium">Recettes</span>
            </Link>

            {/* Ma Liste */}
            <Link 
              href="/my-list" 
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <span className="text-2xl mb-1">🛒</span>
              <span className="text-xs font-medium">Ma Liste</span>
            </Link>

            {/* Mon Menu */}
            <Link 
              href="/my-dishes" 
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
            >
              <span className="text-2xl mb-1">📅</span>
              <span className="text-xs font-medium">Mon Menu</span>
            </Link>

          </div>
        </nav>
      </body>
    </html>
  )
}