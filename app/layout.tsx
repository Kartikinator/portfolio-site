import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Kartikeya Gullapalli's Portfolio",
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="max-w-7xl mx-auto py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
