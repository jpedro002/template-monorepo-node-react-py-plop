import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { ListCardUseCase } from '@/use-cases/card/list-card-use-case'

export async function ListCardsController(
  request: FastifyRequest<{
    Querystring: {
      term?: string
      fields?: string
      order?: string
    }
  }>,
  reply: FastifyReply,
) {
  const { term, fields, order } = request.query

  const cardRepository = new CardRepository()
  const listCardUseCase = new ListCardUseCase(cardRepository)

  const result = await listCardUseCase.execute({
    query: {
      term,
      fields: fields ? fields.split(',') : undefined,
      order
    }
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}