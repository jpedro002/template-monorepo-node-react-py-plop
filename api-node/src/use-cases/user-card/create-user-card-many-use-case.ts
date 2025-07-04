import { UserCardRepository } from '@/repositories/user-card-repository'

interface CreateUserCardManyUseCaseRequest {
  userId: number
  cardData: { cardId: number }[]
}

interface CreateUserCardManyUseCaseResponse {
  count: number
}

export class CreateUserCardManyUseCase {
  constructor(private userCardRepository: UserCardRepository) { }

  async execute({
    userId,
    cardData,
  }: CreateUserCardManyUseCaseRequest): Promise<CreateUserCardManyUseCaseResponse> {
    const result = await this.userCardRepository.createMany(userId, cardData)

    return result
  }
}
