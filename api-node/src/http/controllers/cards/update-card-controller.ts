import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { UpdateCardUseCase } from '@/use-cases/card/update-card-use-case'
import { z } from 'zod'


// Importação do schema gerado pela lib zod-prisma-types
import { CardUpdateManyMutationInputSchema } from '@/schemas/zod'

export async function UpdateCardController(
  request: FastifyRequest<{
    Params: { id: string }
    Body: z.infer<typeof CardUpdateManyMutationInputSchema>
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params
  const { body } = request

  const parsedCard = CardUpdateManyMutationInputSchema.parse(body)
  
  const cardRepository = new CardRepository()
  const updateCardUseCase = new UpdateCardUseCase(cardRepository)

  const result = await updateCardUseCase.execute({
    params: { id: parseInt(id) },
    data: parsedCard
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
}