// src/services/patient/patient.query-keys.ts
import type { PatientFilters } from './types'

export const patientKeys = {
  all: ['patient'] as const,
  get: (id: number) =>
    [...patientKeys.all, 'get', id] as const,
  list: (filters: PatientFilters = {}) =>
    [...patientKeys.all, 'list', filters] as const,
  fetch: (params: PatientFilters = {}) =>
    [...patientKeys.all, 'fetch', params] as const,
}
