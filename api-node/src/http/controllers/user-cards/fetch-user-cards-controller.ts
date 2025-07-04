import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { FetchUserCardUseCase } from '@/use-cases/user-card/fetch-user-card-use-case'

export async function FetchUserCardsController(
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

  const userCardRepository = new UserCardRepository()
  const fetchUserCardUseCase = new FetchUserCardUseCase(userCardRepository)

  const result = await fetchUserCardUseCase.execute({
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