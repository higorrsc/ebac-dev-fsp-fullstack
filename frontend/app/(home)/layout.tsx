import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import MenuBar from '@/components/menubar'
import SideBar from '@/components/sidebar'

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
          <div className="relative flex h-screen w-full overflow-hidden sm:container">
            {/* <!-- Sidebar --> */}
            <div className="flex w-12 flex-col sm:w-64">
              <MenuBar />
            </div>

            <div className="flex h-full w-full flex-col justify-between">
              {/* <!-- Header --> */}
              <Header />

              {/* <!-- Main --> */}
              <main className="relative flex h-full max-w-full overflow-y-hidden">
                {/* <!-- Container --> */}
                <div className="no-scrollbar flex h-full w-full auto-cols-max grid-flow-col flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-tl">
                  {/* <!-- Container --> */}
                  {children}
                </div>
                <SideBar />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
