import {
    Patient,
} from '@/services/patient'
import { usePatientModel } from './Patient.model'

export interface UsePatientModelProps {
    // Props interface pode ser removida ou deixada vazia se não precisar de props
}

export type PatientViewProps = ReturnType<
    typeof usePatientModel
>

export interface PatientSharedProps {
    patients: Patient[]
    onEdit: (b: boolean, id: number) => void
}
