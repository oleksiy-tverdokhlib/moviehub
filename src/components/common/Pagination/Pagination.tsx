import { usePagination } from '../../../hooks/usePagination'
import type { PaginationProps } from '../../../interfaces/movies'
import styles from './Pagination.module.css'

const Pagination = ({ totalItems, setSearchParams }: PaginationProps) => {
	const {
		totalPages,
		pageNumbers,
		currentPage,
		handleNextPage,
		handlePageClick,
		handlePreviousPage,
	} = usePagination({ totalItems, setSearchParams })

	return (
		<div className={styles.pagination}>
			<button
				className={styles.arrow}
				disabled={currentPage <= 0}
				onClick={handlePreviousPage}
			>
				{'<'}
			</button>

			<div className={styles.list}>
				{pageNumbers.map((page, index) =>
					page === '...' ? (
						<span key={`dots-${index}`} className={styles.dots}>
							...
						</span>
					) : (
						<button
							key={page}
							className={styles.pageNumber}
							disabled={page === currentPage}
							onClick={() => handlePageClick(page as number)}
						>
							{(page as number) + 1}
						</button>
					)
				)}
			</div>

			<button
				className={styles.arrow}
				disabled={currentPage + 1 >= totalPages}
				onClick={handleNextPage}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Pagination
