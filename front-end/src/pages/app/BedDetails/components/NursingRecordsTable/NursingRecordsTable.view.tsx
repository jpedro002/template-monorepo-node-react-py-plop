import { Card } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { NursingRecordsTableItem } from './components/NursingRecordsTableItem'
import { NursingRecordsTableViewProps } from './types'

export const NursingRecordsTableView = (
	props: NursingRecordsTableViewProps,
) => {
	const { nursingRecords, formateBirthDate } = props

	return (
		<Card className="py-5 rounded-none md:p-5 md:rounded-lg ">
			<h2 className="text-xl font-semibold mb-4 px-4 md:px-0">
				Registros de Enfermagem
			</h2>
			<div className="overflow-x-auto">
				<Table className="min-w-[480px]">
					<TableHeader>
						<TableRow>
							<TableHead>Data</TableHead>
							<TableHead>Código</TableHead>
							<TableHead>Enfermeiro(a)</TableHead>
							<TableHead className="w-[80px]">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{nursingRecords.map((record) => (
							<NursingRecordsTableItem
								code={record.numericAnswer}
								date={formateBirthDate(record.createdAt)}
								id={record.id}
								key={record.id}
								nurse={record.nurseName}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</Card>
	)
}
