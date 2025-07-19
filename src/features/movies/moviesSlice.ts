import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

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

const initialState: CounterState = {
	value: 0,
	moviesList: null,
}

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
})

export const { incrementByAmount } = moviesSlice.actions

export default moviesSlice.reducer
