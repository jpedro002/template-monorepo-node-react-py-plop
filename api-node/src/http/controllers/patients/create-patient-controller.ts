import { FastifyReply, FastifyRequest } from 'fastify'
import { PatientRepository } from '@/repositories/patient-repository'
import { CreatePatientUseCase } from '@/use-cases/patient/create-patient-use-case'
import { z } from 'zod'


import { PatientCreateManyInputSchema } from '@/schemas/zod'

export async function CreatePatientController(
  request: FastifyRequest<{
    Body: z.infer<typeof PatientCreateManyInputSchema>
  }>,
  reply: FastifyReply,
) {
  const { body } = request

  const parsedPatient = PatientCreateManyInputSchema.parse(body)
  
  const patientRepository = new PatientRepository()
  const createPatientUseCase = new CreatePatientUseCase(patientRepository)

  const result = await createPatientUseCase.execute({
    data: parsedPatient
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(201).send(result.data)
}