import { MonthlyData } from '@/pages/admin/DashBoardUlcerReport/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DashboardState {
	data: MonthlyData
	selectedMonth: string
	comparisonMode: boolean
	comparisonMonth: string
	isModalOpen: boolean
	selectedIndicator: string
	indicatorTitle: string
	loading: boolean
}

const initialState: DashboardState = {
	data: {},
	selectedMonth: '',
	comparisonMode: false,
	comparisonMonth: '',
	isModalOpen: false,
	selectedIndicator: '',
	indicatorTitle: '',
	loading: false,
}

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<MonthlyData>) => {
			state.data = action.payload
		},
		setSelectedMonth: (state, action: PayloadAction<string>) => {
			state.selectedMonth = action.payload
		},
		setComparisonMode: (state, action: PayloadAction<boolean>) => {
			state.comparisonMode = action.payload
		},
		setComparisonMonth: (state, action: PayloadAction<string>) => {
			state.comparisonMonth = action.payload
		},
		setIsModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isModalOpen = action.payload
		},
		setSelectedIndicator: (state, action: PayloadAction<string>) => {
			state.selectedIndicator = action.payload
		},
		setIndicatorTitle: (state, action: PayloadAction<string>) => {
			state.indicatorTitle = action.payload
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
	},
})

export const {
	setData,
	setSelectedMonth,
	setComparisonMode,
	setComparisonMonth,
	setIsModalOpen,
	setSelectedIndicator,
	setIndicatorTitle,
	setLoading,
} = dashboardSlice.actions

export default dashboardSlice.reducer
