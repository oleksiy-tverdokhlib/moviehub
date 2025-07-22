import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useAddNewMovieMutation,
	useGetMovieByIdQuery,
	useUpdateMovieMutation,
} from '../features/movies/movies'
import type {
	MovieData,
	MovieModeProps,
	MoviesErrors,
} from '../types/moviesTypes'
import { handleMoviesFormErrors } from '../utils/common'
import { ROUTES } from '../utils/constants'

const initialData: MovieData = {
	title: 'Write your title',
	year: 2000,
	format: 'DVD',
	actors: [''],
}
const initialErrors: MoviesErrors = {
	title: undefined,
	year: undefined,
	format: undefined,
	actors: undefined,
}

export const useMovieForm = ({ mode }: MovieModeProps) => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [formData, setFormData] = useState<MovieData>(initialData)
	const [formErrors, setFormErrors] = useState(initialErrors)

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

	useEffect(() => {
		setFormErrors(handleMoviesFormErrors(formData))
	}, [formData])

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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		const err = handleMoviesFormErrors(formData)
		const isEmptyErrorObject = Object.values(err).every((e) => e === undefined)

		if (!isEmptyErrorObject) {
			setFormErrors(err)
			return
		}

		const cleanedActors = formData.actors.filter((e) => e.trim() !== '')

		const payload: MovieData = {
			...formData,
			actors: cleanedActors,
		}
		if (id && existingMovie?.data) {
			const original = existingMovie.data

			const unchanged =
				formData.title === original.title &&
				formData.year === original.year &&
				formData.format === original.format &&
				JSON.stringify(formData.actors) ===
					JSON.stringify(original.actors.map((a) => a.name))

			if (unchanged) {
				return
			}
		}

		if (mode === 'edit' && id) {
			updateMovie({ id, updatedMovie: payload }).unwrap()
		} else {
			addNewMovie(payload).unwrap()
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
