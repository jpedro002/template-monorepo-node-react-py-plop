import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const scaleColors = [
	'border-red-600',
	'border-red-500',
	'border-orange-500',
	'border-yellow-500',
	'border-yellow-400',
	'border-green-400',
	'border-green-500',
	'border-green-600',
	'border-emerald-600',
	'border-emerald-700',
]

interface ScaleSelectorProps {
	label: string
	value: number | null
	onChange: (value: number) => void
	scaleDescription?: string
	hasError?: boolean
	errorMessage?: string
	reversed?: boolean
	hideLabel?: boolean
	minValue?: number
	maxValue?: number
	scaleItems?: Record<number, string>
}

export const ScaleSelector = ({
	label,
	value,
	onChange,
	scaleDescription,
	hasError,
	errorMessage = 'Campo obrigatório',
	reversed = false,
	hideLabel = false,
	minValue = 1,
	maxValue = 10,
	scaleItems,
}: ScaleSelectorProps) => {
	const colors = reversed ? [...scaleColors].reverse() : scaleColors

	const buttonsCount = maxValue - minValue + 1

	const buttonsColors = colors.slice(0, buttonsCount)

	return (
		<div className="mb-4 space-y-2">
			{!hideLabel && label && (
				<Label className="block text-lg font-semibold">{label}</Label>
			)}
			{!hideLabel && scaleDescription && (
				<p className="text-muted-foreground text-sm mb-2">{scaleDescription}</p>
			)}
			<div className="flex gap-2 flex-wrap">
				{scaleItems
					? Object.entries(scaleItems).map(([key, item]) => (
							<button
								key={key}
								type="button"
								onClick={() => onChange(Number(key))}
								data-selected={Number(key) === value}
								className={cn(
									`w-full h-auto py-2 rounded-lg text-black font-medium text-sm transition-colors
							data-[selected=true]:ring-2 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-primary
							border-2 hover:bg-opacity-75
							`,
									buttonsColors[Number(key) - minValue],
								)}
							>
								{item}
							</button>
						))
					: Array.from({ length: buttonsCount }).map((_, index) => {
							const buttonValue = minValue + index
							return (
								<button
									key={index}
									type="button"
									onClick={() => onChange(buttonValue)}
									data-selected={buttonValue === value}
									className={cn(
										`w-10 h-10 rounded-lg text-white font-bold transition-colors
                                        data-[selected=true]:ring-2 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-primary
                                        hover:bg-opacity-75
                                        `,
										`bg${buttonsColors[index].slice(6)}` || 'bg-gray-500',
									)}
								>
									{buttonValue}
								</button>
							)
						})}
			</div>
			{hasError && <p className="text-destructive text-sm">{errorMessage}</p>}
		</div>
	)
}
