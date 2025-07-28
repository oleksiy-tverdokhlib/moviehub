import { useState } from 'react'
import type { PaginationProps } from '../interfaces/movies'
import { MOVIES_PER_PAGES } from '../shared/constants'
import { getPageNumbers } from '../shared/getPaginationNumbers'


export const usePagination = ({
	totalItems,
	setSearchParams,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalItems / MOVIES_PER_PAGES)
	const [currentPage, setCurrentPage] = useState(0)

	const pageNumbers = getPageNumbers(totalPages, currentPage)

	const handleNextPage = () => {
		if (currentPage <= totalPages) {
			setSearchParams((prev) => {
				return { ...prev, offset: (currentPage + 1) * MOVIES_PER_PAGES }
			})
			setCurrentPage((prev) => prev + 1)
		}
	}
	const handlePreviousPage = () => {
		if (currentPage >= 1) {
			setSearchParams((prev) => {
				return { ...prev, offset: (currentPage - 1) * MOVIES_PER_PAGES }
			})
			setCurrentPage((prev) => prev - 1)
		}
	}

	const handlePageClick = (pagenumber: number) => {
		setSearchParams((prev) => {
			return { ...prev, offset: pagenumber * MOVIES_PER_PAGES }
		})
		setCurrentPage(pagenumber)
	}

	return {
		totalPages,
		currentPage,
		pageNumbers,
		handleNextPage,
		handlePageClick,
		handlePreviousPage,
	}
}
