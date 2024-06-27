import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

type Props = {
    params: { id: string }
}

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
    const { title } = await new Promise<{ title: string }>((resolve) => resolve({title: 'Title'}))

    return {
        title: title,
    }
}

export default async function TranscriptPage({ params: { id } }: Props) {
    const schema = z.string().regex(/^[a-z0-9]{2}$/i)

    if (!schema.safeParse(id).success) {
        notFound()
    }

    return <div>page</div>
}
