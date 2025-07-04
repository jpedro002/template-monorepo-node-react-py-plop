import { usePaginationModel } from './Pagination.model'

export interface PaginationProps {
    page: number
    rowCount: number
    pageCount: number
    pageSize: number
}

export type PaginationViewProps = ReturnType<typeof usePaginationModel>
