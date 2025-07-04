import { Prisma } from '@prisma/client'
import { PatientRepository, IReqParams } from '../../repositories/patient-repository'

interface UpdateRequest {
  params: IReqParams
  data: Prisma.PatientUpdateInput
}

export class UpdatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ params, data }: UpdateRequest) {
    try {
      const result = await this.patientRepository.put(params, data)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar patient'
      }
    }
  }
}