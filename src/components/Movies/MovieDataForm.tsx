import { useNavigate } from 'react-router-dom'
import { useMovieForm } from '../../hooks/useMovieForm'
import type { MovieModeProps } from '../../types/moviesTypes'
import { ROUTES } from '../../utils/constants'
import ActorList from '../ActorList/ActorList'
import Icon from '../Icon/Icon'
import TextInput from '../TextInput/TextInput'
import styles from './Movie.module.css'
import Loader from '../Loader/Loader'

const MovieDataForm = ({ mode }: MovieModeProps) => {
	const navigate = useNavigate()
	const {
		formData,
		handleChange,
		handleActorChange,
		handleAddActor,
		handleDeleteActor,
		handleSubmit,
		formErrors,
		isLoading,

	} = useMovieForm({ mode })

	const handleNavigete = () => {
		navigate(ROUTES.HOME)
	}

	if (isLoading) return <Loader />

	return (
		<div className={styles.container}>
			<form className={styles.movieForm} onSubmit={handleSubmit}>
				<div className={styles.return} onClick={handleNavigete}>
					<Icon id={'arrow-left'} />
					<span>Return</span>
				</div>

				<h3>{mode === 'edit' ? 'Edit Movie' : 'Add New Movie'}</h3>

				<TextInput
					id="title"
					label="Title"
					value={formData.title}
					onChange={handleChange}
					error={formErrors.title}
				/>

				<TextInput
					id="year"
					type="number"
					label="Year"
					value={formData.year}
					onChange={handleChange}
					error={formErrors.year}
				/>

				<TextInput
					id="format"
					label="Format"
					value={formData.format}
					onChange={handleChange}
					error={formErrors.format}
				/>

				<ActorList
					actors={formData.actors}
					onChange={handleActorChange}
					onAdd={handleAddActor}
					onDelete={handleDeleteActor}
					errors={formErrors.actors}
				/>
	

				<button type="submit">{mode === 'edit' ? 'Save' : 'Add Movie'} </button>
			</form>
		</div>
	)
}

export default MovieDataForm
