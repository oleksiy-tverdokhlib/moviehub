import { useEffect, useState } from 'react'
import {
	useAddNewMovieMutation,
	useGetMoviesListQuery,
	type Movie,
} from '../../services/movies'
import AddNewMovieForm from '../Movies/AddNewMovieForm'
import MovieFileForm from '../Movies/MovieFileForm'
import MovieItem from '../Movies/MovieItem'
import styles from './Home.module.css'

const Home = () => {
	const [addNewMovie, { isSuccess }] = useAddNewMovieMutation()

	const {
		data: moviesResponse,
		isLoading,
		isError,
		refetch,
	} = useGetMoviesListQuery()

	const [isCreatingMovie, setIsCreatingMovie] = useState(false)

	const toggleAddNewMovie = () => {
		setIsCreatingMovie((prev) => !prev)
	}

	useEffect(() => {
		if (isSuccess) {
			refetch()
		}
	}, [isSuccess])

	return (
		<div>
			<h2>Movies:</h2>
			<div className={styles.actionBtns}>
				{isCreatingMovie ? (
					<AddNewMovieForm
						toggleAddNewMovie={toggleAddNewMovie}
						addNewMovie={addNewMovie}
					/>
				) : (
					<button onClick={toggleAddNewMovie}>add new movie</button>
				)}

				{!isCreatingMovie && <MovieFileForm />}
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
