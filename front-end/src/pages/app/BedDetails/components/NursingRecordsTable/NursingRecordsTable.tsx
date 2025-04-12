import { useNursingRecordsTableModel } from './NursingRecordsTable.model'
import { NursingRecordsTableView } from './NursingRecordsTable.view'

export const NursingRecordsTable = () => {
	const props = useNursingRecordsTableModel()

	return <NursingRecordsTableView {...props} />
}
