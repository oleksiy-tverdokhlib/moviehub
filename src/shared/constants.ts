const BASE_API_URL = import.meta.env.VITE_MOVIES_BASE_API_URL

export const API_ENDPOINTS = {
	signup: `${BASE_API_URL}/users`,
	signin: `${BASE_API_URL}/sessions`,
	movies: `${BASE_API_URL}/movies`,
}

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	SIGNUP: '/signup',
	EDIT: '/edit',
	CREATE: '/create',
	MOVIE: '/movies',
}

export const MOVIES_PER_PAGES = 10
export const DELAY = 700

export const SEARCH_MODES = ['actor', 'title', 'search']
export const ORDER_MODES = ['ASC', 'DESC']
export const SORT_MODES = ['title', 'year']
export const FORMAT = ['VHS', 'DVD', 'Blu-Ray']

export type SearchMode = (typeof SEARCH_MODES)[number]
export type OrderMode = (typeof ORDER_MODES)[number]
export type SortMode = (typeof SORT_MODES)[number]
