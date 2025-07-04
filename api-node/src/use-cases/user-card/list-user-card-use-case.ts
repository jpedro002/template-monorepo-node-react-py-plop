import { UserCardRepository, IQuery } from '../../repositories/user-card-repository'

interface ListRequest {
  query: IQuery
}

export class ListUserCardUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({ query }: ListRequest) {
    try {
      const result = await this.userCardRepository.all(query)
      
      return {
        success: true,
        data: result.data,
        rowCount: result.rowCount
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao listar userCards'
      }
    }
  }
}