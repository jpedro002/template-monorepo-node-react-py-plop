import { usersKeys } from '@/services/appUsers/queryKeys'
import { ROLES_ARRAY } from '@/services/session/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useFilterUsers } from '../FilterUsers/FilterUsers.model'
import { createUserSchema } from './CreateAccountModal.schema'
import {
	ICreateUserSchema,
	IUseCreateAccountModal,
} from './CreateAccountModal.types'

export const useCreateAccountModal = ({
	usersService,
}: IUseCreateAccountModal) => {
	const [isOpen, setIsOpen] = useState(false)
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
		retypePassword: false,
	})

	const { filters } = useFilterUsers()

	const queryClient = useQueryClient()

	const methods = useForm<ICreateUserSchema>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			retypePassword: '',
			role: '',
		},
	})

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = methods

	const createUserMutation = useMutation({
		mutationFn: (data: Omit<ICreateUserSchema, 'retypePassword'>) => {
			return usersService.create({
				...data,
				email: data.email.trim().toLowerCase(),
				name: data.name.trim().toLowerCase(),
			})
		},
		onSuccess: (newUser) => {
			queryClient.setQueryData(
				usersKeys.users.list(filters),
				(oldData: any) => {
					return oldData ? [...oldData, newUser] : [newUser]
				},
			)
			resetForm()
			toast.success('Usuário criado com sucesso')
		},
		onError: (error) => {
			console.error(error)
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao criar o usuário')
			}
		},
	})

	const togglePasswordVisibility = (
		passwordField: 'password' | 'retypePassword',
	) => {
		setPasswordVisibility((prev) => ({
			...prev,
			[passwordField]: !prev[passwordField],
		}))
	}

	const resetForm = () => {
		reset()
		setPasswordVisibility({
			password: false,
			retypePassword: false,
		})
	}

	const onSubmit = async (data: ICreateUserSchema) => {
		const { role, name, retypePassword, ...rest } = data
		createUserMutation.mutate({ ...rest, name, role })
	}

	useEffect(() => {
		if (isOpen) {
			resetForm()
		}
	}, [isOpen, reset])

	return {
		isOpen,
		setIsOpen,
		loading: createUserMutation.isPending,
		passwordVisibility,
		togglePasswordVisibility,
		register,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
		ROLES: ROLES_ARRAY,
		methods,
	}
}
