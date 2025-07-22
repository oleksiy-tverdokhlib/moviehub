import type { MovieData, MoviesErrors } from '../types/moviesTypes'
import { FORMAT } from './constants'

export const containsNumsSymbs = (str: string) => {
	return /[^a-zA-Z\s'`]/.test(str)
}

export const handleError = (actor: string): string | undefined => {
	return containsNumsSymbs(actor)
		? 'Mustn’t contain numbers or symbols'
		: undefined
}

export const handleMoviesFormErrors = (formData: MovieData): MoviesErrors => {
	const errors: MoviesErrors = {
		title: undefined,
		year: undefined,
		format: undefined,
		actors: undefined,
	}

	// Title validation
	if (formData.title.length === 0) {
		errors.title = 'Title is required'
	} else if (formData.title.length === 1) {
		errors.title = 'Title length must be ≥ 2 letters'
	}

	// Year validation
	if (formData.year < 1900 || formData.year > 2020) {
		errors.year = `Year must be between 1900 and ${2020}`
	}

	// Format validation
	if (!FORMAT.includes(formData.format)) {
		errors.format = `Format must be ${FORMAT.join(' or ')}`
	}

	// Actors validation

	errors.actors = formData.actors.map((actor) => handleError(actor) || '')

	const isEveryItemEmpty = errors.actors.every((e) => e === '')

	if (isEveryItemEmpty) {
		errors.actors = undefined
	}

	return errors
}
