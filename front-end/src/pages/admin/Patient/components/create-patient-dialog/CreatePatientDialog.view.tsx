import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { CreatePatientDialogViewProps } from './types'

export function CreatePatientDialogView({
	isOpen,
	setIsOpen,
	form,
	onSubmit,
	isLoading,
	error,
}: CreatePatientDialogViewProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Novo Paciente
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Criar Novo Paciente</DialogTitle>
				</DialogHeader>
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
							<p className="text-sm text-destructive">{errors.name.message}</p>
						)}
					</div>

					{!!error && (
						<div className="text-sm text-destructive">
							Erro ao criar paciente
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
							{isLoading ? 'Criando...' : 'Criar Paciente'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
