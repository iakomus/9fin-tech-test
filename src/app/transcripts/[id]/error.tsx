'use client'

import { notFound } from 'next/navigation'

export default function ErrorBoundary({ error, reset }: { error: Error, reset: () => void }) {
    if (error.message === 'not-found') {
        notFound()
    }
    return (
        <div>
            <h1>Error loading transcript </h1>
            <pre>
                {error.cause as string}
            </pre>
        </div>
    )
}