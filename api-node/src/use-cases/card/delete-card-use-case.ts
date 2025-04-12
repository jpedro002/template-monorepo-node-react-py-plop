import { CardRepository, IReqParams } from '../../repositories/card-repository'

interface DeleteRequest {
  params: IReqParams
}

export class DeleteCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({ params }: DeleteRequest) {
    try {
      await this.cardRepository.del(params)
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao excluir card'
      }
    }
  }
}