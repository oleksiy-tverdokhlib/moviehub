import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'
import type {
	Movie,
	MovieData,
	MovieListResponse,
	MovieResponse,
	Status,
} from '../../types/moviesTypes'
import { API_ENDPOINTS } from '../../utils/constants'

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_ENDPOINTS.movies,
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
		getMoviesList: build.query<MovieListResponse, { searchString: string }>({
			query: ({ searchString }) => `?${searchString}`,
			providesTags: () => [{ type: 'Movie', id: 'LIST' }],
		}),

		getMovieById: build.query<MovieResponse, { id: string }>({
			query: ({ id }) => `/${id}`,
			providesTags: (_result, _error, { id }) => [{ type: 'Movie', id }],
		}),

		deleteMovieById: build.mutation<Status, { id: string }>({
			query: ({ id }) => ({
				url: `/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => [{ type: 'Movie', id: 'LIST' }],
		}),

		updateMovie: build.mutation<
			MovieResponse,
			{ id: string; updatedMovie: MovieData }
		>({
			query: ({ id, updatedMovie }) => ({
				url: `/${id}`,
				method: 'PATCH',
				body: updatedMovie,
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: 'Movie', id },
				{ type: 'Movie', id: 'LIST' },
			],
		}),

		addNewMovie: build.mutation<MovieResponse, MovieData>({
			query: (movie) => ({
				url: ``,
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
					url: `/import`,
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
