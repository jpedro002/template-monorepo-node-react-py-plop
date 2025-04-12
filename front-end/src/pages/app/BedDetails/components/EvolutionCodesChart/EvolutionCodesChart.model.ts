import { formateBirthDate } from '@/lib/ultil/format-date'
import { useAppSelector } from '@/store'

export const useEvolutionCodesChartModel = () => {
	const nursingRecords = useAppSelector(
		(state) => state.beds?.bedDetails?.PressureUlcerAssessments || [],
	)

	const chartData = nursingRecords.map((record) => ({
		date: formateBirthDate(record.createdAt),
		code: record.numericAnswer,
	}))

	return {
		chartData,
	}
}
