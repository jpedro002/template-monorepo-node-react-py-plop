import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { Question } from '../types'

interface TextQuestionProps {
	question: Question
	fieldName: string
	hasError: boolean
}

export function TextQuestion({
	question,
	fieldName,
	hasError,
}: TextQuestionProps) {
	const { watch, setValue } = useFormContext()

	return (
		<div className="mb-4 space-y-2">
			<Label htmlFor={fieldName} className="block text-lg font-semibold">
				{question.questionTitle}
			</Label>
			<Input
				id={fieldName}
				value={watch(fieldName) || ''}
				onChange={(e) => setValue(fieldName, e.target.value)}
				placeholder={`Digite ${question.questionTitle.toLowerCase()}`}
			/>
			{hasError && (
				<p className="text-destructive text-sm">Este campo é obrigatório</p>
			)}
		</div>
	)
}
