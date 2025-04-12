import { Button } from '@/components/ui/button/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

import { GraficoModal } from './components/GraficoModal/GraficoModal'
import { IndicadorCard } from './components/IndicadorCard/IndicadorCard'
import { TabelaComparativa } from './components/TabelaComparativa/TabelaComparativa'
import { DashBoardUlcerReportViewProps } from './types'

export const DashBoardUlcerReportView = (
	props: DashBoardUlcerReportViewProps,
) => {
	const {
		months,
		data,
		selectedMonth,
		setSelectedMonth,
		comparisonMode,
		setComparisonMode,
		comparisonMonth,
		setComparisonMonth,
		isModalOpen,
		setIsModalOpen,
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
	} = props

	return (
		<main className="flex-1 p-4 md:p-6">
			<div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold">Resumo dos Dados</h2>
					<p className="text-muted-foreground">
						Análise mensal de indicadores de lesão por pressão
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
					<Tabs defaultValue="mensal" className="w-full md:w-auto">
						<TabsList>
							<TabsTrigger
								value="mensal"
								onClick={() => setComparisonMode(false)}
							>
								<Calendar className="h-4 w-4 mr-2" />
								Mensal
							</TabsTrigger>
							<TabsTrigger
								value="comparativo"
								onClick={() => setComparisonMode(true)}
							>
								<BarChart3 className="h-4 w-4 mr-2" />
								Comparativo
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>

			<div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-2 w-full sm:w-auto">
					<Button
						variant="outline"
						size="icon"
						onClick={() => navigateMonth('previous')}
						disabled={getMonthIndex(selectedMonth) === 0}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<Select value={selectedMonth} onValueChange={setSelectedMonth}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Selecione o mês" />
						</SelectTrigger>
						<SelectContent>
							{months.map((mes) => (
								<SelectItem key={mes} value={mes}>
									{mes}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Button
						variant="outline"
						size="icon"
						onClick={() => navigateMonth('next')}
						disabled={getMonthIndex(selectedMonth) === months.length - 1}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				{comparisonMode && (
					<div className="flex items-center gap-2 w-full sm:w-auto">
						<span className="text-sm text-muted-foreground">Comparar com:</span>
						<Select value={comparisonMonth} onValueChange={setComparisonMonth}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Selecione o mês" />
							</SelectTrigger>
							<SelectContent>
								{months
									.filter((mes) => mes !== selectedMonth)
									.map((mes) => (
										<SelectItem key={mes} value={mes}>
											{mes}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
				)}
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{data && selectedMonth && data[selectedMonth] ? (
					indicatorOrder.map((chave) => {
						const valor = data[selectedMonth][chave]
						return valor !== undefined ? (
							<IndicadorCard
								key={chave}
								chave={chave}
								valor={valor}
								titulo={getIndicatorName(chave)}
								modoComparacao={comparisonMode}
								mesComparacao={comparisonMonth}
								valorComparacao={data[comparisonMonth]?.[chave]}
								onClick={() => openIndicatorModal(chave)}
								getCorVariacao={getVariationColor}
								calcularVariacao={calculateVariation}
							/>
						) : null
					})
				) : (
					<div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
						<div className="rounded-full bg-muted p-4 mb-4">
							<BarChart3 className="h-6 w-6 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-medium mb-2">
							Dados insuficientes para gerar relatórios
						</h3>
						<p className="text-muted-foreground text-sm max-w-md">
							Não há dados suficientes para gerar os indicadores neste período.
						</p>
					</div>
				)}
			</div>

			{comparisonMode && data && selectedMonth && comparisonMonth && (
				<TabelaComparativa
					mesSelecionado={selectedMonth}
					mesComparacao={comparisonMonth}
					dados={data}
					getNomeIndicador={getIndicatorName}
					calcularVariacao={calculateVariation}
					getCorVariacao={getVariationColor}
					indicatorOrder={indicatorOrder}
				/>
			)}

			<GraficoModal
				aberto={isModalOpen}
				onOpenChange={setIsModalOpen}
				titulo={indicatorTitle}
				indicador={selectedIndicator}
				dados={prepareChartData(selectedIndicator)}
			/>
		</main>
	)
}
