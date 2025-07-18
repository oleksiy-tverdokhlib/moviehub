import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import type { RootState } from '../store'

export interface Movie {
	id: number
	title: string
	year: number
	format: 'VHS' | 'DVD' | 'Blu-Ray' | string
	createdAt: string
	updatedAt: string
}

export interface MoviesResponse {
	data: Movie[]
	meta: {
		total: number
	}
	status: number
}

export interface CounterState {
	value: number
	moviesList: Movie[] | null
}

// export const getMoviesList = createAsyncThunk<
// 	Movie[],
// 	void,
// 	{ state: RootState }
// >('movies/getMoviesList', async (_, thunkAPI) => {
// 	const state = thunkAPI.getState()
// 	const token = state.user.currentUser.token

// 	if (!token) {
// 		return thunkAPI.rejectWithValue('No token provided')
// 	}

// 	try {
// 		const res = await axios.get<MoviesResponse>(
// 			`${BASE_URL}/movies?sort=year&order=DESC&limit=10&offset=0`,
// 			{
// 				headers: {
// 					Authorization: `${token}`,
// 				},
// 			}
// 		)
// 		return res.data.data
// 	} catch (err: any) {
// 		console.error(err)
// 		return thunkAPI.rejectWithValue(
// 			err.response?.data?.message || 'Failed to fetch movies'
// 		)
// 	}
// })

// export const addMovies = createAsyncThunk<Movie[], File, { state: RootState }>(
// 	'movies/addMovies',
// 	async (file, thunkAPI) => {
// 		const state = thunkAPI.getState()
// 		const token = state.user.currentUser?.token

// 		if (!token) {
// 			return thunkAPI.rejectWithValue('No token provided')
// 		}

// 		const formData = new FormData()
// 		formData.append('movies', file)

// 		try {
// 			const res = await axios.post<MoviesResponse>(
// 				`${BASE_URL}/movies/import`,
// 				formData,
// 				{
// 					headers: {
// 						Authorization: `${token}`,
// 					},
// 				}
// 			)
// 			return res.data.data
// 		} catch (err: any) {
// 			console.error(err)
// 			return thunkAPI.rejectWithValue(err.response?.data || err.message)
// 		}
// 	}
// )

const initialState: CounterState = {
	value: 0,
	moviesList: null,
}

// const addMoviesList = (state: CounterState, action: PayloadAction<Movie[]>) => {
// 	state.moviesList = action.payload
// }

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getMoviesList.fulfilled, (state, action) => {
	// 			state.moviesList = action.payload
	// 		})
	// 		.addCase(addMovies.fulfilled, (state, action) => {
	// 			state.moviesList = action.payload // оновлюємо список фільмів після імпорту
	// 		})
	// },
})

export const { incrementByAmount } = moviesSlice.actions

export default moviesSlice.reducer
