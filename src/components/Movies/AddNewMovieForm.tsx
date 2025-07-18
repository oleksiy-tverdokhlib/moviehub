import { useState } from 'react'
import ActorList from '../ActorList/ActorList'
import TextInput from '../TextInput/TextInput'
import styles from './Movie.module.css'
import type { MovieData } from './MovieEditForm'
import type { movieApi } from '../../services/movies'

interface Props {
	toggleAddNewMovie: () => void
	addNewMovie: ReturnType<typeof movieApi.endpoints.addNewMovie.useMutation>[0]
}

const AddNewMovieForm = ({ toggleAddNewMovie, addNewMovie }: Props) => {
	const [formData, setFormData] = useState<MovieData>({
		title: '',
		year: 1900,
		format: '',
		actors: [''],
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setFormData((prev) => ({
			...prev,
			[id]: id === 'year' ? Number(value) : value,
		}))
	}

	const handleActorChange = (
		i: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const updated = [...formData.actors]
		updated[i] = e.target.value
		setFormData({ ...formData, actors: updated })
	}

	const handleAddActor = () =>
		setFormData((prev) => ({ ...prev, actors: [...prev.actors, ''] }))
	
	const handleDeleteActor = (i: number) =>
		setFormData((prev) => ({
			...prev,
			actors: prev.actors.filter((_, index) => index !== i),
		}))

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		addNewMovie(formData)
		toggleAddNewMovie()
	}

	return (
		<form className={styles.movieForm} onSubmit={handleSubmit}>
			<TextInput
				id="title"
				label="Title"
				value={formData.title}
				onChange={handleChange}
			/>
			<TextInput
				id="year"
				label="Year"
				type="number"
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

			<input type="submit" value="Submit" />
		</form>
	)
}
export default AddNewMovieForm
