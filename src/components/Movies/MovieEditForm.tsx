import { useState } from 'react'
import styles from './Movie.module.css'
import { useUpdateMovieMutation } from '../../services/movies'
import { useNavigate } from 'react-router-dom'
import TextInput from '../TextInput/TextInput'
import ActorList from '../ActorList/ActorList'

export interface Actor {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}

export interface MovieData {
	title: string
	year: number
	format: string
	actors: string[]
}

const MovieEditForm = ({
	title,
	format,
	year,
	actors,
	id,
}: MovieData & { id: string }) => {
	const navigate = useNavigate()
	const [updateMovie] = useUpdateMovieMutation()

	const [formData, setFormData] = useState<MovieData>({
		title,
		format,
		year,
		actors,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setFormData((prev) => ({
			...prev,
			[id]: id === 'year' ? Number(value) : value,
		}))
	}

	const handleActorChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const updated = [...formData.actors]
		updated[index] = e.target.value
		setFormData({ ...formData, actors: updated })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const isUnchanged =
			formData.title === title &&
			formData.year === year &&
			formData.format === format &&
			JSON.stringify(formData.actors) === JSON.stringify(actors)

		if (isUnchanged) {
			console.log('No changes detected')
			return
		}

		try {
			await updateMovie({ id, updatedMovie: formData }).unwrap()
			console.log('Updated successfully')
			navigate('/')
		} catch (err) {
			console.error('Failed to update movie', err)
		}
	}

	return (
		<form className={styles.movieForm} onSubmit={handleSubmit}>
			<h3>Edit movie data</h3>
			<TextInput
				id="title"
				value={formData.title}
				onChange={handleChange}
				label={'Title'}
			/>
			<TextInput
				id="format"
				value={formData.format}
				onChange={handleChange}
				label={'Format'}
			/>
			<TextInput
				id="year"
				type="number"
				value={formData.year}
				label={'Year'}
				onChange={handleChange}
			/>

			<ActorList actors={formData.actors} onChange={handleActorChange} />
			<button type="submit">Save</button>
		</form>
	)
}

export default MovieEditForm
