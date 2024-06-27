import { APIError, APIErrorSchema, Transcript, TranscriptSchema } from './definitions'
import env from './env'

export const getTranscript = async (id: string): Promise<Transcript | APIError> => {
    const result = await fetch(`${env.API_SERVICE_URL}/transcripts/${id}`)
    const json = await result.json()

    try {
        return TranscriptSchema.parse(json)
    } catch (e) {
        return APIErrorSchema.parse(json)
    }
}