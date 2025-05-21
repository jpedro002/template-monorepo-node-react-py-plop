import { usersKeys } from '@/services/appUsers/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useFilterUsers } from '../FilterUsers/FilterUsers.model'
import { IUseDeleteAccountAlert } from './DeleteAccountAlert.types'

export const useDeleteAccountAlert = ({
	userID,
	usersService,
}: IUseDeleteAccountAlert) => {
	const queryClient = useQueryClient()
	const { filters } = useFilterUsers()

	const deleteUserMutation = useMutation({
		mutationFn: () => {
			return usersService.delete(userID)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: usersKeys.users.list(filters),
			})

			toast.success('Usuário excluído com sucesso')
		},
		onError: (error) => {
			console.error(error)
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao excluir usuário')
			}
		},
	})

	const handleDeleteUser = () => {
		deleteUserMutation.mutate()
	}

	return {
		handleDeleteUser,
		isDeleting: deleteUserMutation.isPending,
	}
}
