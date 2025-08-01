import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMoviesListQuery } from '../../features/movies/movies'
import { useIsAuth } from '../../hooks/useIsAuth'
import type { Movie, SearchParams } from '../../interfaces/movies'
import { MOVIES_PER_PAGES, ROUTES } from '../../shared/constants'
import ErrorElement from '../common/ErrorElement/ErrorElement'
import Loader from '../common/Loader/Loader'
import Pagination from '../common/Pagination/Pagination'
import styles from './Movie.module.css'
import MovieItem from './MovieItem'

interface MoviesListProps {
	queryArgs: {
		searchString: string
	}
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
}

const MoviesList = ({ queryArgs, setSearchParams }: MoviesListProps) => {
	const navigate = useNavigate()
	const isAuth = useIsAuth()
	if (!isAuth) return null

	const {
		data: moviesResponse,
		isLoading,
		isError,
		error,
	} = useGetMoviesListQuery(queryArgs)

	const total = moviesResponse?.meta?.total
	const list = moviesResponse?.data
	const condition = total && list

	const toggleAddNewMovie = () => {
		navigate(ROUTES.CREATE)
	}

	useEffect(() => {
		if ((total && total <= 10) || (total && list?.length === 0)) {
			setSearchParams((prev) => {
				return { ...prev, offset: 0 }
			})
		}
	}, [moviesResponse])

	if (isLoading)
		return (
			<div className={styles.content}>
				<Loader />
			</div>
		)
	if (isError) return <ErrorElement error={error} />

	return (
		<section className={styles.content}>
			<div>
				<div className={styles.contentHeader}>
					<h2>Movies:</h2>
					<button onClick={toggleAddNewMovie}>add new movie </button>
				</div>

				<div className={styles.list}>
					{list?.length === 0 && <h2>Movie not found...</h2>}
					{list?.map((movie: Movie) => (
						<MovieItem key={movie.id} {...movie} />
					))}
				</div>
			</div>

			{condition
				? total > MOVIES_PER_PAGES && (
						<Pagination setSearchParams={setSearchParams} totalItems={total} />
				  )
				: null}
		</section>
	)
}

export default MoviesList
