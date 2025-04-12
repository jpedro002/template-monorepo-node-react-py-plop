import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModalAddPatientToBedViewProps } from './types'

export const ModalAddPatientToBedView = (
	props: ModalAddPatientToBedViewProps,
) => {
	const { open, onOpenChange, onSubmit, register, handleSubmit, errors } = props

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Adicionar Paciente</DialogTitle>
					<DialogDescription>
						Preencha os dados do paciente para adicionar ao leito.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="nome">Nome do Paciente</Label>
						<Input
							id="nome"
							placeholder="Nome completo"
							{...register('nome', { required: 'Nome é obrigatório' })}
						/>
						{errors.nome?.message && (
							<span className="text-red-500">
								{errors.nome.message?.toString()}
							</span>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="dataNascimento">Data de Nascimento</Label>
						<Input
							id="dataNascimento"
							type="date"
							{...register('dataNascimento', {
								required: 'Data de nascimento é obrigatória',
							})}
						/>
						{errors.dataNascimento && (
							<span className="text-red-500">
								{errors.dataNascimento.message?.toString()}
							</span>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="codigoProntuario">Código do Prontuário</Label>
						<Input
							id="codigoProntuario"
							placeholder="Ex: PRO-12345"
							{...register('codigoProntuario', {
								required: 'Código do prontuário é obrigatório',
							})}
						/>
						{errors.codigoProntuario && (
							<span className="text-red-500">
								{errors.codigoProntuario.message?.toString()}
							</span>
						)}
					</div>
					<DialogFooter>
						<Button type="submit">Adicionar Paciente</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
