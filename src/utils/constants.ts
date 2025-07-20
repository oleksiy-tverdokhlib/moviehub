export const BASE_URL = 'http://localhost:8000/api/v1'

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	SIGNUP: '/signup',
	EDIT: '/edit',
	CREATE: '/create',
	MOVIE: '/movies',
}

export const DELAY = 700

export const SEARCH_MODES = ['actor', 'title', 'search']
export const ORDER_MODES = ['ASC', 'DESC']
export const SORT_MODES = ['title', 'year']

export type SearchMode = (typeof SEARCH_MODES)[number]
export type OrderMode = (typeof ORDER_MODES)[number]
export type SortMode = (typeof SORT_MODES)[number]
