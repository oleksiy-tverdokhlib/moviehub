import { Link, useNavigate } from 'react-router-dom'
import { useDeleteMovieByIdMutation } from '../../features/movies/movies'
import type { Movie } from '../../types/moviesTypes'
import { ROUTES } from '../../utils/constants'
import Icon from '../common/Icon/Icon'
import styles from './Movie.module.css'

const MovieItem = (props: Movie) => {
	const [deleteMovieById] = useDeleteMovieByIdMutation()
	const { id, title, year, format } = props

	const navigate = useNavigate()

	const handleRedirectEdit = () => {
		navigate(`${ROUTES.MOVIE}/${id}`)
	}
	const handleDelete = async () => {
		deleteMovieById({ id: `${id}` }).unwrap()
		navigate(ROUTES.HOME)
	}

	return (
		<div className={styles.item}>
			<Link className={styles.info} to={`/movies/${id}`}>
				<strong>
					<h4>{title}</h4>
				</strong>
				<span>{format}</span>
				<span>{year}</span>
			</Link>

			<div className={styles.actionBtns}>
				<Icon id="edit" onClick={handleRedirectEdit} />
				<Icon id="delete" onClick={handleDelete} />
			</div>
		</div>
	)
}

export default MovieItem
