import { FastifyReply, FastifyRequest } from 'fastify'
import { PatientRepository } from '@/repositories/patient-repository'
import { UpdatePatientUseCase } from '@/use-cases/patient/update-patient-use-case'
import { z } from 'zod'


// Importação do schema gerado pela lib zod-prisma-types
import { PatientUpdateManyMutationInputSchema } from '@/schemas/zod'

export async function UpdatePatientController(
  request: FastifyRequest<{
    Params: { id: string }
    Body: z.infer<typeof PatientUpdateManyMutationInputSchema>
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params
  const { body } = request

  const parsedPatient = PatientUpdateManyMutationInputSchema.parse(body)
  
  const patientRepository = new PatientRepository()
  const updatePatientUseCase = new UpdatePatientUseCase(patientRepository)

  const result = await updatePatientUseCase.execute({
    params: { id: parseInt(id) },
    data: parsedPatient
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}