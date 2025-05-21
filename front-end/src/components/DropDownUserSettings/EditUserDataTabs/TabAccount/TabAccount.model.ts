import { useAuth } from '@/hooks/useAuth/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { EmailAndNameSchema } from './TabAccount.schema'
import { IEmailAndNameSchema, IuseTabAccountProps } from './TabAccount.type'

export const useTabAccount = ({
	handleCloseModal,
	usersService,
}: IuseTabAccountProps) => {
	const { session, refreshSession } = useAuth()
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEmailAndNameSchema>({
		resolver: zodResolver(EmailAndNameSchema),
		defaultValues: {
			name: session?.name || '',
			email: session?.email || '',
		},
	})

	const { mutate: updateUserData, isPending } = useMutation({
		mutationFn: (data: IEmailAndNameSchema) =>
			usersService.selfUpdateEmailAndName(data),

		onMutate: async (newData) => {
			await queryClient.cancelQueries({ queryKey: ['session'] })

			const previousSession = queryClient.getQueryData(['session'])

			queryClient.setQueryData(['session'], (old: any) => ({
				...old,
				name: newData.name,
				email: newData.email,
			}))

			return { previousSession }
		},

		onError: (error, _variables, context) => {
			if (context?.previousSession) {
				queryClient.setQueryData(['session'], context.previousSession)
			}

			console.error(error)
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao atualizar conta')
			} else {
				toast.error('Ocorreu um erro ao atualizar sua conta')
			}
		},

		onSettled: () => {
			refreshSession()
		},

		onSuccess: () => {
			toast.success('Conta atualizada com sucesso')
			handleCloseModal()
		},
	})

	const onSubmit = (data: IEmailAndNameSchema) => {
		updateUserData(data)
	}

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isSubmitting: isPending,
	}
}
