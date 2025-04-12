import { useAppTitle } from '@/hooks/useAppTitle'
import { useAppDispatch, useAppSelector } from '@/store'
import { setLoadingState, startBeds } from '@/store/slices/bedsSlice'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useListBedsProps } from './types'

export const useListBeds = ({ bedsService }: useListBedsProps) => {
	useAppTitle({ title: 'Listagem de Leitos' })

	const [searchParams] = useSearchParams()

	const bedName = searchParams.get('bedName')
	const patientRecord = searchParams.get('patientRecord')
	const checkStatus = searchParams.get('checkStatus')
	const occupancyStatus = searchParams.get('occupancyStatus')

	const beds = useAppSelector((state) => state.beds.beds)
	const isLoading = useAppSelector((state) => state.beds.isLoading)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fetchBeds = async () => {
			dispatch(setLoadingState(true))
			try {
				const { beds } = await bedsService.list({
					bedName: bedName || '',
					patientRecord: patientRecord || '',
					checkStatus: checkStatus === 'all' ? undefined : checkStatus || '',
					occupancyStatus:
						occupancyStatus === 'all' ? undefined : occupancyStatus || '',
				})

				dispatch(startBeds(beds))
			} catch (error) {
				console.error('Erro ao obter os leitos:', error)
				if (isAxiosError(error)) {
					toast.error(error.response?.data.message || 'Erro ao obter os leitos')
				}
			} finally {
				dispatch(setLoadingState(false))
			}
		}

		fetchBeds()
	}, [bedName, patientRecord, checkStatus, occupancyStatus])

	return {
		beds,
		isLoading,
	}
}
