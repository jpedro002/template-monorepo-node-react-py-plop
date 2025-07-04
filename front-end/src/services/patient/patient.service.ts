import { api } from '@/lib/axios'
import { IPatientService } from './IPatientService';
import { CreatePatientDto, PaginatedPatientResponse, Patient, PatientFilters, UpdatePatientDto } from './types';

const baseUrl = `/patients`;

/**
 * Cria um novo patient
 */
const create = async (data: CreatePatientDto): Promise<Patient> => {
  const response = await api.post<Patient>(baseUrl, data);
  return response.data;
};

/**
 * Obtém um patient por ID
 */
const get = async (id: number): Promise<Patient> => {
  const response = await api.get<Patient>(`${baseUrl}/${id}`);
  return response.data;
};

/**
 * Lista todos os patients sem paginação
 */
const list = async (filters: PatientFilters = {}): Promise<Patient[]> => {
  const { term, fields, order } = filters;
  const params = {
    term,
    fields: Array.isArray(fields) ? fields : undefined,
    order
  };

  const response = await api.get<Patient[]>(baseUrl, { params });
  return response.data;
};

/**
 * Busca patients com paginação e filtros avançados
 */
const fetch = async (filters: PatientFilters = {}): Promise<PaginatedPatientResponse> => {
  const { term, fields, order, page = 1, pageSize = 20, itens } = filters;
  const params = {
    term,
    fields: Array.isArray(fields) ? fields : undefined,
    order,
    page,
    pageSize,
    itens: Array.isArray(itens) ? itens : undefined
  };

  const response = await api.get<PaginatedPatientResponse>(`${baseUrl}/fetch`, { params });
  return response.data;
};

/**
 * Atualiza um patient existente
 */
const update = async (id: number, data: UpdatePatientDto): Promise<Patient> => {
  const response = await api.put<Patient>(`${baseUrl}/${id}`, data);
  return response.data;
};

/**
 * Exclui um patient por ID
 */
const deleteById = async (id: number): Promise<void> => {
  await api.delete(`${baseUrl}/${id}`);
};

export const patientService: IPatientService = {
  create,
  get,
  list,
  fetch,
  update,
  delete: deleteById,
};