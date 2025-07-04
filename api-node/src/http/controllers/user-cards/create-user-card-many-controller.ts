import { UserCardRepository } from '@/repositories/user-card-repository'
import { CreateUserCardManyUseCase } from '@/use-cases/user-card/create-user-card-many-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUserCardManyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserCardManyBodySchema = z.object({
    userId: z.number(),
    cardData: z.array(z.object({
      cardId: z.number(),
    })),
  })

  const { userId, cardData } = createUserCardManyBodySchema.parse(request.body)

  try {
    const userCardRepository = new UserCardRepository()
    const createUserCardManyUseCase = new CreateUserCardManyUseCase(userCardRepository)

    const result = await createUserCardManyUseCase.execute({
      userId,
      cardData,
    })

    return reply.status(201).send(result)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
