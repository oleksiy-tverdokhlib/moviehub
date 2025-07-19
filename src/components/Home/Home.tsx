import { useNavigate } from 'react-router-dom'
import { useGetMoviesListQuery } from '../../services/movies'
import MovieFileForm from '../Movies/MovieFileForm'
import MovieItem from '../Movies/MovieItem'
import styles from './Home.module.css'
import { ROUTES } from '../../utils/constants'
import type { Movie } from '../../types/movies'

const Home = () => {
	const navigate = useNavigate()

	const { data: moviesResponse, isLoading, isError } = useGetMoviesListQuery()

	const toggleAddNewMovie = () => {
		navigate(ROUTES.CREATE)
	}

	return (
		<div>
			<h2>Movies:</h2>
			<div className={styles.actionBtns}>
				<button onClick={toggleAddNewMovie}>add new movie</button>
				<MovieFileForm />
			</div>

			<div className={styles.list}>
				{isLoading && <p>Loading movies...</p>}
				{isError && <p>Failed to fetch movies</p>}

				{moviesResponse?.data?.map((movie: Movie) => (
					<MovieItem key={movie.id} {...movie} />
				))}
			</div>
		</div>
	)
}

export default Home
