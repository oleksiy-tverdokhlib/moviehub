import { Link, useNavigate } from 'react-router-dom'
import { useDeleteMovieByIdMutation } from '../../features/movies/movies'
import type { Movie } from '../../interfaces/movies'
import { ROUTES } from '../../shared/constants'
import Icon from '../common/Icon/Icon'
import styles from './Movie.module.css'
import { useState } from 'react'
import DeleteModal from './DeleteModal'

const MovieItem = (props: Movie) => {
	const [mustDelete, setMustDelete] = useState(false)
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
		<>
			{mustDelete && (
				<DeleteModal
					title={title}
					onConfirm={handleDelete}
					onCancel={() => setMustDelete(false)}
				/>
			)}
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
					<Icon id="delete" onClick={() => setMustDelete(true)} />
				</div>
			</div>
		</>
	)
}

export default MovieItem
