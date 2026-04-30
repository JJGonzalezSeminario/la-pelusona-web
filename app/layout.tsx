import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900'],
})

export const metadata: Metadata = {
  title: 'La Pelusona - La Fonda Pa\' Todos',
  description: 'Fonda cultural en Berlín. Cultura, gastronomía y comunidad desde 2022.',
  keywords: ['fonda', 'Berlín', 'cultura', 'gastronomía', 'eventos', 'artesanía'],
  authors: [{ name: 'La Pelusona' }],
  openGraph: {
    title: 'La Pelusona - La Fonda Pa\' Todos',
    description: 'Fonda cultural en Berlín. Cultura, gastronomía y comunidad desde 2022.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['de_DE', 'en_US'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
