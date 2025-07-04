import { usePatientModel } from './Patient.model'
import { PatientView } from './Patient.view'

export const Patient = () => {
	const props = usePatientModel()
	return <PatientView {...props} />
}

export default Patient
