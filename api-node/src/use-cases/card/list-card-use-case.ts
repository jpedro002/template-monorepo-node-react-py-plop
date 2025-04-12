import { CardRepository, IQuery } from '../../repositories/card-repository'

interface ListRequest {
  query: IQuery
}

export class ListCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ query }: ListRequest) {
    try {
      const result = await this.cardRepository.all(query)
      
      return {
        success: true,
        data: result.data,
        rowCount: result.rowCount
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao listar cards'
      }
    }
  }
}