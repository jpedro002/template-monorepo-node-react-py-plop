import { UserCardRepository, IReqParams } from '../../repositories/user-card-repository'

interface DeleteRequest {
  params: IReqParams
}

export class DeleteUserCardUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({ params }: DeleteRequest) {
    try {
      await this.userCardRepository.del(params)
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao excluir userCard'
      }
    }
  }
}