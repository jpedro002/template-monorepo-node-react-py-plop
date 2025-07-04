import { SpinnerLoading } from '@/components/SpinnerLoading'
import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UpdatePatientDialogViewProps } from './types'

export function UpdatePatientDialogView({
	isOpen,
	setIsOpen,
	form,
	onSubmit,
	isLoading,
	isLoadingPatient,
	error,
}: UpdatePatientDialogViewProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar Paciente</DialogTitle>
				</DialogHeader>
				{isLoadingPatient ? (
					<div className="flex justify-center p-4">
						<SpinnerLoading />
					</div>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nome</Label>
							<Input
								id="name"
								placeholder="Digite o nome do paciente"
								{...register('name', {
									required: 'Nome é obrigatório',
									minLength: {
										value: 3,
										message: 'Nome deve ter pelo menos 3 caracteres',
									},
									maxLength: {
										value: 90,
										message: 'Nome deve ter no máximo 90 caracteres',
									},
								})}
							/>
							{errors.name && (
								<p className="text-sm text-destructive">
									{errors.name.message}
								</p>
							)}
						</div>

						{!!error && (
							<div className="text-sm text-destructive">
								Erro ao atualizar paciente
							</div>
						)}

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsOpen(false)}
							>
								Cancelar
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? 'Atualizando...' : 'Atualizar Paciente'}
							</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	)
}
