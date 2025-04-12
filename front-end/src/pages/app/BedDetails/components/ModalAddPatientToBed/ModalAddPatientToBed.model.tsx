import { useAppSelector } from '@/store'
import { setAddPatientOpen, setBedDetails } from '@/store/slices/bedsSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addPatientSchema } from './schemas'
import { AddPatientSchema, useModalAddPatientToBedProps } from './types'

export const useModalAddPatientToBedModel = ({
	bedsService,
}: useModalAddPatientToBedProps) => {
	const dispatch = useDispatch()
	const adicionarPacienteOpen = useAppSelector(
		(state) => state.beds.bedDetailsModal.addPatientOpen,
	)
	const { id } = useParams<{ id: string }>()

	const onOpenChange = (isOpen: boolean) => {
		dispatch(setAddPatientOpen(isOpen))
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddPatientSchema>({
		resolver: zodResolver(addPatientSchema),
		defaultValues: {
			nome: '',
			dataNascimento: '',
			codigoProntuario: '',
		},
	})

	const onSubmit = async (data: AddPatientSchema) => {
		try {
			if (!Number(id)) {
				throw new Error('Bed ID not found')
			}

			await bedsService.addPatientToBed(Number(id), {
				patient: {
					dateOfBirth: data.dataNascimento,
					medical_record_code: data.codigoProntuario,
					name: data.nome,
				},
			})

			const details = await bedsService.getBedDetails(Number(id))
			dispatch(setBedDetails(details))

			dispatch(setAddPatientOpen(false))

			reset()
		} catch (error) {
			console.error('Failed to add patient to bed:', error)
		}
	}

	return {
		open: adicionarPacienteOpen,
		onOpenChange,
		onSubmit,
		register,
		handleSubmit,
		errors,
	}
}
