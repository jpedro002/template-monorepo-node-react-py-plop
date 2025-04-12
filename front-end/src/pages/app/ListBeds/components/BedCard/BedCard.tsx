import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { IBedCardProps } from './types'

export const BedCard = (props: IBedCardProps) => {
	const { checkedToday, id, available, medicalRecordId, patientName, name } =
		props

	return (
		<>
			<Link
				to={`/beds/${id}?hasPatient=${!!medicalRecordId}&checkedToday=${checkedToday}`}
			>
				<div key={id} className="group cursor-pointer">
					<Card className="overflow-hidden transition-shadow hover:shadow-md h-[200px]">
						<CardContent className="p-0 h-full flex flex-col">
							<div className="flex items-center justify-between border-b p-4">
								<h2 className="text-lg font-medium">
									{name ? name : `Leito ${id}`}
								</h2>
								{available ? (
									<Badge variant={checkedToday ? 'success' : 'destructive'}>
										{checkedToday ? 'Checado' : 'Pendente'}
									</Badge>
								) : (
									<Badge variant="secondary">Não Aplicável</Badge>
								)}
							</div>
							<div className="p-4 flex-1 flex flex-col">
								<div className="flex-1 h-full">
									{available ? (
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="font-medium">
													Prontuário: {medicalRecordId}
												</span>
												<Badge
													variant="outline"
													className="bg-red-50 text-red-700 border-red-200"
												>
													Ocupado
												</Badge>
											</div>
											<div className="text-sm text-muted-foreground">
												Paciente:{' '}
												<span className="font-medium text-foreground">
													{patientName}
												</span>
											</div>
										</div>
									) : (
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<span className="font-medium">Sem paciente</span>
												<Badge
													variant="outline"
													className="bg-green-50 text-green-700 border-green-200"
												>
													Disponível
												</Badge>
											</div>
											{/* <div className="text-sm text-muted-foreground h-[21px]" /> */}
										</div>
									)}
								</div>

								<div className="mt-auto flex items-center justify-between border-t pt-4">
									<span className="text-sm text-muted-foreground">
										Ver detalhes do leito
									</span>
									<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-chevron-right"
										>
											<path d="m9 18 6-6-6-6" />
										</svg>
										<span className="sr-only">Ver detalhes</span>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Link>
		</>
	)
}
