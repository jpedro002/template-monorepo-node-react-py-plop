import { z } from 'zod'

const envSchema = z.object({
	VITE_API_URL: z.string().url(),
})

const parsedEnvs = envSchema.safeParse(import.meta.env)

if (!parsedEnvs.success) {
	console.warn(parsedEnvs.error)

}

export const env = envSchema.parse(import.meta.env)
