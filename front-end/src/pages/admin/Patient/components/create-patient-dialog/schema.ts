import { z } from 'zod'

export const createPatientSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .max(90, 'Nome deve ter no máximo 90 caracteres'),
})

export type CreatePatientFormData = z.infer<typeof createPatientSchema>
