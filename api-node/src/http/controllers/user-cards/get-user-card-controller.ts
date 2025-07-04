import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { GetUserCardUseCase } from '@/use-cases/user-card/get-user-card-use-case'

export async function GetUserCardController(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const userCardRepository = new UserCardRepository()
  const getUserCardUseCase = new GetUserCardUseCase(userCardRepository)

  const result = await getUserCardUseCase.execute({
    params: { id: parseInt(id) }
  })

  if (!result.success) {
    return reply.status(404).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}