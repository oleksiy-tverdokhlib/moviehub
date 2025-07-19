import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMoviesListQuery } from '../../services/movies'
import type { Movie } from '../../types/moviesTypes'
import { ROUTES } from '../../utils/constants'
import MovieFileForm from '../Movies/MovieFileForm'
import MovieItem from '../Movies/MovieItem'
import styles from './Home.module.css'
import Icon from '../Icon/Icon'

const Home = () => {
	const navigate = useNavigate()
	const [isAscOrder, setIsAscOrder] = useState(false)

	const { data: moviesResponse, isLoading, isError } = useGetMoviesListQuery()

	const handleToggleOrder = () => {
		setIsAscOrder((prev) => !prev)
	}

	const toggleAddNewMovie = () => {
		navigate(ROUTES.CREATE)
	}

	return (
		<div>
			<h2>Movies:</h2>
			<div className={styles.actionBtns}>
				<button onClick={toggleAddNewMovie}>add new movie</button>
				<div>lol</div>
				{isAscOrder ? (
					<Icon id={'asc'} onClick={handleToggleOrder} />
				) : (
					<Icon id={'desc'} onClick={handleToggleOrder} />
				)}

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
