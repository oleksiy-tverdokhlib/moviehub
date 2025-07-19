import { useMovieForm } from '../../utils/useMovieForm'
import ActorList from '../ActorList/ActorList'
import TextInput from '../TextInput/TextInput'
import styles from './Movie.module.css'

export interface MovieData {
	title: string
	year: number
	format: string
	actors: string[]
}

interface MovieDataFormProps {
	mode: 'edit' | 'create'
}

const MovieDataForm = ({ mode }: MovieDataFormProps) => {
	const {
		formData,
		handleChange,
		handleActorChange,
		handleAddActor,
		handleDeleteActor,
		handleSubmit,
	} = useMovieForm(mode)

	return (
		<form className={styles.movieForm} onSubmit={handleSubmit}>
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

			<button type="submit">{mode === 'edit' ? 'Save' : 'Add Movie'}</button>
		</form>
	)
}

export default MovieDataForm
