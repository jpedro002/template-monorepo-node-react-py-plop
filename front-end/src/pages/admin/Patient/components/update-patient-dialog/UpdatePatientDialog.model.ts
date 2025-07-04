import { UpdatePatientDto } from '@/services/patient'
import { usePatientGet, usePatientUpdate } from '@/services/patient/usePatient'
import { currentPatientIDAtom, modalUpdatePatientAtom } from '@/store/atoms/patient'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function useUpdatePatientDialogModel() {
    const [isOpen, setIsOpen] = useAtom(modalUpdatePatientAtom)
    const [currentPatientID] = useAtom(currentPatientIDAtom)

    const form = useForm<UpdatePatientDto>({
        defaultValues: {
            name: '',
        },
    })

    const { data: patient, isLoading: isLoadingPatient } = usePatientGet(currentPatientID!)

    const updateMutation = usePatientUpdate()

    const onSubmit = (data: UpdatePatientDto) => {
        if (currentPatientID) {
            updateMutation.mutate({ id: currentPatientID, data }, {
                onSuccess: () => {
                    setIsOpen(false)
                    form.reset()
                }
            })
        }
    }

    useEffect(() => {
        if (patient) {
            form.reset({
                name: patient.name,
            })
        }
    }, [patient, form])

    return {
        isOpen,
        setIsOpen,
        form,
        onSubmit,
        isLoading: updateMutation.isPending,
        isLoadingPatient,
        error: updateMutation.error,
        patient,
    }
}
