import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { HelpDialogViewProps } from './types'

export const HelpDialogView = (props: HelpDialogViewProps) => {
	const { open, onOpenChange, title, sortedItems, footerNote } = props

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]" overlayColor="bg-transparent">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="space-y-2 text-sm">
					<ul className="space-y-1">
						{sortedItems.map(([key, value]) => (
							<li key={key}>
								<strong>{key}</strong> – {value}
							</li>
						))}
					</ul>
					{footerNote && (
						<p className="text-xs text-muted-foreground mt-2">{footerNote}</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
