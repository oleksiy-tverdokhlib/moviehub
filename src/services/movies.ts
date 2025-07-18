import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MovieData } from '../components/Movies/MovieForm'
import type { RootState } from '../features/store'
import { BASE_URL } from '../utils/constants'

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
	format: string
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

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).user.currentUser.token
			if (token) {
				headers.set('Authorization', token)
			}
			return headers
		},
	}),
	tagTypes: ['Movie'],
	endpoints: (build) => ({
		getMoviesList: build.query<MoviesListResponse, void>({
			query: () => `/movies?sort=year&order=DESC&limit=10&offset=0`,
			providesTags: (result) => [{ type: 'Movie', id: 'LIST' }],
		}),

		getMovieById: build.query<MovieResponse, { id: string }>({
			query: ({ id }) => `movies/${id}`,
			providesTags: (result, error, { id }) => [{ type: 'Movie', id }],
		}),

		deleteMovieById: build.mutation<Status, { id: string }>({
			query: ({ id }) => ({
				url: `movies/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Movie', id: 'LIST' },
			],
		}),

		updateMovie: build.mutation<
			MovieResponse,
			{ id: string; updatedMovie: MovieData }
		>({
			query: ({ id, updatedMovie }) => ({
				url: `movies/${id}`,
				method: 'PATCH',
				body: updatedMovie,
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Movie', id },
				{ type: 'Movie', id: 'LIST' },
			],
		}),

		addNewMovie: build.mutation<MovieResponse, MovieData>({
			query: (movie) => ({
				url: `movies`,
				method: 'POST',
				body: movie,
			}),
			invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
		}),

		importMovies: build.mutation<Movie[], File>({
			query: (file) => {
				const formData = new FormData()
				formData.append('movies', file)

				return {
					url: `movies/import`,
					method: 'POST',
					body: formData,
				}
			},
			invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
		}),
	}),
})

export const {
	useGetMovieByIdQuery,
	useDeleteMovieByIdMutation,
	useUpdateMovieMutation,
	useAddNewMovieMutation,
	useGetMoviesListQuery,
	useImportMoviesMutation,
} = movieApi
