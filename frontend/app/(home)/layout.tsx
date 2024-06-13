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
          <div className="h-screen">
            <div className="lg:px-30 container mx-auto h-full max-w-6xl p-0">
              <div className="grid h-full grid-cols-4">
                <MenuBar />
                <div className="col-span-3 border-x-[1px] border-neutral-800 pr-1 lg:col-span-2 lg:pr-0">
                  {children}
                </div>
                <SideBar />
              </div>
            </div>
          </div>
          {/* <div className="relative flex h-screen w-full overflow-hidden sm:container">
            <div className="flex w-12 flex-col sm:w-72">
              <MenuBar />
            </div>

            <div className="flex h-full w-full flex-col justify-between">
              <Header />

              <main className="relative flex h-full max-w-full overflow-y-hidden">
                <div className="no-scrollbar flex h-full w-full auto-cols-max grid-flow-col flex-wrap items-start justify-start gap-4 overflow-y-scroll rounded-tl">
                  {children}
                </div>
                <SideBar />
              </main>
            </div>
          </div> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
