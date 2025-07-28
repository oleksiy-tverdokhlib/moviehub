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
} from '../interfaces/movies'
import {
	handleActorsFieldError,
	handleMoviesFormErrors,
	handleSingleFieldError,
	isEmptyData,
	trimFormData,
} from '../shared/validation'
import { ROUTES } from '../shared/constants'

export const initialData: MovieData = {
	title: '',
	year: '',
	format: '',
	actors: [''],
}

const initialErrors: MoviesErrors = {
	title: undefined,
	year: undefined,
	format: undefined,
	actors: undefined,
}

export const useMovieForm = ({ mode }: MovieModeProps) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [formData, setFormData] = useState<MovieData>(initialData)
	const [formErrors, setFormErrors] = useState(initialErrors)
	const [wasEdited, setWasEdited] = useState(false)
	const [wasFormChanged, setWasFormChanged] = useState(false)

	const [addNewMovie, { data: addedMovieData }] = useAddNewMovieMutation()
	const [updateMovie, { data: editedMovieData, isSuccess: isEdited }] =
		useUpdateMovieMutation()

	const {
		data: existingMovie,
		isSuccess,
		isLoading,
	} = useGetMovieByIdQuery({ id: id ?? '' })

	const [isSure, setIsSure] = useState(false)
	const isAdded = addedMovieData?.status === 1
	const isEditedSuccess = editedMovieData?.status === 1
	const isMovieSuccess = (isAdded || isEditedSuccess) && wasEdited
	const errorCode = addedMovieData?.error?.code
	const isFormLocked = isAdded || wasEdited

	useEffect(() => {
		if (mode === 'edit' && isSuccess && existingMovie?.data) {
			setFormData({
				title: existingMovie.data.title,
				year: +existingMovie.data.year,
				format: existingMovie.data.format,
				actors: existingMovie.data.actors.map((a) => a.name),
			})
		}
	}, [mode, isSuccess, existingMovie])

	useEffect(() => {
		if (isEdited) {
			setWasEdited(true)
		}
		if (addedMovieData?.error?.code) {
			setWasFormChanged(true)
		}
	}, [isEdited, addedMovieData])

	useEffect(() => {
		setIsSure(false)
		setWasFormChanged(false)
	}, [isAdded, isEditedSuccess, formData])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}))
		const error = handleSingleFieldError(id, value)
		setFormErrors((prev) => ({ ...prev, [id]: error }))
	}

	const handleActorChange = (
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) => {
		const updated = [...formData.actors]
		updated[index] = e.target.value
		setFormData((prev) => ({ ...prev, actors: updated }))

		setFormErrors((prev) => ({
			...prev,
			actors: updated.map((_, i, arr) => handleActorsFieldError(i, arr)),
		}))
	}

	const handleAddActor = () => {
		setFormData((prev) => ({ ...prev, actors: [...prev.actors, ''] }))
	}

	const handleDeleteActor = (index: number) => {
		setFormData((prev) => ({
			...prev,
			actors: prev.actors.filter((_, i) => i !== index),
		}))
		setFormErrors((prev) => ({
			...prev,
			actors: prev.actors?.filter((_, i) => i !== index),
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

		const payload = trimFormData(formData)

		if (id && existingMovie?.data) {
			const unchanged = isEmptyData(formData, existingMovie)

			if (unchanged) return
		}

		if (mode === 'edit' && id) {
			updateMovie({ id, updatedMovie: payload }).unwrap()
		} else {
			addNewMovie(payload).unwrap()
		}
	}

	const isFormUntouchedOrSaved = () => {
		if (mode === 'create') {
			return isSure || isAdded
		}
		return isSure || isMovieSuccess || isEmptyData(formData, existingMovie)
	}

	const handleNavigate = () => {
		if (isFormUntouchedOrSaved()) {
			navigate(ROUTES.HOME)
		} else {
			setIsSure(true)
		}
	}

	const handleEdit = () => {
		setIsSure(false)
		setWasEdited(false)
	}

	return {
		isSure,
		isAdded,
		formData,
		errorCode,
		wasEdited,
		isLoading,
		formErrors,
		isFormLocked,
		existingMovie,
		wasFormChanged,
		addedMovieData,
		isEditedSuccess,
		handleEdit,
		handleChange,
		handleSubmit,
		handleNavigate,
		handleAddActor,
		handleActorChange,
		handleDeleteActor,
	}
}
