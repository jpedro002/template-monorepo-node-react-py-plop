import { useUpdatePatientDialogModel } from './UpdatePatientDialog.model'
import { UpdatePatientDialogView } from './UpdatePatientDialog.view'

export function UpdatePatientDialog() {
	const props = useUpdatePatientDialogModel()
	return <UpdatePatientDialogView {...props} />
}
