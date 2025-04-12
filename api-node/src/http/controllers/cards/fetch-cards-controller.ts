import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { FetchCardUseCase } from '@/use-cases/card/fetch-card-use-case'

export async function FetchCardsController(
  request: FastifyRequest<{
    Querystring: {
      term?: string
      fields?: string
      order?: string
      page?: number
      pageSize?: number
      itens?: string
    }
  }>,
  reply: FastifyReply,
) {
  const { term, fields, order, page = 1, pageSize = 20, itens } = request.query

  const cardRepository = new CardRepository()
  const fetchCardUseCase = new FetchCardUseCase(cardRepository)

  const result = await fetchCardUseCase.execute({
    query: {
      term,
      fields: fields ? fields.split(',') : undefined,
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