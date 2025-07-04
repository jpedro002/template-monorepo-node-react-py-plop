import { useAppTitle } from '@/hooks/useAppTitle'

import { usePatientFetch } from '@/services/patient/usePatient'
import {
    currentPatientIDAtom,
    modalUpdatePatientAtom,
    viewModePatientAtom,
} from '@/store/atoms/patient'
import { useAtom } from 'jotai'
import { useFilterModel } from './components/filter/Filter.model'

export function usePatientModel() {
    const [, setModalUpdatePatientIsOpen] = useAtom(
        modalUpdatePatientAtom,
    )
    const [, setCurrentPatient] = useAtom(currentPatientIDAtom)

    const [
        viewMode, setViewMode
    ] = useAtom(viewModePatientAtom)

    useAppTitle({
        title: 'Patients',
    })

    const { filters } = useFilterModel()

    const {
        data = { data: [], pagination: { page: 1, rowCount: 0, pageCount: 1, pageSize: 20 } },
        isLoading,
        error,
        refetch,
        isRefetching,
    } = usePatientFetch({
        term: filters.searchTerm,
        page: filters.page,
        fields: ['name'],
    })

    const onEdit = (b: boolean, id: number) => {
        setModalUpdatePatientIsOpen(b)
        setCurrentPatient(id)
    }

    return {
        data,
        isLoading: isLoading || isRefetching,
        error,
        refetch,
        onEdit,
        viewMode, setViewMode
    }
}
