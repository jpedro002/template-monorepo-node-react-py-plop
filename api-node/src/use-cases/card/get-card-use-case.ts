import { CardRepository, IReqParams } from '../../repositories/card-repository'

interface GetRequest {
  params: IReqParams
}

export class GetCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ params }: GetRequest) {
    try {
      const result = await this.cardRepository.one(params)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar card'
      }
    }
  }
}