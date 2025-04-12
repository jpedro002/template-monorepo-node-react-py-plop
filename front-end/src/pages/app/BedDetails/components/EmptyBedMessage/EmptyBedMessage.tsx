import { Card } from '@/components/ui/card'
import { BedIcon } from 'lucide-react'

export const EmptyBedMessage = () => {
	return (
		<Card className="p-5 border-dashed">
			<div className="flex flex-col items-center justify-center py-8 text-center">
				<BedIcon className="h-16 w-16 text-muted-foreground mb-4" />
				<h2 className="text-xl font-semibold mb-2">Leito Vazio</h2>
				<p className="text-muted-foreground max-w-md">
					Este leito está atualmente vazio. Utilize o botão "Adicionar Paciente"
					para registrar um novo paciente.
				</p>
			</div>
		</Card>
	)
}
