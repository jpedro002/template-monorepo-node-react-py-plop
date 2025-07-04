import { usePaginationModel } from './Pagination.model'
import { PaginationView } from './Pagination.view'
import { PaginationProps } from './types'

export function Pagination({ page, rowCount, pageCount, pageSize }: PaginationProps) {
	const props = usePaginationModel({ page, rowCount, pageCount, pageSize })
	return <PaginationView {...props} />
}
