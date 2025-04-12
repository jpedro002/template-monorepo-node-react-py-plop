import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

interface IFilterBedsSchema {
	bedName: string
	patientRecord: string
	checkStatus: string
	occupancyStatus: string
}

export const useFilterBeds = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [isCheckStatusOpen, setIsCheckStatusOpen] = useState(false)
	const [isOccupancyStatusOpen, setIsOccupancyStatusOpen] = useState(false)

	const isAnySelectOpen = isCheckStatusOpen || isOccupancyStatusOpen

	const bedName = searchParams.get('bedName')
	const patientRecord = searchParams.get('patientRecord')
	const checkStatus = searchParams.get('checkStatus')
	const occupancyStatus = searchParams.get('occupancyStatus')

	const { register, handleSubmit, reset, control } = useForm<IFilterBedsSchema>(
		{
			defaultValues: {
				bedName: bedName ?? '',
				patientRecord: patientRecord ?? '',
				checkStatus: checkStatus ?? 'all',
				occupancyStatus: occupancyStatus ?? 'all',
			},
		},
	)

	function handleFilter(data: IFilterBedsSchema) {
		setSearchParams((state) => {
			if (data.bedName) {
				state.set('bedName', data.bedName.trim())
			} else {
				state.delete('bedName')
			}

			if (data.patientRecord) {
				state.set('patientRecord', data.patientRecord.trim())
			} else {
				state.delete('patientRecord')
			}

			if (data.checkStatus) {
				state.set('checkStatus', data.checkStatus.trim())
			} else {
				state.delete('checkStatus')
			}

			if (data.occupancyStatus) {
				state.set('occupancyStatus', data.occupancyStatus.trim())
			} else {
				state.delete('occupancyStatus')
			}

			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete('bedName')
			state.delete('patientRecord')
			state.delete('checkStatus')
			state.delete('occupancyStatus')

			return state
		})

		reset({
			bedName: '',
			patientRecord: '',
			checkStatus: 'all',
			occupancyStatus: 'all',
		})
	}

	return {
		register,
		handleSubmit,
		handleFilter,
		handleClearFilters,
		control,
		isAnySelectOpen,
		setIsCheckStatusOpen,
		setIsOccupancyStatusOpen,
	}
}
