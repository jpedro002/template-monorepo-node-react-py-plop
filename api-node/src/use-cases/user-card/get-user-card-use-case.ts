import { UserCardRepository, IReqParams } from '../../repositories/user-card-repository'

interface GetRequest {
  params: IReqParams
}

export class GetUserCardUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({ params }: GetRequest) {
    try {
      const result = await this.userCardRepository.one(params)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar userCard'
      }
    }
  }
}