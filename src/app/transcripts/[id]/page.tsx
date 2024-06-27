import { getTranscript } from '@/lib/api'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

type Props = {
    params: { id: string }
}

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata | undefined> => {
    const result = await getTranscript(id)

    if ('message' in result) {
        return
    }

    return {
        title: result.title,
    }
}

export default async function TranscriptPage({ params: { id } }: Props) {
    const schema = z.string().regex(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i)

    if (!schema.safeParse(id).success) {
        notFound()
    }

    const result = await getTranscript(id)

    if ('message' in result) {
        throw new Error('not-found', { cause: result.message })
    }

    return <div>page</div>
}
