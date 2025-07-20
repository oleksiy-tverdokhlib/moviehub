import { useNavigate } from 'react-router-dom'
import { useGetMoviesListQuery } from '../../services/movies'
import type { Movie } from '../../types/moviesTypes'
import { ROUTES } from '../../utils/constants'
import { useFilter } from '../../hooks/useFilter'
import MovieItem from '../Movies/MovieItem'
import styles from './Home.module.css'
import Sidebar from './SideBar'

const Home = () => {
	const navigate = useNavigate()

	const { setSearchParams, queryArgs } = useFilter()

	const {
		data: moviesResponse,
		isLoading,
		isError,
	} = useGetMoviesListQuery(queryArgs, {
		refetchOnMountOrArgChange: true,
	})

	const toggleAddNewMovie = () => {
		navigate(ROUTES.CREATE)
	}

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error occurred...</div>

	return (
		<main className={styles.home}>
			<Sidebar setSearchParams={setSearchParams} />
			<div className={styles.content}>
				<h2>Movies:</h2>
				<div className={styles.contentHeader}>
					<button onClick={toggleAddNewMovie}>add new movie </button>
				</div>

				<div className={styles.list}>
					{moviesResponse?.data?.map((movie: Movie) => (
						<MovieItem key={movie.id} {...movie} />
					))}
				</div>
			</div>
		</main>
	)
}

export default Home
