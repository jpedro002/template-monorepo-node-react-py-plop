import { IBedsService } from '@/services/beds'
import { useModalRemovePatientFromBedModel } from './ModalRemovePatientFromBed.model'

export interface useModalRemovePatientFromBedModelProps {
	bedsService: IBedsService
}

export type ModalRemovePatientFromBedViewProps = ReturnType<
	typeof useModalRemovePatientFromBedModel
>
