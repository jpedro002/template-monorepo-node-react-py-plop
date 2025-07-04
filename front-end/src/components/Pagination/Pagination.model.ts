import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

interface UsePaginationModelProps {
	page: number
	rowCount: number
	pageCount: number
	pageSize: number
}

export function usePaginationModel({ page, rowCount, pageCount, pageSize }: UsePaginationModelProps) {
	const [searchParams, setSearchParams] = useSearchParams()

	const goToPage = (newPage: number) => {
		if (newPage < 1 || newPage > pageCount) return

		setSearchParams((params) => {
			params.set('page', String(newPage))
			return params
		})
	}

	useEffect(() => {
		const currentPage = parseInt(searchParams.get('page') || '1', 10)

		if (currentPage < 1) {
			goToPage(1)
		} else if (pageCount > 0 && currentPage > pageCount) {
			goToPage(pageCount)
		}
	}, [page, pageCount, searchParams])

	const startItem = rowCount === 0 ? 0 : (page - 1) * pageSize + 1
	const endItem = Math.min(page * pageSize, rowCount)

	return {
		page,
		rowCount,
		pageCount,
		pageSize,
		startItem,
		endItem,
		goToPage,
	}
}
