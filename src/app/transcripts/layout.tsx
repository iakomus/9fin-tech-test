import { PropsWithChildren } from 'react'

export default function TranscriptsLayout({
    children,
}: Readonly<PropsWithChildren>) {
    return (
        <main className="min-h-screen">
            {children}
        </main>
    )
}
