import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { DeleteUserCardManyUseCase } from '@/use-cases/user-card/delete-user-card-many-use-case'

export async function deleteUserCardManyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteUserCardManyBodySchema = z.object({
    userId: z.number(),
    cardIds: z.array(z.number()).optional(),
  })

  const { userId, cardIds } = deleteUserCardManyBodySchema.parse(request.body)

  try {
    const userCardRepository = new UserCardRepository()
    const deleteUserCardManyUseCase = new DeleteUserCardManyUseCase(userCardRepository)

    const result = await deleteUserCardManyUseCase.execute({
      userId,
      cardIds,
    })

    return reply.status(200).send(result)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
