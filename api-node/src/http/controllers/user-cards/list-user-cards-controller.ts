import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { ListUserCardUseCase } from '@/use-cases/user-card/list-user-card-use-case'

export async function ListUserCardsController(
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

  const userCardRepository = new UserCardRepository()
  const listUserCardUseCase = new ListUserCardUseCase(userCardRepository)

  const result = await listUserCardUseCase.execute({
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