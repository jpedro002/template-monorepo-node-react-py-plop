import { SessionServices } from '@/services/session'
import { IAuthRequest, ISession } from '@/services/session/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
	const queryClient = useQueryClient()
	const token = localStorage.getItem('token')

	const {
		data: session = null,
		isLoading,
		refetch,
		isRefetching,
		isPending,
	} = useQuery<ISession>({
		queryKey: ['session'],
		refetchOnMount: false,
		queryFn: () => SessionServices.show(),
		retry: 1,
		enabled: !!token,
	})

	const { mutate: loginMutate, isPending: isAuthenticating } = useMutation({
		mutationFn: (payload: IAuthRequest) => SessionServices.auth(payload),
		onSuccess: (response) => {
			localStorage.setItem('token', response.token)
			queryClient.invalidateQueries({ queryKey: ['session'] })
		},
	})

	const singout = () => {
		localStorage.removeItem('token')
		queryClient.setQueryData(['session'], null)
		refetch()
	}

	return {
		token,
		session,
		loading: isLoading || isRefetching || isPending || isAuthenticating,
		login: loginMutate,
		refreshSession: () => refetch(),
		singout,
	}
}
