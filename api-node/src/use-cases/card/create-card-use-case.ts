import { Prisma } from '@prisma/client'
import { CardRepository } from '../../repositories/card-repository'

interface CreateRequest {
  data: Prisma.CardCreateInput
}

export class CreateCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ data }: CreateRequest) {
    try {
      const result = await this.cardRepository.post(data)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar card'
      }
    }
  }
}