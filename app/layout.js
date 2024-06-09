import { MainNav } from '@/components/main-nav'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import dbConnect from '@/services/mongo'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Inter({ subsets: ['latin'], variable: '--font-poppins' })

export const metadata = {
  title: "Educonnect - World's best Learning Platform",
  description: 'Explore || Learn || Build || Share',
}

export default async function RootLayout({ children }) {
  await dbConnect()

  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
          <SessionProvider>
            <div className="container flex h-20 items-center justify-between py-6 ">
              <MainNav />
            </div>
          </SessionProvider>
        </header>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
