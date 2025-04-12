import { useFormContext } from 'react-hook-form'
import { Question, QuestionType } from '../types'
import { RangeQuestion } from './RangeQuestion'
import { TextQuestion } from './TextQuestion'

interface QuestionFieldProps {
	question: Question
	onOpenHelp: () => void
}

export function QuestionField({ question, onOpenHelp }: QuestionFieldProps) {
	const { formState } = useFormContext()
	const fieldName = `question_${question.id}`
	const hasError = !!formState.errors[fieldName]

	switch (question.type) {
		case QuestionType.RANGE:
			return (
				<RangeQuestion
					question={question}
					fieldName={fieldName}
					hasError={hasError}
					onOpenHelp={onOpenHelp}
				/>
			)
		case QuestionType.TEXT:
			return (
				<TextQuestion
					question={question}
					fieldName={fieldName}
					hasError={hasError}
				/>
			)
		default:
			return null
	}
}
