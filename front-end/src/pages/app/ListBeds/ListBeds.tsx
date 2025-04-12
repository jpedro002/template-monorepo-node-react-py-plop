import { bedsService } from '@/services/beds/bedsService.service'
import { useListBeds } from './ListBeds.model'
import { ListBedsView } from './ListBeds.view'

export const ListBeds = () => {
	const props = useListBeds({
		bedsService,
	})

	return (
		<>
			<ListBedsView {...props} />
		</>
	)
}
