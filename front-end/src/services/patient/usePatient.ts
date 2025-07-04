// src/services/patient/usePatient.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { patientService } from './patient.service'
import { patientKeys } from './patient.query-keys'
import type {
  Patient,
  CreatePatientDto,
  UpdatePatientDto,
  PatientFilters,
  PaginatedPatientResponse
} from './types'

export function usePatientList(filters?: PatientFilters) {
  return useQuery<Patient[]>({
    queryKey: patientKeys.list(filters),
    queryFn: () => patientService.list(filters),
  })
}

export function usePatientGet(id: number) {
  return useQuery<Patient>({
    queryKey: patientKeys.get(id),
    queryFn: () => patientService.get(id),
    enabled: !!id,
  })
}

export function usePatientCreate() {
  const queryClient = useQueryClient()
  return useMutation<
    Patient,
    unknown,
    CreatePatientDto
  >({
    mutationFn: patientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all })
    },
  })
}

export function usePatientUpdate() {
  const queryClient = useQueryClient()
  return useMutation<
    Patient,
    unknown,
    { id: number; data: UpdatePatientDto }
  >({
    mutationFn: ({ id, data }) => patientService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all })
    },
  })
}

export function usePatientDelete() {
  const queryClient = useQueryClient()
  return useMutation<
    void,
    unknown,
    number
  >({
    mutationFn: (id) => patientService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all })
    },
  })
}

export function usePatientFetch(params?: PatientFilters) {
  return useQuery<PaginatedPatientResponse>({
    queryKey: patientKeys.fetch(params),
    queryFn: () => patientService.fetch(params),
  })
}
