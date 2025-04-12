import { bedsService } from '@/services/beds'
import { useBedDetailsModel } from './BedDetails.model'
import { BedDetailsView } from './BedDetails.view'

export const BedDetails = () => {
	const props = useBedDetailsModel({
		bedsService,
	})

	return <BedDetailsView {...props} />
}
