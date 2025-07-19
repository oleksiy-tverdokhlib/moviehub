import { Link, useNavigate } from 'react-router-dom'
import type { Movie } from '../../features/movies/moviesSlice'
import styles from './Movie.module.css'
import { useDeleteMovieByIdMutation } from '../../services/movies'
import { ROUTES } from '../../utils/constants'

const MovieItem = (props: Movie) => {
	const [deleteMovieById] = useDeleteMovieByIdMutation()
	const { id, title, year, format } = props

	const navigate = useNavigate()

	const handleRedirectEdit = () => {
		navigate(`${ROUTES.MOVIE}/${id}`)
	}
	const handleDelete = async () => {
		try {
			await deleteMovieById({ id: `${id}` }).unwrap()
			navigate(ROUTES.HOME)
			console.log('Deleted successfully')
		} catch (err) {
			console.error('Failed to delete movie', err)
		}
	}

	return (
		<div className={styles.item}>
			<Link className={styles.info} to={`/movies/${id}`} state={{ edit: true }}>
				<h4>{title}</h4>
				<span>{format}</span>
				<span>{year}</span>
			</Link>

			<div className={styles.actionBtns}>
				<svg className={styles.editIcon} onClick={handleRedirectEdit}>
					<use href="/sprite.svg#edit" />
				</svg>

				<svg className={styles.deleteIcon} onClick={handleDelete}>
					<use href="/sprite.svg#delete" />{' '}
				</svg>
			</div>
		</div>
	)
}

export default MovieItem
