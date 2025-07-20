import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import ActorList from '../ActorList/ActorList'
import { useMovieForm } from '../../hooks/useMovieForm'
import Icon from '../Icon/Icon'
import TextInput from '../TextInput/TextInput'
import styles from './Movie.module.css'

export interface MovieModeProps {
	mode: 'edit' | 'create'
}

const MovieDataForm = ({ mode }: MovieModeProps) => {
	const navigate = useNavigate()
	const {
		formData,
		handleChange,
		handleActorChange,
		handleAddActor,
		handleDeleteActor,
		handleSubmit,
	} = useMovieForm({ mode })

	const handleNavigete = () => {
		navigate(ROUTES.HOME)
	}

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
				/>

				<TextInput
					id="year"
					type="number"
					label="Year"
					value={formData.year}
					onChange={handleChange}
				/>

				<TextInput
					id="format"
					label="Format"
					value={formData.format}
					onChange={handleChange}
				/>

				<ActorList
					actors={formData.actors}
					onChange={handleActorChange}
					onAdd={handleAddActor}
					onDelete={handleDeleteActor}
				/>

				<button type="submit">{mode === 'edit' ? 'Save' : 'Add Movie'} </button>
			</form>
		</div>
	)
}

export default MovieDataForm
