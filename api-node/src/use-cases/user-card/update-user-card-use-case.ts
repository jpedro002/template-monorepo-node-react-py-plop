import { Prisma } from '@prisma/client'
import { UserCardRepository, IReqParams } from '../../repositories/user-card-repository'

interface UpdateRequest {
  params: IReqParams
  data: Prisma.UserCardUpdateInput
}

export class UpdateUserCardUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({ params, data }: UpdateRequest) {
    try {
      const result = await this.userCardRepository.put(params, data)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar userCard'
      }
    }
  }
}