import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import MenuBar from '@/components/menubar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social H',
  description: 'Rede social inspirada no Twitter'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="grid grid-cols-[200px_auto_400px]">
            <MenuBar />
            {children}
            <Sidebar />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
