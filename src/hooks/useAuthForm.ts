import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAppDispatch } from '../features/store'
import { createUser, loginUser, setNoError } from '../features/user/userSlice'
import type {
	AuthModeProps,
	IFormData,
	ILogin,
	ISignUp,
} from '../interfaces/user'

const initialData: IFormData = {
	email: '',
	password: '',
	name: '',
	confirmPassword: '',
}

export const useAuthForm = ({ mode }: AuthModeProps) => {
	const dispatch = useAppDispatch()

	const [data, setData] = useState<IFormData>(initialData)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setNoError())
		const { id, value } = e.target
		setData((prev) => ({ ...prev, [id]: value }))
	}

	const handleSubmit = (
		e: FormEvent<HTMLFormElement>,
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
		}
		setData(initialData)
	}

	useEffect(() => {
		dispatch(setNoError())
		setData(initialData)
	}, [mode])

	return { data, handleChange, handleSubmit }
}
