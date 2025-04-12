import { useAppSelector } from '@/store'
import { clearBedDetails, setReleaseBedOpen } from '@/store/slices/bedsSlice'
import { useDispatch } from 'react-redux'
import { useModalRemovePatientFromBedModelProps } from './types'

export const useModalRemovePatientFromBedModel = ({
	bedsService,
}: useModalRemovePatientFromBedModelProps) => {
	const dispatch = useDispatch()
	const liberarLeitoOpen = useAppSelector(
		(state) => state.beds.bedDetailsModal.releaseBedOpen,
	)
	const currentBedId = useAppSelector((state) => state.beds.bedDetails?.id)

	const onOpenChange = (isOpen: boolean) => {
		dispatch(setReleaseBedOpen(isOpen))
	}

	const onConfirm = async () => {
		try {
			if (!currentBedId) {
				console.error('ID do leito não encontrado')
				return
			}

			await bedsService.removePatientFromBed(currentBedId)
			dispatch(setReleaseBedOpen(false))
			dispatch(clearBedDetails())
		} catch (error) {
			console.error('Erro ao remover paciente do leito:', error)
		}
	}

	return {
		open: liberarLeitoOpen,
		onOpenChange,
		onConfirm,
	}
}
