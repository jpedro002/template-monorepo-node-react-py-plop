import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button/button'
import { Trash2 } from 'lucide-react'
import { ReactNode } from 'react'

interface DeleteConfirmationDialogProps {
	title?: string
	description?: string
	onConfirm: () => void
	isLoading?: boolean
	trigger?: ReactNode
	itemName?: string
}

export function DeleteConfirmationDialog({
	title,
	description,
	onConfirm,
	isLoading = false,
	trigger,
	itemName = 'item',
}: DeleteConfirmationDialogProps) {
	const defaultTrigger = (
		<Button
			variant="ghost"
			size="sm"
			className="text-destructive hover:text-destructive"
		>
			<Trash2 className="h-4 w-4" />
		</Button>
	)

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{trigger || defaultTrigger}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title || `Excluir ${itemName}`}</AlertDialogTitle>
					<AlertDialogDescription>
						{description ||
							`Tem certeza que deseja excluir este ${itemName}? Esta ação não pode ser desfeita.`}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={isLoading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isLoading ? 'Excluindo...' : 'Excluir'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
