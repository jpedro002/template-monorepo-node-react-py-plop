import { UseFormReturn, FieldErrors } from 'react-hook-form'
import { PatientFilterFormData } from './schema'

export interface FilterProps {
  onFilterChange: (searchTerm: string) => void
}

export interface FilterViewProps {
  form: UseFormReturn<PatientFilterFormData>
  handleSearch: (data: PatientFilterFormData) => void
  handleReset: () => void
  isValid: boolean
  errors: FieldErrors<PatientFilterFormData>
}
