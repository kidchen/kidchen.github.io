import './globals.css'
import { Ovo } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

const ovo = Ovo({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ovo'
})

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  variable: '--font-source-code-pro'
})

export const metadata = {
  title: 'kidChen',
  description: "Chen Zhang's personal website",
  keywords: 'kidChen, Chen Zhang, blog, programming, personal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ovo.variable} ${sourceCodePro.variable} font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}