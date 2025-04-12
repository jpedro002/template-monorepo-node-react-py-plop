import { Button } from '@/components/ui/button/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { PencilIcon } from 'lucide-react'

interface NursingRecordsTableItemProps {
	date: string
	code: number
	nurse: string
	id: number
}
export const NursingRecordsTableItem = ({
	code,
	date,
	id,
	nurse,
}: NursingRecordsTableItemProps) => {
	return (
		<TableRow key={id}>
			<TableCell>{date}</TableCell>
			<TableCell>{code}</TableCell>
			<TableCell>{nurse}</TableCell>
			<TableCell>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<PencilIcon className="h-4 w-4" />
					<span className="sr-only">Editar registro</span>
				</Button>
			</TableCell>
		</TableRow>
	)
}
