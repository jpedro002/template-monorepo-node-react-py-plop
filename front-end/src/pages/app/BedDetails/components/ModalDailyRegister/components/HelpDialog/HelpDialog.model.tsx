import { useAppSelector } from '@/store'
import { setHelpDialogOpen } from '@/store/slices/bedsSlice'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { QuestionHelp } from '../../types'

export const useHelpDialogModel = () => {
	const dispatch = useDispatch()

	const currentQuestionId = useAppSelector(
		(state) => state.beds.helpDialogMetaData.currentQuestionId,
	)
	const currentQuestion = useAppSelector(
		(state) =>
			state.beds.helpDialogMetaData.questionsHelp.find(
				(questionHelp) => questionHelp.questionId === currentQuestionId,
			) ||
			({
				questionId: 0,
				title: '',
				scaleItems: [],
			} as QuestionHelp),
	)

	const open = useAppSelector((state) => state.beds.helpDialogMetaData.open)

	const onOpenChange = (v: boolean) => {
		dispatch(setHelpDialogOpen(v))
	}

	const sortedItems = useMemo(() => {
		return Object.entries(currentQuestion.scaleItems)
			.map(([key, value]) => [Number(key), value])
			.sort((a, b) => (b[0] as number) - (a[0] as number))
	}, [currentQuestion.scaleItems])

	return {
		open,
		onOpenChange,
		title: currentQuestion.title,
		sortedItems,
		footerNote: currentQuestion.footerNote,
	}
}
