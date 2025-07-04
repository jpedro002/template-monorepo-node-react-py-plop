import { z } from 'zod'

export const updatePatientSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .max(90, 'Nome deve ter no máximo 90 caracteres'),
})

export type UpdatePatientFormData = z.infer<typeof updatePatientSchema>
