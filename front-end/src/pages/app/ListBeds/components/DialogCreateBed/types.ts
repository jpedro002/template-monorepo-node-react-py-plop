import { IBedsService } from '@/services/beds'
import { useDialogCreateBedModel } from './DialogCreateBed.model'

export type DialogCreateBedViewProps = ReturnType<
	typeof useDialogCreateBedModel
>

export interface useDialogCreateBedModelProps {
	bedsService: IBedsService
}
