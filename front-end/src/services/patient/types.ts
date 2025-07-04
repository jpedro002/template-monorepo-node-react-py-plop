export interface Patient {
  id: number;
  name: string;
  createdAt: string; // ISO string format from API
}

export interface CreatePatientDto {
  name: string;
}

export interface UpdatePatientDto {
  name?: string;
}

export interface PatientFilters {
  term?: string;
  fields?: string[];
  order?: string;
  page?: number;
  pageSize?: number;
  itens?: number[];
}

export interface PaginatedPatientResponse {
  data: Patient[];
  pagination: {
    page: number;
    rowCount: number;
    pageCount: number;
    pageSize: number;
  }
}
