import { PatientRepository, IReqParams } from '../../repositories/patient-repository'

interface GetRequest {
  params: IReqParams
}

export class GetPatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ params }: GetRequest) {
    try {
      const result = await this.patientRepository.one(params)
      
      return {
        success: true,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar patient'
      }
    }
  }
}