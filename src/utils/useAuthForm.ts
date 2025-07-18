import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../features/store'
import type { IFormData, ILogin, ISignUp } from '../components/Login&SignUp/AuthForm'
import { createUser, loginUser } from '../features/user/userSlice'
import { ROUTES } from './constants'


export const useAuthForm = (type: 'login' | 'signup') => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const initialData: IFormData = {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    }

    const [data, setData] = useState<IFormData>(initialData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, fields: { id: keyof IFormData }[]) => {
        e.preventDefault()

        if (fields.some(({ id }) => !data[id])) {
            alert('Please fill all the fields')
            return
        }

        if (type === 'signup') {
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
