import type { Dispatch, SetStateAction } from 'react'
import type { OrderMode, SearchMode } from '../shared/constants'

export interface MovieData {
	title: string
	year: string | number
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
	status: 0 | 1
	error?: { code: number; message: string }
}

export interface MovieListResponse {
	data: Movie[]
	meta: {
		total: number
	}
	status: Status
}

export interface AuthStatus {
	isAuth: number
}

export interface MovieModeProps {
	mode: 'edit' | 'create'
}

export interface MoviesErrors {
	title?: string
	year?: string
	format?: string
	actors?: string[]
}

export interface MovieImportResponse {
	data?: Movie[]
	meta?: {
		imported: number
		total: number
	}
	error?: { code: number; message: string }
	status: 1 | 0
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

export interface RadioFilterProps {
	value: SearchMode
	onChange: (value: SearchMode | OrderMode) => void
	mode: 'search' | 'order' | 'sort'
	type: string
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
	setSearchInput?: Dispatch<SetStateAction<string>>
}

export interface PaginationProps {
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
	totalItems: number
}

export interface SearchParamsProps {
	mode: SearchMode
	searchInput: string
	setSearchInput: Dispatch<SetStateAction<string>>
	setSearchParams: Dispatch<SetStateAction<SearchParams>>
}
