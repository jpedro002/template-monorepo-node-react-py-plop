import { IAnswersService } from '@/services/answers'
import { useModalDailyRegisterModel } from './ModalDailyRegister.model'

export enum QuestionType {
	RANGE = 'RANGE',
	TEXT = 'TEXT',
}

export interface Question {
	id: number
	questionTitle: string
	type: QuestionType
	colorsIsInverted?: boolean
	minValue?: number
	maxValue?: number
	isRequired: boolean
	formId: number
	scaleItems?: Record<number, string>
}

export interface QuestionHelp {
	questionId: number
	scaleItems: Record<number, string>
	title: string
	footerNote?: string
}

export interface FormAnswer {
	type: QuestionType
	questionId: number
	textAnswer: string | null
	numericAnswer: number | null
	patientProfileId: number
	userId: number
}

export interface ModalDailyRegisterProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSubmit: (data: FormAnswer[]) => void
}

export interface useModalDailyRegisterModelProps {
	answersService: IAnswersService
}

export type ModalDailyRegisterViewProps = ReturnType<
	typeof useModalDailyRegisterModel
>
