import { Card } from '@/components/ui/card'

interface PatientProfileCardProps {
	name: string
	birthDate: string
	recordCode: string
}
export const PatientProfileCard = ({
	birthDate,
	name,
	recordCode,
}: PatientProfileCardProps) => {
	return (
		<Card className="p-5">
			<h2 className="text-xl font-semibold mb-4">Informações do Paciente</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<p className="text-sm text-muted-foreground">Nome do Paciente</p>
					<p className="font-medium">{name}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Data de Nascimento</p>
					<p className="font-medium">{birthDate}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Código do Prontuário</p>
					<p className="font-medium">{recordCode}</p>
				</div>
			</div>
		</Card>
	)
}
