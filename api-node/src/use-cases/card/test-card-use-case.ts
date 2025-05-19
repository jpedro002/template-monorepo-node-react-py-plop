import { CardRepository } from '@/repositories/card-repository'

interface TestCardUseCaseRequest {
  data: any // Você pode definir a tipagem exata baseada no schema Zod
}

interface TestCardUseCaseResponse {
  success: boolean
  data?: any
  error?: string
}

export class TestCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  async execute({
    data,
  }: TestCardUseCaseRequest): Promise<TestCardUseCaseResponse> {
    try {
      // Implemente a lógica do use case aqui
      const result = await this.cardRepository.one({ id: params.id })
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}