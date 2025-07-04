import { PatientRepository, IQuery } from '../../repositories/patient-repository'

interface FetchRequest {
  query: IQuery
}

export class FetchPatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ query }: FetchRequest) {
    try {
      const result = await this.patientRepository.fetch(query)
      
      return {
        success: true,
        data: result.data,
        pagination: result.pagination
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar patients'
      }
    }
  }
}