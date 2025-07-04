import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { CreateUserCardUseCase } from '@/use-cases/user-card/create-user-card-use-case'
import { z } from 'zod'


import { UserCardCreateManyInputSchema } from '@/schemas/zod'

export async function CreateUserCardController(
  request: FastifyRequest<{
    Body: z.infer<typeof UserCardCreateManyInputSchema>
  }>,
  reply: FastifyReply,
) {
  const { body } = request

  const parsedUserCard = UserCardCreateManyInputSchema.parse(body)
  
  const userCardRepository = new UserCardRepository()
  const createUserCardUseCase = new CreateUserCardUseCase(userCardRepository)

  const result = await createUserCardUseCase.execute({
    data: parsedUserCard
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(201).send(result.data)
}