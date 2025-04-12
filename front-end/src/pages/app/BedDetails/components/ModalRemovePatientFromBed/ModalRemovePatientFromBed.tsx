import { bedsService } from '@/services/beds'

import { useModalRemovePatientFromBedModel } from './ModalRemovePatientFromBed.model'
import { ModalRemovePatientFromBedView } from './ModalRemovePatientFromBed.view'

export const ModalRemovePatientFromBed = () => {
	const props = useModalRemovePatientFromBedModel({
		bedsService,
	})

	return <ModalRemovePatientFromBedView {...props} />
}
