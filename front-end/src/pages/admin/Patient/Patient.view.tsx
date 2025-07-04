import { Pagination } from '@/components/Pagination'
import { CreatePatientDialog } from './components/create-patient-dialog'
import { Filter } from './components/filter'
import { TablePatient } from './components/table-patient'
import { UpdatePatientDialog } from './components/update-patient-dialog'
import { PatientViewProps } from './types'

export function PatientView(props: PatientViewProps) {
	const { data, onEdit } = props

	return (
		<main className="flex-1 max-w-full w-full overflow-hidden">
			<div className="container mx-auto p-4 space-y-6 sm:p-6 md:p-8">
				<div className="space-y-4 mb-6">
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
						<div>
							<h2 className="text-xl sm:text-2xl font-bold tracking-tight">
								Gerenciar Pacientes
							</h2>
							<p className="text-sm sm:text-base text-muted-foreground">
								Gerencie todos os pacientes do sistema
							</p>
						</div>

						<CreatePatientDialog />
					</div>
				</div>
				<Filter />
			</div>

			<TablePatient onEdit={onEdit} patients={data.data} />

			<div className="container mx-auto p-4 sm:p-6 md:p-8">
				<UpdatePatientDialog />
				<Pagination
					page={data.pagination.page}
					rowCount={data.pagination.rowCount}
					pageCount={data.pagination.pageCount}
					pageSize={data.pagination.pageSize}
				/>
			</div>
		</main>
	)
}
