import { PatientRepository } from '@/repositories/patient-repository'
import { FetchPatientUseCase } from '@/use-cases/patient/fetch-patient-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function FetchPatientsController(
  request: FastifyRequest<{
    Querystring: {
      term?: string
      fields?: string[]
      order?: string
      page?: number
      pageSize?: number
      itens?: string
    }
  }>,
  reply: FastifyReply,
) {
  const { term, fields, order, page = 1, pageSize = 20, itens } = request.query

  const patientRepository = new PatientRepository()
  const fetchPatientUseCase = new FetchPatientUseCase(patientRepository)

  console.log('Fetching patients with parameters:', fields);

  const result = await fetchPatientUseCase.execute({
    query: {
      term,
      fields,
      order,
      page: Number(page),
      pageSize: Number(pageSize),
      itens: itens ? itens.split(',').map(Number) : undefined
    }
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send({
    data: result.data,
    pagination: result.pagination
  })
}