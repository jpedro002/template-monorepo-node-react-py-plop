interface TabelaComparativaProps {
	mesSelecionado: string
	mesComparacao: string
	dados: any
	getNomeIndicador: (chave: string) => string
	calcularVariacao: (valorAtual: number, valorAnterior: number) => number
	getCorVariacao: (variacao: number, metrica: string) => string
	indicatorOrder: string[]
}

export const TabelaComparativa = ({
	mesSelecionado,
	mesComparacao,
	dados,
	getNomeIndicador,
	calcularVariacao,
	getCorVariacao,
	indicatorOrder,
}: TabelaComparativaProps) => {
	return (
		<div className="mt-8">
			<h3 className="text-lg font-semibold mb-4">Comparação Detalhada</h3>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr>
							<th className="border p-2 text-left">Indicador</th>
							<th className="border p-2 text-center">{mesSelecionado}</th>
							<th className="border p-2 text-center">{mesComparacao}</th>
							<th className="border p-2 text-center">Variação</th>
						</tr>
					</thead>
					<tbody>
						{indicatorOrder.map((chave) => {
							const valor = dados[mesSelecionado][chave]
							const valorComparacao = dados[mesComparacao][chave]

							return valor !== undefined && valorComparacao !== undefined ? (
								<tr key={chave}>
									<td className="border p-2">{getNomeIndicador(chave)}</td>
									<td className="border p-2 text-center">
										{chave.includes('percent') ? `${valor}%` : valor}
									</td>
									<td className="border p-2 text-center">
										{chave.includes('percent')
											? `${valorComparacao}%`
											: valorComparacao}
									</td>
									<td
										className={`border p-2 text-center ${getCorVariacao(
											calcularVariacao(valor, valorComparacao),
											chave,
										)}`}
									>
										{calcularVariacao(valor, valorComparacao).toFixed(1)}%
									</td>
								</tr>
							) : null
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
