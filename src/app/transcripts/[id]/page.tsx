import { notFound } from 'next/navigation'
import { z } from 'zod'

type Props = {
    params: { id: string }
}

export default async function TranscriptPage({ params: { id } }: Props) {
    const schema = z.string().regex(/^[a-z0-9]{2}$/i)

    if (!schema.safeParse(id).success) {
        notFound()
    }

    return <div>page</div>
}
