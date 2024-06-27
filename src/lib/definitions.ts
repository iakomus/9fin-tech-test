import { z } from 'zod'

export const BlockSchema = z.object({
    start: z.number(),
    end: z.number(),
    text: z.string()
})

export const TranscriptSchema = z.object({
    id: z.string(),
    title: z.string(),
    audioUrl: z.string(),
    blocks: z.array(BlockSchema)
})

export const APIErrorSchema = z.object({
    message: z.string(),
})

export type Block = z.infer<typeof BlockSchema>
export type Transcript = z.infer<typeof TranscriptSchema>
export type APIError = z.infer<typeof APIErrorSchema>