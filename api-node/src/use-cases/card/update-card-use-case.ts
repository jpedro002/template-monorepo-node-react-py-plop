import { Prisma } from '@prisma/client'
import { CardRepository, IReqParams } from '../../repositories/card-repository'

interface UpdateRequest {
  params: IReqParams
  data: Prisma.CardUpdateInput
}

export class UpdateCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ params, data }: UpdateRequest) {
    try {
      const result = await this.cardRepository.put(params, data)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar card'
      }
    }
  }
}