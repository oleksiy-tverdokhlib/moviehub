import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useAddNewMovieMutation,
	useGetMovieByIdQuery,
	useUpdateMovieMutation,
} from '../services/movies'
import type { MovieData } from '../types/moviesTypes'
import { ROUTES } from '../utils/constants'
import type { MovieModeProps } from '../components/Movies/MovieDataForm'

const initialData: MovieData = {
	title: '',
	year: 1900,
	format: '',
	actors: [''],
}

export const useMovieForm = ({ mode }: MovieModeProps) => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [formData, setFormData] = useState<MovieData>(initialData)

	const [addNewMovie] = useAddNewMovieMutation()
	const [updateMovie] = useUpdateMovieMutation()

	const { data: existingMovie, isSuccess } = useGetMovieByIdQuery(
		{ id: id ?? '' },
		{
			skip: mode !== 'edit' || !id,
		}
	)

	useEffect(() => {
		if (mode === 'edit' && isSuccess && existingMovie?.data) {
			setFormData({
				title: existingMovie.data.title,
				year: existingMovie.data.year,
				format: existingMovie.data.format,
				actors: existingMovie.data.actors.map((a) => a.name),
			})
		}
	}, [mode, isSuccess, existingMovie])

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
		setFormData((prev) => ({ ...prev, actors: updated }))
	}

	const handleAddActor = () => {
		setFormData((prev) => ({ ...prev, actors: [...prev.actors, ''] }))
	}

	const handleDeleteActor = (index: number) => {
		setFormData((prev) => ({
			...prev,
			actors: prev.actors.filter((_, i) => i !== index),
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const cleanedActors = formData.actors.filter((e) => e.trim() !== '')

		const payload: MovieData = {
			...formData,
			actors: cleanedActors,
		}

		if (mode === 'edit' && id && existingMovie?.data) {
			const original = existingMovie.data
			const unchanged =
				formData.title === original.title &&
				formData.year === original.year &&
				formData.format === original.format &&
				JSON.stringify(cleanedActors) ===
					JSON.stringify(original.actors.map((a) => a.name))

			if (unchanged) {
				navigate(ROUTES.HOME)
				return
			}

			await updateMovie({ id, updatedMovie: payload }).unwrap()
		} else {
			await addNewMovie(payload).unwrap()
		}

		navigate(ROUTES.HOME)
	}

	return {
		formData,
		handleChange,
		handleActorChange,
		handleAddActor,
		handleDeleteActor,
		handleSubmit,
	}
}
