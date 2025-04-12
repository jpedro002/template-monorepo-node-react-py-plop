import { bedsService } from '@/services/beds'

import { useModalAddPatientToBedModel } from './ModalAddPatientToBed.model'
import { ModalAddPatientToBedView } from './ModalAddPatientToBed.view'

export const ModalAddPatientToBed = () => {
	const props = useModalAddPatientToBedModel({
		bedsService,
	})

	return <ModalAddPatientToBedView {...props} />
}
