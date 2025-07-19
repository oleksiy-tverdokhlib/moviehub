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
