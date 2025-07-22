import type { Dispatch, SetStateAction } from 'react'
import type { OrderMode, SearchMode } from '../utils/constants'

export interface MovieData {
	title: string
	year: number
	format: string
	actors: string[]
}

export interface Actor {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}
export interface Movie {
	id: number
	title: string
	year: number
	format: 'VHS' | 'DVD' | 'Blu-Ray'
	actors: Actor[]
	createdAt: string
	updatedAt: string
}
export interface Status {
	status: number
}

export interface MovieResponse {
	data: Movie
	status: Status
}

export interface MovieListResponse {
	data: Movie[]
	status: Status
}

export interface AuthStatus {
	isAuth: number
}

export interface SearchParams {
	actor: string
	title: string
	search: string
	sort: 'id' | 'title' | 'year'
	order: 'ASC' | 'DESC'
	limit: number
	offset: number
}

export interface MovieModeProps {
	mode: 'edit' | 'create'
}

export interface RadioFilterProps {
	value: SearchMode
	onChange: (value: SearchMode | OrderMode) => void
	mode: 'search' | 'order' | 'sort'
	type: string
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
	setSearchInput?: Dispatch<SetStateAction<string>>
}

export interface MoviesErrors {
	title?: string
	year?: string
	format?: string
	actors?: string[]
}
