import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useAddNewMovieMutation,
	useGetMovieByIdQuery,
	useUpdateMovieMutation,
} from '../features/movies/movies'
import type { MovieData, MovieModeProps } from '../types/moviesTypes'
import { handleMoviesFormErrors } from '../utils/common'
import { ROUTES } from '../utils/constants'

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
	const formErrors = handleMoviesFormErrors(formData)

	const [addNewMovie] = useAddNewMovieMutation()
	const [updateMovie] = useUpdateMovieMutation()

	const {
		data: existingMovie,
		isSuccess,
		isLoading,
	} = useGetMovieByIdQuery(
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setFormData((prev) => ({
			...prev,
			[id]: id === 'year' ? Number(value) : value,
		}))
	}

	const handleActorChange = (
		index: number,
		e: ChangeEvent<HTMLInputElement>
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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		const isEmptyErrorObject = Object.values(formErrors).every(
			(e) => e === undefined
		)
		if (!isEmptyErrorObject) {
			return
		}

		const cleanedActors = formData.actors.filter((e) => e.trim() !== '')

		const payload: MovieData = {
			...formData,
			actors: cleanedActors,
		}

		if (mode === 'edit' && id && existingMovie?.data) {
			const original = existingMovie.data
			const unchanged = JSON.stringify(payload) === JSON.stringify(original)

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
		formErrors,
		isLoading,
	}
}
