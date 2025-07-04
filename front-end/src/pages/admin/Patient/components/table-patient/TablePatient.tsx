import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog'
import { formateBirthDate } from '@/lib/ultil/format-date'
import { usePatientDelete } from '@/services/patient/usePatient'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { TablePatientProps } from './types'

export function TablePatient({ patients, onEdit }: TablePatientProps) {
	const deleteMutation = usePatientDelete()

	const handleDelete = (id: number) => {
		deleteMutation.mutate(id)
	}
	return (
		<div className="container mx-auto p-4 sm:p-6 md:p-8">
			<div className="rounded-lg border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead>Criado em</TableHead>
							<TableHead className="w-[70px]">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ patients.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center">
									Nenhum paciente encontrado.
								</TableCell>
							</TableRow>
						) : (
							patients.map((patient) => (
								<TableRow key={ patient.id}>
									<TableCell className="font-medium">{ patient.id}</TableCell>
									<TableCell>{ patient.name}</TableCell>
									<TableCell>
										{formateBirthDate(new Date(patient.createdAt))}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Abrir menu</span>
													<MoreVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() => onEdit(true, patient.id)}
													className="cursor-pointer"
												>
													<Edit className="mr-2 h-4 w-4" />
													Editar
												</DropdownMenuItem>
												<DeleteConfirmationDialog
													itemName="paciente"
													onConfirm={() => handleDelete(patient.id)}
													isLoading={deleteMutation.isPending}
													trigger={
														<DropdownMenuItem
															className="cursor-pointer text-destructive"
															onSelect={(e) => e.preventDefault()}
														>
															<Trash2 className="mr-2 h-4 w-4" />
															Excluir
														</DropdownMenuItem>
													}
												/>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
