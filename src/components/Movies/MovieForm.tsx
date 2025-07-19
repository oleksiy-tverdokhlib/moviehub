// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import ActorList from '../ActorList/ActorList'
// import TextInput from '../TextInput/TextInput'
// import type { MovieData } from './MovieEditForm'
// import styles from './Movie.module.css'

// interface MovieFormProps {
// 	initialData: MovieData
// 	onSubmit: (data: MovieData) => Promise<void> | void
// 	submitLabel: string
// 	title?: string
// }

// const MovieForm = ({
// 	initialData,
// 	onSubmit,
// 	submitLabel,
// 	title,
// }: MovieFormProps) => {
// 	const [formData, setFormData] = useState<MovieData>(initialData)
// 	const navigate = useNavigate()

// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { id, value } = e.target
// 		setFormData((prev) => ({
// 			...prev,
// 			[id]: id === 'year' ? Number(value) : value,
// 		}))
// 	}

// 	const handleActorChange = (
// 		index: number,
// 		e: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const updated = [...formData.actors]
// 		updated[index] = e.target.value
// 		setFormData({ ...formData, actors: updated })
// 	}

// 	const handleAddActor = () => {
// 		setFormData((prev) => ({ ...prev, actors: [...prev.actors, ''] }))
// 	}

// 	const handleDeleteActor = (i: number) => {
// 		setFormData((prev) => ({
// 			...prev,
// 			actors: prev.actors.filter((_, index) => index !== i),
// 		}))
// 	}

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		await onSubmit(formData)
// 		navigate('/')
// 	}

// 	return (
// 		<form className={styles.movieForm} onSubmit={handleSubmit}>
// 			{title && <h3>{title}</h3>}
// 			<TextInput
// 				id="title"
// 				label="Title"
// 				value={formData.title}
// 				onChange={handleChange}
// 			/>
// 			<TextInput
// 				id="year"
// 				type="number"
// 				label="Year"
// 				value={formData.year}
// 				onChange={handleChange}
// 			/>
// 			<TextInput
// 				id="format"
// 				label="Format"
// 				value={formData.format}
// 				onChange={handleChange}
// 			/>
// 			<ActorList
// 				actors={formData.actors}
// 				onChange={handleActorChange}
// 				onAdd={handleAddActor}
// 				onDelete={handleDeleteActor}
// 			/>
// 			<button type="submit">{submitLabel}</button>
// 		</form>
// 	)
// }

// export default MovieForm
