import { configureStore } from '@reduxjs/toolkit'
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux'
import { movieApi } from './movies/movies'
import userSlice from './user/userSlice'

export const store = configureStore({
	reducer: {
		user: userSlice,
		[movieApi.reducerPath]: movieApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(movieApi.middleware),
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
