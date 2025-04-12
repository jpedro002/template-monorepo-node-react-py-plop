import { IBedsService } from '@/services/beds'
import { useNursingRecordsTableModel } from './NursingRecordsTable.model'

export interface useBedDetailsModelProps {
	bedsService: IBedsService
}

export type NursingRecordsTableViewProps = ReturnType<
	typeof useNursingRecordsTableModel
>
