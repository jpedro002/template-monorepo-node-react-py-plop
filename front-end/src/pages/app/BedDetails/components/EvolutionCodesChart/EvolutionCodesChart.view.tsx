import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EvolutionCodesChartViewProps } from './types'

export const EvolutionCodesChartView = (
	props: EvolutionCodesChartViewProps,
) => {
	const { chartData } = props

	return (
		<Card className="p-5">
			<CardHeader>
				<CardTitle>Evolução dos Códigos</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<div className="w-full h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={chartData}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis domain={[0, 10]} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="code"
								stroke="#3b82f6"
								activeDot={{ r: 8 }}
								name="Código (1-10)"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
