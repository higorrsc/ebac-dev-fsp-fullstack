import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Sidebar from '@/components/sidebar'
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
          <div className="container flex md:justify-around">
            <MenuBar />
            {children}
            <Sidebar />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
