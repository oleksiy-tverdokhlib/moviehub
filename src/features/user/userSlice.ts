import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import type { ILogin, ISignUp } from '../../types/user'

interface LoginResponse {
	token: string
	status: number
}

interface State {
	currentUser: LoginResponse
}

const initialState: State = {
	currentUser: {
		status: 0,
		token: '',
	},
}

export const createUser = createAsyncThunk<LoginResponse, ISignUp>(
	'users/createUser',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.post<LoginResponse>(`${BASE_URL}/users`, payload)
			return res.data
		} catch (err: any) {
			console.error(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const loginUser = createAsyncThunk<LoginResponse, ILogin>(
	'users/loginUser',
	async (payload, thunkAPI) => {
		try {
			const res = await axios.post<LoginResponse>(
				`${BASE_URL}/sessions`,
				payload
			)
			return res.data
		} catch (err: any) {
			console.error(err)
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const addCurrentUser = (state: State, action: PayloadAction<LoginResponse>) => {
	state.currentUser = action.payload
	localStorage.setItem('token', action.payload.token)
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.currentUser = {
				status: 0,
				token: '',
			}
			localStorage.setItem('token', '')
		},
		login: (state) => {
			const token = localStorage.getItem('token')
			state.currentUser = {
				status: token ? 1 : 0,
				token: token || '',
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, addCurrentUser)
	},
})

export const { logout, login } = userSlice.actions

export default userSlice.reducer
