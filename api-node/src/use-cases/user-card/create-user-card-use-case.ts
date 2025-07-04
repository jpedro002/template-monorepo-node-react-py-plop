import { Prisma } from '@prisma/client'
import { UserCardRepository } from '../../repositories/user-card-repository'

interface CreateRequest {
  data: Prisma.UserCardCreateInput
}

export class CreateUserCardUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({ data }: CreateRequest) {
    try {
      const result = await this.userCardRepository.post(data)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar userCard'
      }
    }
  }
}