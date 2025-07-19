import { Link, useNavigate } from 'react-router-dom'
import { useDeleteMovieByIdMutation } from '../../services/movies'
import type { Movie } from '../../types/moviesTypes'
import { ROUTES } from '../../utils/constants'
import styles from './Movie.module.css'
import Icon from '../Icon/Icon'

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
				<Icon id={'edit'} onClick={handleRedirectEdit} />
				<Icon id={'delete'} onClick={handleDelete} />
			</div>
		</div>
	)
}

export default MovieItem
