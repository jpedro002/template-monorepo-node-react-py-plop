import { CreatePatientDto } from '@/services/patient'
import { usePatientCreate } from '@/services/patient/usePatient'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useCreatePatientDialogModel() {
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<CreatePatientDto>({
        defaultValues: {
            name: '',
        },
    })

    const createMutation = usePatientCreate()

    const onSubmit = (data: CreatePatientDto) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                setIsOpen(false)
                form.reset()
            }
        })
    }

    return {
        isOpen,
        setIsOpen,
        form,
        onSubmit,
        isLoading: createMutation.isPending,
        error: createMutation.error,
    }
}
