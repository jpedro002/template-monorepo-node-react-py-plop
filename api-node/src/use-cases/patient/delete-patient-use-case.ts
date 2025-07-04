import { PatientRepository, IReqParams } from '../../repositories/patient-repository'

interface DeleteRequest {
  params: IReqParams
}

export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ params }: DeleteRequest) {
    try {
      await this.patientRepository.del(params)
      
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao excluir patient'
      }
    }
  }
}