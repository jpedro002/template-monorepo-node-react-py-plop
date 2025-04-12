import { IBedsService } from '@/services/beds'
import { z } from 'zod'
import { useModalAddPatientToBedModel } from './ModalAddPatientToBed.model'
import { addPatientSchema } from './schemas'

export interface useModalAddPatientToBedProps {
	bedsService: IBedsService
}

export type ModalAddPatientToBedViewProps = ReturnType<
	typeof useModalAddPatientToBedModel
>

export type AddPatientSchema = z.infer<typeof addPatientSchema>
