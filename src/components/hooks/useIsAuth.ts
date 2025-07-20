import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../features/store'
import { useEffect } from 'react'
import { login } from '../../features/user/userSlice'
import { ROUTES } from '../../utils/constants'

export const useIsAuth = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const isAuth = useAppSelector((state) => state.user.currentUser?.status)

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (token && !isAuth) {
			dispatch(login())
		}
		navigate(ROUTES.HOME)
	}, [isAuth])

	return isAuth
}
