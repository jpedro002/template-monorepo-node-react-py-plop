import { PatientRepository, IQuery } from '../../repositories/patient-repository'

interface ListRequest {
  query: IQuery
}

export class ListPatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({ query }: ListRequest) {
    try {
      const result = await this.patientRepository.all(query)
      
      return {
        success: true,
        data: result.data,
        rowCount: result.rowCount
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao listar patients'
      }
    }
  }
}