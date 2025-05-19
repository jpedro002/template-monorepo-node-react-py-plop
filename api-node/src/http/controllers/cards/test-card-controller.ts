import { FastifyReply, FastifyRequest } from 'fastify'
import { CardRepository } from '@/repositories/card-repository'
import { TestCardUseCase } from '@/use-cases/card/test-card-use-case'
import { z } from 'zod'
// import { CardSchema } from '@/schemas/zod'

export async function TestCardController(
  request: FastifyRequest<{
    Body: any // Substitua por z.infer<typeof SeuSchema>
  }>,
  reply: FastifyReply,
) {
  const { body } = request
  
  // Validar com Zod se necessário
  // const parsedData = YourZodSchema.parse(body)

  const cardRepository = new CardRepository()
  const testCardUseCase = new TestCardUseCase(cardRepository)

  const result = await testCardUseCase.execute({
    data: body, // ou parsedData se usar validação
  })

  if (!result.success) {
    return reply.status(400).send({ message: result.error })
  }

  return reply.status(200).send(result.data)
  }