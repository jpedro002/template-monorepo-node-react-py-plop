import { UserCardRepository, IQuery } from '../../repositories/user-card-repository'

interface FetchRequest {
  query: IQuery
}

export class FetchUserCardUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({ query }: FetchRequest) {
    try {
      const result = await this.userCardRepository.fetch(query)
      
      return {
        success: true,
        data: result.data,
        pagination: result.pagination
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar userCards'
      }
    }
  }
}