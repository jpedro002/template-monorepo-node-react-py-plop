import { useCreatePatientDialogModel } from './CreatePatientDialog.model'
import { CreatePatientDialogView } from './CreatePatientDialog.view'

export function CreatePatientDialog() {
	const props = useCreatePatientDialogModel()
	return <CreatePatientDialogView {...props} />
}
