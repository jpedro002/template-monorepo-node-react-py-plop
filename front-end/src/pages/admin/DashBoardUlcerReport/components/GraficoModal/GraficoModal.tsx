import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	CartesianGrid,
	Line,
	LineChart,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import { ChartDataItem } from '../../types'

interface GraficoModalProps {
	aberto: boolean
	onOpenChange: (value: boolean) => void
	titulo: string
	indicador: string
	dados: ChartDataItem[]
}

export const GraficoModal = ({
	aberto,
	onOpenChange,
	titulo,
	indicador,
	dados,
}: GraficoModalProps) => {
	return (
		<Dialog open={aberto} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Tendência: {titulo}</DialogTitle>
					<DialogDescription>
						Evolução do indicador nos últimos meses
					</DialogDescription>
				</DialogHeader>
				<div className="h-[400px] w-full mt-4">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={dados}
							margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
							<YAxis
								domain={['auto', 'auto']}
								padding={{ top: 20, bottom: 20 }}
								tickFormatter={(value) =>
									indicador?.includes('percent') ? `${value}%` : value
								}
							/>
							<RechartsTooltip
								formatter={(value: any) => [
									indicador?.includes('percent') ? `${value}%` : value,
									'Valor',
								]}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								dot={{ r: 6 }}
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className="flex justify-end mt-4">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Fechar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
