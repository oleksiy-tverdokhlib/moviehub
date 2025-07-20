import { useState } from 'react'
import { useAppDispatch } from '../features/store'
import { createUser, loginUser } from '../features/user/userSlice'
import type { IFormData, ILogin, ISignUp } from '../types/userTypes'
import { ROUTES } from '../utils/constants'
import type { AuthModeProps } from '../components/Login&SignUp/AuthForm'
import { useNavigate } from 'react-router-dom'

const initialData: IFormData = {
	email: '',
	password: '',
	name: '',
	confirmPassword: '',
}

export const useAuthForm = ({ mode }: AuthModeProps) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [data, setData] = useState<IFormData>(initialData)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setData((prev) => ({ ...prev, [id]: value }))
	}

	const handleSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		fields: { id: keyof IFormData }[]
	) => {
		e.preventDefault()

		if (fields.some(({ id }) => !data[id])) {
			alert('Please fill all the fields')
			return
		}

		if (mode === 'signup') {
			if (data.password !== data.confirmPassword) {
				alert(`Passwords don't match`)
				return
			}
			dispatch(createUser(data as ISignUp))
		} else {
			dispatch(loginUser(data as ILogin))
			localStorage.setItem('userName', JSON.stringify(data.email))
		}

		setData(initialData)
		navigate(ROUTES.HOME)
	}

	return { data, handleChange, handleSubmit }
}
