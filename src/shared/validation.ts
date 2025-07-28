import { initialData } from '../hooks/useMovieForm'
import type {
	MovieData,
	MovieResponse,
	MoviesErrors,
} from '../interfaces/movies'
import { FORMAT } from './constants'

const YEAR_RANGE = { MIN: 1900, MAX: 2020 } as const
const MIN_LENGTH = 2

const NUMS_SYMBOLS_REGEX = /[^a-zA-Z'\s-.]/
const ONLY_SPACES_REGEX = /^\s+$/

export const containsNumsSymbs = (str: string): boolean =>
	NUMS_SYMBOLS_REGEX.test(str)

export const containsOnlySpaces = (str: string): boolean =>
	str.length > 0 && ONLY_SPACES_REGEX.test(str)

const validateTitle = (title: string): string | undefined => {
	if (!title.length) return 'Title is required'
	if (title.trim().length === 1) return 'Title length must be ≥ 2 letters'
	if (containsOnlySpaces(title)) return 'Title cannot be only spaces'
	return undefined
}

const validateYear = (year: string | number): string | undefined => {
	if (!year) return 'Year is required'
	const numYear = +year
	if (numYear < YEAR_RANGE.MIN || numYear > YEAR_RANGE.MAX) {
		return `Year must be between ${YEAR_RANGE.MIN} and ${YEAR_RANGE.MAX}`
	}
	return undefined
}

const validateFormat = (format: string): string | undefined => {
	if (!format) return 'Format is required'
	if (!FORMAT.includes(format)) {
		return `Format must be ${FORMAT.join(' or ')}`
	}
	return undefined
}

const validateActor = (actor: string, allActors: string[]): string => {
	if (actor.trim() === '') return 'Actor field is empty'
	if (containsNumsSymbs(actor)) return 'Must not contain numbers or symbols'
	if (containsOnlySpaces(actor)) return 'Actor name cannot be only spaces'
	if (actor.trim().length < MIN_LENGTH)
		return 'Actor name must be atleast 2 chars'

	// Перевірка дублікатів
	const nonEmptyActors = allActors.filter((a) => a !== '')
	if (nonEmptyActors.filter((a) => a === actor).length > 1) {
		return 'There is already such an actor'
	}

	return ''
}

export const handleMoviesFormErrors = (formData: MovieData): MoviesErrors => {
	const errors: MoviesErrors = {
		title: validateTitle(formData.title),
		year: validateYear(formData.year),
		format: validateFormat(formData.format),
		actors: formData.actors.map((actor) =>
			validateActor(actor, formData.actors)
		),
	}

	if (errors.actors?.every((error) => error === '')) {
		errors.actors = undefined
	}

	return errors
}

export const trimFormData = (data: MovieData): MovieData => ({
	...data,
	title: data.title.trim(),
	format: data.format.trim(),
	actors: data.actors.filter(Boolean).map((actor) => actor.trim()),
})

export const handleSingleFieldError = (
	id: string,
	value: any
): string | undefined => {
	switch (id) {
		case 'title':
			return value ? validateTitle(value) : ''

		case 'year':
			if (!value) return ''
			if (isNaN(value)) return 'Year must be a number'
			return validateYear(value) || undefined

		case 'format':
			return value?.trim() ? validateFormat(value) : 'Format is required'

		default:
			return undefined
	}
}

export const handleActorsFieldError = (
	index: number,
	array: string[]
): string => {
	return validateActor(array[index], array)
}

export const isEmptyData = (
	formData: MovieData,
	existingMovie?: MovieResponse
): boolean => {
	if (existingMovie?.data) {
		const { title, year, format, actors } = existingMovie.data
		return (
			formData.title === title &&
			+formData.year === year &&
			formData.format === format &&
			JSON.stringify(formData.actors) ===
				JSON.stringify(actors.map((a) => a.name))
		)
	}

	return JSON.stringify(formData) === JSON.stringify(initialData)
}
