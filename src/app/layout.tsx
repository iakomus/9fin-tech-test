import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'Transcripts',
        template: '%s | Transcript',
    },
    icons: {
        icon: '/favicon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<PropsWithChildren>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body suppressHydrationWarning className={inter.className}>
                {children}
            </body>
        </html>
    )
}
