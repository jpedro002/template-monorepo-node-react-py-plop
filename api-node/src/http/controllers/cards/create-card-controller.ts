import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { CreateCardUseCase } from '@/use-cases/card/create-card-use-case'
import { z } from 'zod'


import { CardCreateManyInputSchema } from '@/schemas/zod'

export async function CreateCardController(
  request: FastifyRequest<{
    Body: z.infer<typeof CardCreateManyInputSchema>
  }>,
  reply: FastifyReply,
) {
  const { body } = request

  const parsedCard = CardCreateManyInputSchema.parse(body)
  
  const cardRepository = new CardRepository()
  const createCardUseCase = new CreateCardUseCase(cardRepository)

  const result = await createCardUseCase.execute({
    data: parsedCard
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(201).send(result.data)
}