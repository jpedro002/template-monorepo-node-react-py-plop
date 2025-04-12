import { useModalDailyRegisterModelProps } from './types'

import { useAppSelector } from '@/store'
import {
	addPressureUlcer,
	setCurrentQuestionId,
	setDailyRecordOpen,
	setHelpDialogOpen,
} from '@/store/slices/bedsSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { z } from 'zod'
import { QuestionType } from './types'

export const useModalDailyRegisterModel = ({
	answersService,
}: useModalDailyRegisterModelProps) => {
	const dispatch = useDispatch()

	const open = useAppSelector(
		(state) => state.beds.bedDetailsModal.dailyRecordOpen,
	)

	const isHelpDialogOpen = useAppSelector(
		(state) => state.beds.helpDialogMetaData.open,
	)

	const formQuestions = useAppSelector(
		(state) => state.beds.formMetadata.questions,
	)

	const PATIENT_ID = useAppSelector(
		(state) => state.beds.bedDetails?.patient?.id,
	)

	const NURSE_ID = useAppSelector((state) => Number(state.auth.session?.id))

	const onOpenChange = (boolean: boolean) => {
		dispatch(setDailyRecordOpen(boolean))
	}

	const questions = useMemo(() => formQuestions, [])

	const formSchema = useMemo(() => {
		const schemaObj: Record<string, any> = {}

		questions.forEach((question) => {
			const fieldName = `question_${question.id}`

			if (question.type === QuestionType.RANGE) {
				const validator = z
					.number()
					.min(question.minValue || 1, 'Este campo é obrigatório')
					.max(question.maxValue || 10)

				schemaObj[fieldName] = question.isRequired
					? validator
					: validator.optional().nullable().optional()
			} else if (question.type === QuestionType.TEXT) {
				if (question.isRequired) {
					schemaObj[fieldName] = z
						.string()
						.min(1, 'Este campo é obrigatório')
						.transform((val) => val || null)
				} else {
					schemaObj[fieldName] = z
						.string()
						.nullable()
						.optional()
						.transform((val) => val ?? null)
				}
			}
		})

		return z.object(schemaObj)
	}, [questions])

	type FormSchema = z.infer<typeof formSchema>

	const defaultValues = useMemo(() => {
		const values: Record<string, any> = {}

		questions.forEach((question) => {
			const fieldName = `question_${question.id}`
			values[fieldName] = question.type === QuestionType.RANGE ? null : ''
		})

		return values
	}, [questions])

	const formMethods = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const onSubmit = async (data: FormSchema) => {
		if (!NURSE_ID || !PATIENT_ID) {
			return toast.error('Erro ao enviar respostas')
		}

		const formattedData = questions.map((question) => {
			const fieldName = `question_${question.id}`
			return {
				type: question.type,
				questionId: question.id,
				textAnswer:
					question.type === QuestionType.TEXT ? data[fieldName] : null,
				numericAnswer:
					question.type === QuestionType.RANGE ? data[fieldName] : null,
				patientProfileId: PATIENT_ID,
				userId: NURSE_ID,
			}
		})

		console.log(formattedData)

		try {
			const response = await answersService.create({
				answers: formattedData,
				answerToReturn: 1,
			})

			dispatch(addPressureUlcer(response))
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao enviar respostas')
			}
		}

		onOpenChange(false)

		formMethods.reset()
	}

	return {
		questions,
		formMethods,
		handleSubmit: formMethods.handleSubmit(onSubmit),
		open,
		onOpenChange,
		isHelpDialogOpen,
		setHelpDialogOpen: (boolean: boolean) => {
			dispatch(setHelpDialogOpen(boolean))
		},
		setCurrentQuestionId: (id: number | null) => {
			dispatch(setCurrentQuestionId(id))
		},
	}
}
