import { z } from 'zod'

export const patientFilterSchema = z.object({
  searchTerm: z.string().optional(),
})

export type PatientFilterFormData = z.infer<typeof patientFilterSchema>
