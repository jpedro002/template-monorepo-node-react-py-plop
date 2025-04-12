import { bedsService } from '@/services/beds'
import { useDialogCreateBedModel } from './DialogCreateBed.model'
import { DialogCreateBedView } from './DialogCreateBed.view'

const DialogCreateBed = () => {
	const props = useDialogCreateBedModel({
		bedsService,
	})

	return <DialogCreateBedView {...props} />
}

export default DialogCreateBed
