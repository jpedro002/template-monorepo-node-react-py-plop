import { usersKeys } from '@/services/appUsers/queryKeys'
import { ROLES_ARRAY } from '@/services/session/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateUserSchema } from '../CreateAccountModal/CreateAccountModal.schema'
import { useFilterUsers } from '../FilterUsers/FilterUsers.model'
import {
	IUpdateUserSchema,
	IUseUpdateAccountModal,
} from './UpdateAccountModal.types'

export const useUpdateAccountModal = ({
	usersService,
	defaultValues,
	userID,
}: IUseUpdateAccountModal) => {
	const [isOpen, setIsOpen] = useState(false)
	const queryClient = useQueryClient()
	const { filters } = useFilterUsers()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<IUpdateUserSchema>({
		resolver: zodResolver(updateUserSchema),
		defaultValues,
	})

	const updateUserMutation = useMutation({
		mutationFn: (data: IUpdateUserSchema) => {
			return usersService.update(userID, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: usersKeys.users.list(filters),
			})

			toast.success('Usuário atualizado com sucesso')
			setIsOpen(false)
		},
		onError: (error) => {
			console.error(error)
			if (isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao atualizar usuário')
			}
		},
	})

	const resetPasswordMutation = useMutation({
		mutationFn: () => {
			return usersService.resetPassword(userID)
		},
		onSuccess: () => {
			toast.success('Senha resetada com sucesso')
			setIsOpen(false)
		},
		onError: (error) => {
			console.error(error)
			if (isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao resetar senha')
			}
		},
	})

	const onSubmit = (data: IUpdateUserSchema) => {
		updateUserMutation.mutate(data)
	}

	const onResetPassword = () => {
		resetPasswordMutation.mutate()
	}

	return {
		isOpen,
		setIsOpen,
		loading: updateUserMutation.isPending || resetPasswordMutation.isPending,
		register,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
		ROLES: ROLES_ARRAY,
		onResetPassword,
	}
}
