import {
	Question,
	QuestionHelp,
	QuestionType,
} from '@/pages/app/BedDetails/components/ModalDailyRegister/types'
import {
	IBed,
	IBedDetails,
	IPressureUlcerAssessment,
} from '@/services/beds/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BedsState {
	beds: IBed[]
	isLoading: boolean

	bedDetails: IBedDetails | null

	helpDialogMetaData: {
		open: boolean
		currentQuestionId: number | null
		questionsHelp: QuestionHelp[]
	}

	bedDetailsModal: {
		releaseBedOpen: boolean
		addPatientOpen: boolean
		dailyRecordOpen: boolean
	}

	formMetadata: {
		questions: Question[]
	}
}

const initialState: BedsState = {
	beds: [],
	isLoading: false,
	bedDetails: null,

	helpDialogMetaData: {
		open: false,
		currentQuestionId: null,
		questionsHelp: [
			{
				questionId: 1,
				title: 'Registro de Úlceras por Pressão',
				scaleItems: {
					10: 'PELE ÍNTEGRA, SECA, MOVIMENTA-SE FREQUENTEMENTE SEM AJUDA',
					9: 'PELE ÍNTEGRA, SECA, QUIETO NO LEITO',
					8: 'PELE ÍNTEGRA, SECA COM QUALQUER LIMITAÇÃO DO MOVIMENTO',
					7: 'PELE ÍNTEGRA, SECA, LIMITAÇÕES MOVIMENTOS, ALIMENTA-SE MAL',
					6: 'PELE ÍNTEGRA, ÚMIDA, DESNUTRIDO',
					5: 'HIPEREMIA, LESÕES SUPERFICIAIS OU BOLHAS',
					4: 'PERDA EPDÉRMICA OU DÉRMICA COM OU SEM NECROSE SEM ATINGIR PLANOS PROFUNDOS',
					3: 'LESÕES CAVITÁRIAS ATINGINDO PLANOS PROFUNDOS',
					2: 'INFECÇÃO DA ESCARA',
					1: 'LESÕES NÃO TRATADAS POR FALTA DE MATERIAL',
				},
			},
		],
	},

	bedDetailsModal: {
		releaseBedOpen: false,
		addPatientOpen: false,
		dailyRecordOpen: false,
	},

	formMetadata: {
		questions: [
			{
				id: 1,
				questionTitle: 'Registro de Úlceras por Pressão',
				type: QuestionType.RANGE,
				colorsIsInverted: false,
				minValue: 1,
				maxValue: 10,
				isRequired: true,
				formId: 2,
				scaleItems: {
					10: 'PELE ÍNTEGRA, SECA, MOVIMENTA-SE FREQUENTEMENTE SEM AJUDA',
					9: 'PELE ÍNTEGRA, SECA, QUIETO NO LEITO',
					8: 'PELE ÍNTEGRA, SECA COM QUALQUER LIMITAÇÃO DO MOVIMENTO',
					7: 'PELE ÍNTEGRA, SECA, LIMITAÇÕES MOVIMENTOS, ALIMENTA-SE MAL',
					6: 'PELE ÍNTEGRA, ÚMIDA, DESNUTRIDO',
					5: 'HIPEREMIA, LESÕES SUPERFICIAIS OU BOLHAS',
					4: 'PERDA EPDÉRMICA OU DÉRMICA COM OU SEM NECROSE SEM ATINGIR PLANOS PROFUNDOS',
					3: 'LESÕES CAVITÁRIAS ATINGINDO PLANOS PROFUNDOS',
					2: 'INFECÇÃO DA ESCARA',
					1: 'LESÕES NÃO TRATADAS POR FALTA DE MATERIAL',
				},
			},
		],
	},
}

const bedsSlice = createSlice({
	name: 'beds',
	initialState,
	reducers: {
		setLoadingState(state, action: PayloadAction<boolean>) {
			console.log('setLoadingState', action.payload)

			state.isLoading = action.payload
		},
		startBeds(state, action: PayloadAction<IBed[]>) {
			state.beds = action.payload
		},
		addBed(state, action: PayloadAction<IBed>) {
			state.beds.push(action.payload)
		},
		deleteBedFromStore(state, action: PayloadAction<number>) {
			state.beds = state.beds.filter((bed) => bed.id !== action.payload)
		},
		updateBed(state, action: PayloadAction<IBed>) {
			const index = state.beds.findIndex((bed) => bed.id === action.payload.id)
			if (index !== -1) {
				state.beds[index] = action.payload
			}
		},

		setBedDetails(state, action: PayloadAction<IBedDetails>) {
			console.log('setBedDet')
			state.bedDetails = action.payload
		},
		addPressureUlcer(state, action: PayloadAction<IPressureUlcerAssessment>) {
			if (state.bedDetails) {
				state.bedDetails.PressureUlcerAssessments.push(action.payload)
			}
		},

		clearBedDetails(state) {
			state.bedDetails = null
		},

		setReleaseBedOpen(state, action: PayloadAction<boolean>) {
			state.bedDetailsModal.releaseBedOpen = action.payload
		},
		setAddPatientOpen(state, action: PayloadAction<boolean>) {
			state.bedDetailsModal.addPatientOpen = action.payload
		},
		setDailyRecordOpen(state, action: PayloadAction<boolean>) {
			state.bedDetailsModal.dailyRecordOpen = action.payload
		},

		setHelpDialogOpen(state, action: PayloadAction<boolean>) {
			state.helpDialogMetaData.open = action.payload
		},
		setCurrentQuestionId(state, action: PayloadAction<number | null>) {
			state.helpDialogMetaData.currentQuestionId = action.payload
		},
	},
})

export const {
	setLoadingState,
	startBeds,
	addBed,
	deleteBedFromStore,
	updateBed,

	setBedDetails,
	clearBedDetails,
	addPressureUlcer,

	setReleaseBedOpen,
	setAddPatientOpen,
	setDailyRecordOpen,

	setHelpDialogOpen,
	setCurrentQuestionId,
} = bedsSlice.actions

export default bedsSlice.reducer
