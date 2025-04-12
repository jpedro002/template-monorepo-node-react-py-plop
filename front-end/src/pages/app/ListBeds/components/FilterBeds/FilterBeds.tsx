import { useFilterBeds } from './FilterBeds.model'
import { FilterBedsView } from './FilterBeds.view'

export const FilterBeds = () => {
	const props = useFilterBeds()

	return (
		<>
			<FilterBedsView {...props} />
		</>
	)
}
