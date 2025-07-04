import { FastifyReply, FastifyRequest } from 'fastify'
import { UserCardRepository } from '@/repositories/user-card-repository'
import { UpdateUserCardUseCase } from '@/use-cases/user-card/update-user-card-use-case'
import { z } from 'zod'


// Importação do schema gerado pela lib zod-prisma-types
import { UserCardUpdateManyMutationInputSchema } from '@/schemas/zod'

export async function UpdateUserCardController(
  request: FastifyRequest<{
    Params: { id: string }
    Body: z.infer<typeof UserCardUpdateManyMutationInputSchema>
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params
  const { body } = request

  const parsedUserCard = UserCardUpdateManyMutationInputSchema.parse(body)
  
  const userCardRepository = new UserCardRepository()
  const updateUserCardUseCase = new UpdateUserCardUseCase(userCardRepository)

  const result = await updateUserCardUseCase.execute({
    params: { id: parseInt(id) },
    data: parsedUserCard
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}