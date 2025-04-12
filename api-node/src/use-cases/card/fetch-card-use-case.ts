import { CardRepository, IQuery } from '../../repositories/card-repository'

interface FetchRequest {
  query: IQuery
}

export class FetchCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ query }: FetchRequest) {
    try {
      const result = await this.cardRepository.fetch(query)
      
      return {
        success: true,
        data: result.data,
        pagination: result.pagination
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar cards'
      }
    }
  }
}