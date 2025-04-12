import { IBedsService } from '@/services/beds/IBedsService'
import { useListBeds } from './ListBeds.model'

export type IListBedsViewProps = ReturnType<typeof useListBeds>

export interface useListBedsProps {
	bedsService: IBedsService
}
