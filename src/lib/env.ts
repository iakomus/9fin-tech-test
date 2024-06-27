import { z } from 'zod'

const envSchema = z.object({
    API_SERVICE_URL: z.string().url(),
})

const env = envSchema.parse(process.env)
export default env
