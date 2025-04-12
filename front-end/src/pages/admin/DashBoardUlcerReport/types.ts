import { IAnswersService } from '@/services/answers'
import { useDashBoardUlcerReportModel } from './DashBoardUlcerReport.model'

export type DashBoardUlcerReportViewProps = ReturnType<
	typeof useDashBoardUlcerReportModel
>

export interface UseDashBoardUlcerReportModelProps {
	answerService: IAnswersService
}

export interface IndicatorData {
	nPacAvaliados: number
	quantRegistros: number
	pacComLP: number
	percentPacComLP: number
	nPacAdmComLP: number
	percentPacAdmComLP: number
	nPacSemRiscoComLP: number
	nPacMelhoraMensal: number
	percentMelhoraMensal: number
	[key: string]: number
}

export interface MonthlyData {
	[month: string]: IndicatorData
}

export interface IndicatorDescriptions {
	[key: string]: string
}

export interface ChartDataItem {
	name: string
	value: number
}
