import { formateBirthDate } from '@/lib/ultil/format-date'
import { useAppSelector } from '@/store'

export const useNursingRecordsTableModel = () => {
	const nursingRecords = useAppSelector(
		(state) => state.beds?.bedDetails?.PressureUlcerAssessments || [],
	)

	const nursingRecordsReversed = nursingRecords.toReversed()

	return {
		nursingRecords: nursingRecordsReversed,
		formateBirthDate,
	}
}
