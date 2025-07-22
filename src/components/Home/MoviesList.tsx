import { useNavigate } from 'react-router-dom'
import type { Movie } from '../../types/moviesTypes'
import MovieItem from '../Movies/MovieItem'
import styles from './Home.module.css'
import { useGetMoviesListQuery } from '../../features/movies/movies'
import { ROUTES } from '../../utils/constants'
import Loader from '../../common/Loader/Loader'
import ErrorElement from '../../common/ErrorElement/ErrorElement'
import { useIsAuth } from '../../hooks/useIsAuth'

interface MoviesListProps {
	queryArgs: {
		searchString: string
	}
}

const MoviesList = ({ queryArgs }: MoviesListProps) => {
	const navigate = useNavigate()
	const isAuth = useIsAuth()

	if (!isAuth) return

	const {
		data: moviesResponse,
		isLoading,
		isError,
		error,
	} = useGetMoviesListQuery(queryArgs, {
		refetchOnMountOrArgChange: true,
	})

	const toggleAddNewMovie = () => {
		navigate(ROUTES.CREATE)
	}

	if (isLoading) return <Loader />
	if (isError) return <ErrorElement error={error} />

	return (
		<div className={styles.content}>
			<div className={styles.contentHeader}>
				<h2>Movies:</h2>
				<button onClick={toggleAddNewMovie}>add new movie </button>
			</div>

			<div className={styles.list}>
				{moviesResponse?.data?.length === 0 && <h2>Movie not found...</h2>}
				{moviesResponse?.data?.map((movie: Movie) => (
					<MovieItem key={movie.id} {...movie} />
				))}
			</div>
		</div>
	)
}

export default MoviesList
