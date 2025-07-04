import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { DeleteUserCardUseCase } from '@/use-cases/user-card/delete-user-card-use-case'

export async function DeleteUserCardController(
  request: FastifyRequest<{
    Params: { id: string }
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  const userCardRepository = new UserCardRepository()
  const deleteUserCardUseCase = new DeleteUserCardUseCase(userCardRepository)

  const result = await deleteUserCardUseCase.execute({
    params: { id: parseInt(id) }
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(204).send()
}