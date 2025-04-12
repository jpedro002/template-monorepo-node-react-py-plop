import { Card } from '@/components/ui/card'
import { ReactNode } from 'react'

interface ActionButtonProps {
	icon: ReactNode
	title: string
	onClick: () => void
	disabled?: boolean
}

export function ActionButton({
	icon,
	title,
	onClick,
	disabled = false,
}: ActionButtonProps) {
	return (
		<Card
			className={`p-4 flex items-center gap-3 ${
				disabled
					? 'bg-muted cursor-not-allowed opacity-70'
					: 'hover:bg-accent transition-colors cursor-pointer'
			}`}
			onClick={disabled ? undefined : onClick}
		>
			<div
				className={`p-3 rounded-full ${
					disabled
						? 'bg-muted-foreground/20 text-muted-foreground'
						: 'bg-primary/10 text-primary'
				}`}
			>
				{icon}
			</div>
			<span
				className={`font-medium ${disabled ? 'text-muted-foreground' : ''}`}
			>
				{title}
			</span>
		</Card>
	)
}
