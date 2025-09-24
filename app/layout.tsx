import './globals.css'
import { Ovo } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="en">
      <body className={`${ovo.variable} ${sourceCodePro.variable} font-sans`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}