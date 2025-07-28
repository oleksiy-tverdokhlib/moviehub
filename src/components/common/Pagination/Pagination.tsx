import { usePagination } from '../../../hooks/usePagination'
import type { PaginationProps } from '../../../interfaces/movies'
import styles from './Pagination.module.css'

const Pagination = ({ totalItems, setSearchParams }: PaginationProps) => {
	const {
		totalPages,
		currentPage,
		handleNextPage,
		handlePageClick,
		handlePreviousPage,
	} = usePagination({ totalItems, setSearchParams })

	return (
		<div className={styles.pagination}>
			<button
				className={styles.arrow}
				disabled={currentPage <= 1}
				onClick={handlePreviousPage}
			>
				{'<'}
			</button>

			<div className={styles.list}>
				{[...Array(totalPages)].map((_, index) => {
					return (
						<button
							className={styles.pageNumber}
							key={index}
							disabled={index === currentPage}
							onClick={() => handlePageClick(index)}
						>
							{index + 1}
						</button>
					)
				})}
			</div>

			<button
				className={styles.arrow}
				disabled={currentPage >= totalPages}
				onClick={handleNextPage}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Pagination
