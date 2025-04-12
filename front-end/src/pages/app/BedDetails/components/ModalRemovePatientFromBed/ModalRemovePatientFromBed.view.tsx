import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangleIcon } from 'lucide-react'
import { ModalRemovePatientFromBedViewProps } from './types'

export const ModalRemovePatientFromBedView = (
	props: ModalRemovePatientFromBedViewProps,
) => {
	const { open, onOpenChange, onConfirm } = props

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
						<AlertTriangleIcon className="h-8 w-8 text-yellow-600" />
					</div>
					<DialogTitle className="text-center text-xl pt-4">
						Liberar Leito
					</DialogTitle>
					<DialogDescription className="text-center pt-2">
						Tem certeza que deseja liberar este leito? Esta ação não pode ser
						desfeita.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-row gap-2 sm:justify-center">
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button
						variant="destructive"
						onClick={async () => {
							await onConfirm()
							onOpenChange(false)
						}}
					>
						Liberar Leito
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
