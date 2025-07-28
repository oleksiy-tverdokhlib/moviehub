import { useState } from 'react'
import type { PaginationProps } from '../interfaces/movies'
import { MOVIES_PER_PAGES } from '../shared/constants'

export const usePagination = ({
	totalItems,
	setSearchParams,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalItems / MOVIES_PER_PAGES)
	const [currentPage, setCurrentPage] = useState(0)

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setSearchParams((prev) => {
				return { ...prev, offset: currentPage * MOVIES_PER_PAGES + 1 }
			})
			setCurrentPage((prev) => prev + 1)
		}
	}
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setSearchParams((prev) => {
				return { ...prev, offset: currentPage * MOVIES_PER_PAGES - 1 }
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
		handlePageClick,
		handlePreviousPage,
		handleNextPage,
	}
}
