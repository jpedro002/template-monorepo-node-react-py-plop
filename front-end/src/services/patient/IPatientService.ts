import { Patient, CreatePatientDto, UpdatePatientDto, PatientFilters, PaginatedPatientResponse } from './types';

export interface IPatientService {
  /**
   * Cria um novo patient
   */
  create(data: CreatePatientDto): Promise<Patient>;
  
  /**
   * Obtém um patient por ID
   */
  get(id: number): Promise<Patient>;
  
  /**
   * Lista todos os patients sem paginação
   */
  list(filters?: PatientFilters): Promise<Patient[]>;
  
  /**
   * Busca patients com paginação e filtros avançados
   */
  fetch(filters?: PatientFilters): Promise<PaginatedPatientResponse>;
  
  /**
   * Atualiza um patient existente
   */
  update(id: number, data: UpdatePatientDto): Promise<Patient>;
  
  /**
   * Exclui um patient por ID
   */
  delete(id: number): Promise<void>;
}