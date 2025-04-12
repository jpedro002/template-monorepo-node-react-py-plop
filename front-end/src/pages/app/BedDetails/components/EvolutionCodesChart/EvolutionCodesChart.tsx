import { useEvolutionCodesChartModel } from './EvolutionCodesChart.model'
import { EvolutionCodesChartView } from './EvolutionCodesChart.view'

export const EvolutionCodesChart = () => {
	const props = useEvolutionCodesChartModel()
	return <EvolutionCodesChartView {...props} />
}
