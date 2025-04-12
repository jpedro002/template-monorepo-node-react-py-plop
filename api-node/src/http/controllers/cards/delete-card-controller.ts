import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { DeleteCardUseCase } from '@/use-cases/card/delete-card-use-case'

export async function DeleteCardController(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const cardRepository = new CardRepository()
  const deleteCardUseCase = new DeleteCardUseCase(cardRepository)

  const result = await deleteCardUseCase.execute({
    params: { id: parseInt(id) }
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(204).send()
}