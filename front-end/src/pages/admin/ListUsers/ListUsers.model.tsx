import { useAppTitle } from '@/hooks/useAppTitle'
import { usersKeys } from '@/services/appUsers/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { IUseListUsers } from './ListUsers.types'
import { useFilterUsers } from './components/FilterUsers/FilterUsers.model'

export const useListUsers = ({ usersService }: IUseListUsers) => {
	useAppTitle({ title: 'Usuários' })
	const { filters } = useFilterUsers()

	const {
		data: appUsers = [],
		isLoading: loading,
		error,
	} = useQuery({
		queryKey: usersKeys.users.list(filters),
		queryFn: () => usersService.list(filters),
		staleTime: 1000 * 60 * 5, // 5 minutes
		retry: 1,
	})

	useEffect(() => {
		if (isAxiosError(error)) {
			console.error('Erro ao obter os usuários:', error)
			toast.error(error.response?.data.message || 'Erro ao obter os usuários')
		}
	}, [])

	return {
		appUsers,
		loading,
	}
}
