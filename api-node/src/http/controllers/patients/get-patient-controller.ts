import { FastifyReply, FastifyRequest } from 'fastify'
import { PatientRepository } from '@/repositories/patient-repository'
import { GetPatientUseCase } from '@/use-cases/patient/get-patient-use-case'

export async function GetPatientController(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const patientRepository = new PatientRepository()
  const getPatientUseCase = new GetPatientUseCase(patientRepository)

  const result = await getPatientUseCase.execute({
    params: { id: parseInt(id) }
  })

  if (!result.success) {
    return reply.status(404).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}