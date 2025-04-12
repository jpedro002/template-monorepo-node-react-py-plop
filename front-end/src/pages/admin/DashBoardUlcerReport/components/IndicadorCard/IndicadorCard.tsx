import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { ArrowUpDown } from 'lucide-react'

interface IndicadorCardProps {
	chave: string
	valor: number
	titulo: string
	modoComparacao: boolean
	mesComparacao?: string
	valorComparacao?: number
	onClick?: () => void
	getCorVariacao: (variacao: number, metrica: string) => string
	calcularVariacao: (valorAtual: number, valorAnterior: number) => number
}

export const IndicadorCard = ({
	chave,
	valor,
	titulo,
	modoComparacao,
	mesComparacao,
	valorComparacao,
	onClick,
	getCorVariacao,
	calcularVariacao,
}: IndicadorCardProps) => {
	const ehPercentual = chave.includes('percent')

	return (
		<Card
			className={`${modoComparacao ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
			onClick={onClick}
		>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-sm font-medium">{titulo}</CardTitle>
				</div>
				<CardDescription>
					{ehPercentual ? 'Percentual' : 'Total'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{ehPercentual ? `${valor}%` : valor}
				</div>

				{modoComparacao && valorComparacao !== undefined && mesComparacao && (
					<div className="mt-2 flex items-center text-xs">
						<ArrowUpDown className="mr-1 h-4 w-4" />
						<span>Comparado a {mesComparacao}: </span>
						<span
							className={`ml-1 font-medium ${getCorVariacao(
								calcularVariacao(valor, valorComparacao),
								chave,
							)}`}
						>
							{calcularVariacao(valor, valorComparacao).toFixed(1)}%
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
