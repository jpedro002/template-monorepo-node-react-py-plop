import { FastifyReply, FastifyRequest } from 'fastify'
import { PatientRepository } from '@/repositories/patient-repository'
import { DeletePatientUseCase } from '@/use-cases/patient/delete-patient-use-case'

export async function DeletePatientController(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const patientRepository = new PatientRepository()
  const deletePatientUseCase = new DeletePatientUseCase(patientRepository)

  const result = await deletePatientUseCase.execute({
    params: { id: parseInt(id) }
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(204).send()
}