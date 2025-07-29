import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import type { ILogin, ISignUp } from '../../interfaces/user'
import { API_ENDPOINTS } from '../../shared/constants'

interface FieldError {
	[key: string]: string
}

interface CustomError {
	code: string
	fields?: FieldError
}

export interface APIError {
	error: CustomError
	status: number
}

interface LoginResponse {
	token: string
	status: number
}

interface State {
	error: APIError | null
	currentUser: LoginResponse
}

const initialState: State = {
	error: null,
	currentUser: {
		status: 0,
		token: '',
	},
}

export const createUser = createAsyncThunk<
	LoginResponse,
	ISignUp,
	{ rejectValue: APIError }
>('user/createUser', async (payload, thunkAPI) => {
	try {
		const response = await axios.post<LoginResponse>(
			API_ENDPOINTS.signup,
			payload
		)
		localStorage.setItem('userName', JSON.stringify(payload.email))
		return response.data
	} catch (err: any) {
		const error: APIError = err.response?.data || {
			status: err.response?.status || 500,
			error: { code: 'UNKNOWN_ERROR' },
		}
		return thunkAPI.rejectWithValue(error)
	}
})

export const loginUser = createAsyncThunk<
	LoginResponse,
	ILogin,
	{ rejectValue: APIError }
>('user/loginUser', async (payload, thunkAPI) => {
	try {
		const response = await axios.post<LoginResponse>(
			API_ENDPOINTS.signin,
			payload
		)
		localStorage.setItem('userName', JSON.stringify(payload.email))

		return response.data
	} catch (err: any) {
		const error: APIError = err.response?.data || {
			status: err.response?.status || 500,
			error: { code: 'UNKNOWN_ERROR' },
		}
		return thunkAPI.rejectWithValue(error)
	}
})

const addCurrentUser = (
	state: State,
	action: PayloadAction<LoginResponse | APIError>
) => {
	if ('error' in action.payload) {
		localStorage.setItem('token', '')
		state.currentUser = { status: 0, token: '' }
		state.error = action.payload
	} else {
		localStorage.setItem('token', action.payload.token)
		state.currentUser = action.payload
		state.error = null
	}
}

const addError = (state: State, action: PayloadAction<APIError>) => {
	localStorage.setItem('token', '')
	state.currentUser = {
		status: 0,
		token: '',
	}
	state.error = action.payload
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
			localStorage.removeItem('userName')
		},
		login: (state) => {
			const token = localStorage.getItem('token')
			state.currentUser = {
				status: token ? 1 : 0,
				token: token || '',
			}
		},
		setNoError: (state) => {
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, addCurrentUser)
		builder.addCase(loginUser.rejected, (state, action) => {
			if (action.payload) {
				addError(state, { payload: action.payload, type: action.type })
			}
		})

		builder.addCase(createUser.fulfilled, addCurrentUser)
		builder.addCase(createUser.rejected, (state, action) => {
			if (action.payload) {
				addError(state, { payload: action.payload, type: action.type })
			}
		})
	},
})

export const { logout, login, setNoError } = userSlice.actions
export default userSlice.reducer
