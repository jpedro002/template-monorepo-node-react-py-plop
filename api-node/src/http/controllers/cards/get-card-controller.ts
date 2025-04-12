import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { GetCardUseCase } from '@/use-cases/card/get-card-use-case'

export async function GetCardController(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const cardRepository = new CardRepository()
  const getCardUseCase = new GetCardUseCase(cardRepository)

  const result = await getCardUseCase.execute({
    params: { id: parseInt(id) }
  })

  if (!result.success) {
    return reply.status(404).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}