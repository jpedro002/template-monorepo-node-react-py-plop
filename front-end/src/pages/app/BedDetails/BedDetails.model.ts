import { useAppTitle } from '@/hooks/useAppTitle'
import { formateBirthDate } from '@/lib/ultil/format-date'
import { RootState } from '@/store'
import {
	setAddPatientOpen,
	setBedDetails,
	setDailyRecordOpen,
	setLoadingState,
	setReleaseBedOpen,
} from '@/store/slices/bedsSlice'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useBedDetailsModelProps } from './components/NursingRecordsTable/types'

export const useBedDetailsModel = ({
	bedsService,
}: useBedDetailsModelProps) => {
	const isLoading = useSelector((state: RootState) => state.beds.isLoading)
	const bedDetails = useSelector((state: RootState) => state.beds.bedDetails)
	const { id: bedId } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const hasPatient = searchParams.get('hasPatient') === 'true'
	const checkedToday = searchParams.get('checkedToday') === 'true'
	useAppTitle({
		title: `Detalhes do Leito ${bedDetails?.patient?.medical_record_code || ''} `,
	})

	const dispatch = useDispatch()

	const liberarLeitoOpen = useSelector(
		(state: RootState) => state.beds.bedDetailsModal.releaseBedOpen,
	)
	const adicionarPacienteOpen = useSelector(
		(state: RootState) => state.beds.bedDetailsModal.addPatientOpen,
	)
	const registroDiaOpen = useSelector(
		(state: RootState) => state.beds.bedDetailsModal.dailyRecordOpen,
	)

	useEffect(() => {
		const loadBedDetails = async () => {
			if (hasPatient) {
				dispatch(setLoadingState(true))
			}

			window.scrollTo(0, 0)

			try {
				if (!bedId) {
					throw new Error('Bed ID not found')
				}
				if (hasPatient) {
					const details = await bedsService.getBedDetails(Number(bedId))
					return dispatch(setBedDetails(details))
				}
			} catch (error) {
				if (isAxiosError(error)) {
					error.status === 404 && toast.error('Leito não encontrado')
					navigate('/')
				} else {
					toast.error('Erro ao carregar detalhes do leito')
				}
			} finally {
				dispatch(setLoadingState(false))
			}
		}

		loadBedDetails()

		return () => {
			dispatch(
				setBedDetails({
					id: Number(bedId),
					patient: null,
					patientProfileId: null,
					PressureUlcerAssessments: [],
				}),
			)
		}
	}, [])

	return {
		liberarLeitoOpen,
		adicionarPacienteOpen,
		registroDiaOpen,

		setLiberarLeitoOpen: (value: boolean) => dispatch(setReleaseBedOpen(value)),
		setAdicionarPacienteOpen: (value: boolean) =>
			dispatch(setAddPatientOpen(value)),
		setRegistroDiaOpen: (value: boolean) => dispatch(setDailyRecordOpen(value)),
		formateBirthDate,

		bedDetails,
		isLoading,
		hasPatient,
		checkedToday,
	}
}
