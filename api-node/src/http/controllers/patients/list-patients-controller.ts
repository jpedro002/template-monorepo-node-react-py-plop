import { PatientRepository } from '@/repositories/patient-repository'
import { ListPatientUseCase } from '@/use-cases/patient/list-patient-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ListPatientsController(
  request: FastifyRequest<{
    Querystring: {
      term?: string
      fields?: string[]
      order?: string
    }
  }>,
  reply: FastifyReply,
) {
  const { term, fields, order } = request.query

  const patientRepository = new PatientRepository()
  const listPatientUseCase = new ListPatientUseCase(patientRepository)

  const result = await listPatientUseCase.execute({
    query: {
      term,
      fields,
      order
    }
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}