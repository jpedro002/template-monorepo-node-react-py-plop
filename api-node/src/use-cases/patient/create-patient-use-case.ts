import { Prisma } from '@prisma/client'
import { PatientRepository } from '../../repositories/patient-repository'

interface CreateRequest {
  data: Prisma.PatientCreateInput
}

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ data }: CreateRequest) {
    try {
      const result = await this.patientRepository.post(data)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar patient'
      }
    }
  }
}