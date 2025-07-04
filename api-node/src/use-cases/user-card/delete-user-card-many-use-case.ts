import { UserCardRepository } from '@/repositories/user-card-repository'

interface DeleteUserCardManyUseCaseRequest {
  userId: number
  cardIds?: number[]
}

interface DeleteUserCardManyUseCaseResponse {
  count: number
}

export class DeleteUserCardManyUseCase {
  constructor(private userCardRepository: UserCardRepository) {}

  async execute({
    userId,
    cardIds,
  }: DeleteUserCardManyUseCaseRequest): Promise<DeleteUserCardManyUseCaseResponse> {
    const result = await this.userCardRepository.deleteManyByUserId(userId, cardIds)

    return result
  }
}
