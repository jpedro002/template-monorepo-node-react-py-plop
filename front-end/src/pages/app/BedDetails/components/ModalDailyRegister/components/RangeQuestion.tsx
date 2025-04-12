// import { Button } from '@/components/ui/button/button'
import { Label } from '@/components/ui/label'
// import { HelpCircleIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Question } from '../types'
import { ScaleSelector } from './ScaleSelector'

interface RangeQuestionProps {
	question: Question
	fieldName: string
	hasError: boolean
	onOpenHelp: () => void
}

export function RangeQuestion({
	question,
	fieldName,
	hasError,
}: RangeQuestionProps) {
	const { watch, setValue } = useFormContext()

	return (
		<div className="mb-4 space-y-2">
			<div className="flex items-center gap-2">
				<Label htmlFor={fieldName} className="block text-lg font-semibold">
					{question.questionTitle}
				</Label>

				{/* // TODO: HelpDialog
				<Button
					variant="ghost"
					size="icon"
					className="h-6 w-6 rounded-full p-0"
					onClick={onOpenHelp}
					type="button"
				>
					<HelpCircleIcon className="h-4 w-4 text-muted-foreground" />
					<span className="sr-only">Informações sobre a escala</span>
				</Button> */}
			</div>
			{!question.scaleItems && (
				<p className="text-muted-foreground text-sm mb-2">
					{question.minValue} = Condição crítica, {question.maxValue} = Condição
					excelente
				</p>
			)}
			<ScaleSelector
				label=""
				value={watch(fieldName)}
				onChange={(value) => setValue(fieldName, value)}
				hasError={hasError}
				hideLabel
				reversed={question.colorsIsInverted}
				minValue={question.minValue}
				maxValue={question.maxValue}
				scaleItems={question.scaleItems}
			/>
		</div>
	)
}
