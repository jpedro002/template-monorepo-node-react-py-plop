import { useAppTitle } from '@/hooks/useAppTitle'
import { RootState, useAppSelector } from '@/store'
import {
	setComparisonMode,
	setComparisonMonth,
	setData,
	setIndicatorTitle,
	setIsModalOpen,
	setLoading,
	setSelectedIndicator,
	setSelectedMonth,
} from '@/store/slices/dashboardDataSlice'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import {
	ChartDataItem,
	IndicatorDescriptions,
	UseDashBoardUlcerReportModelProps,
} from './types'

const sortMonths = (months: string[]) => {
	return months.sort((a, b) => {
		const [monthA, yearA] = a.split('/').map(Number)
		const [monthB, yearB] = b.split('/').map(Number)
		return yearA === yearB ? monthA - monthB : yearA - yearB
	})
}

const descriptions: IndicatorDescriptions = {
	nPacAvaliados: 'Número de pacientes avaliados',
	quantRegistros: 'Número de registros',
	pacComLP: 'Pacientes com lesão por pressão',
	percentPacComLP: 'Porcentagem de pacientes com lesão por pressão',
	nPacAdmComLP: 'Número de pacientes internados com lesão por pressão',
	percentPacAdmComLP:
		'Porcentagem de pacientes internados com lesão por pressão',
	nPacSemRiscoComLP: 'Número de pacientes sem risco com lesão por pressão',
	nPacMelhoraMensal: 'Número de pacientes com desfechos favoráveis',
	percentMelhoraMensal: 'Porcentagem de desfechos favoráveis',
	mediaDiasSemRegistro: 'Média de dias sem registro',
	nPacComLPPMelhora: 'Número de pacientes com melhora de lesão por pressão',
	percentPacComLPPMelhora:
		'Porcentagem de pacientes com melhora de lesão por pressão',
}

export const useDashBoardUlcerReportModel = ({
	answerService,
}: UseDashBoardUlcerReportModelProps) => {
	const dispatch = useDispatch()
	const {
		data,
		selectedMonth,
		comparisonMode,
		comparisonMonth,
		isModalOpen,
		selectedIndicator,
		indicatorTitle,
		loading,
	} = useAppSelector((state: RootState) => state.ulcerReport)

	useAppTitle({
		title: 'Relatório de Úlceras - Dashboard',
	})

	useEffect(() => {
		const loadData = async () => {
			dispatch(setLoading(true))
			try {
				const data = await answerService.getUlcerReport()

				dispatch(setData(data))

				const sortedMonths = sortMonths(Object.keys(data))

				if (!selectedMonth && sortedMonths.length > 0) {
					dispatch(setSelectedMonth(sortedMonths[sortedMonths.length - 1]))
				}

				if (!comparisonMonth && sortedMonths.length > 1) {
					dispatch(setComparisonMonth(sortedMonths[sortedMonths.length - 2]))
				}
			} catch (error) {
				if (isAxiosError(error)) {
					toast.error(
						error.response?.data.message ||
							'Erro ao carregar dados do relatório de úlceras',
					)
				}
			} finally {
				dispatch(setLoading(false))
			}
		}

		loadData()
	}, [])

	const months =
		Object.keys(data).length > 0
			? sortMonths(Object.keys(data))
			: sortMonths(Object.keys(data))

	const getMonthIndex = (month: string) => months.indexOf(month)

	const navigateMonth = (direction: 'previous' | 'next') => {
		const currentIndex = getMonthIndex(selectedMonth)
		const newIndex =
			direction === 'previous'
				? Math.max(0, currentIndex - 1)
				: Math.min(months.length - 1, currentIndex + 1)
		dispatch(setSelectedMonth(months[newIndex]))
	}

	const calculateVariation = (currentValue: number, previousValue: number) => {
		if (previousValue === 0) return currentValue > 0 ? 100 : 0
		return ((currentValue - previousValue) / previousValue) * 100
	}

	const getVariationColor = (variation: number, metric: string) => {
		const invertedMetrics: (keyof IndicatorDescriptions)[] = [
			'percentPacComLP',
			'nPacAdmComLP',
			'percentPacAdmComLP',
			'nPacSemRiscoComLP',
			'pacComLP',
			'mediaDiasSemRegistro',
		]

		const isPositive = invertedMetrics.includes(metric)
			? variation < 0
			: variation > 0

		return isPositive ? 'text-green-600' : 'text-red-600'
	}
	const getIndicatorName = (key: string) => {
		return descriptions[key] || key
	}

	const prepareChartData = (indicator: string): ChartDataItem[] => {
		return months.map((month) => ({
			name: month,
			value: data[month]?.[indicator as keyof (typeof data)[typeof month]] || 0,
		}))
	}

	const openIndicatorModal = (key: string) => {
		if (comparisonMode) {
			dispatch(setSelectedIndicator(key))
			dispatch(setIndicatorTitle(getIndicatorName(key)))
			dispatch(setIsModalOpen(true))
		}
	}

	const indicatorOrder = [
		'nPacAvaliados',
		'quantRegistros',
		'pacComLP',
		'percentPacComLP',
		'nPacAdmComLP',
		'percentPacAdmComLP',
		'nPacSemRiscoComLP',
		'nPacMelhoraMensal',
		'percentMelhoraMensal',
		'mediaDiasSemRegistro',
		'nPacComLPPMelhora',
		'percentPacComLPPMelhora',
	]

	return {
		months,
		data,
		descriptions,
		selectedMonth,
		setSelectedMonth: (month: string) => dispatch(setSelectedMonth(month)),
		comparisonMode,
		setComparisonMode: (mode: boolean) => dispatch(setComparisonMode(mode)),
		setComparisonMonth: (month: string) => dispatch(setComparisonMonth(month)),
		comparisonMonth,
		isModalOpen,
		setIsModalOpen: (open: boolean) => dispatch(setIsModalOpen(open)),
		selectedIndicator,
		indicatorTitle,
		getMonthIndex,
		navigateMonth,
		calculateVariation,
		getVariationColor,
		getIndicatorName,
		prepareChartData,
		openIndicatorModal,
		indicatorOrder,
		loading,
	}
}
