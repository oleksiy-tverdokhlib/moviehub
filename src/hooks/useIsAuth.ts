import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../features/store'
import { login } from '../features/user/userSlice'
import { ROUTES } from '../shared/constants'

export const useIsAuth = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const token = localStorage.getItem('token')
	const isAuth = useAppSelector((state) => state.user.currentUser?.status)

	useEffect(() => {
		if (!!token && !!isAuth) {
			navigate(ROUTES.HOME)
			return
		} else if (token && !isAuth) {
			dispatch(login())
		} else {
			navigate(ROUTES.LOGIN)
			return
		}
		navigate(ROUTES.HOME)
	}, [isAuth, token])

	return isAuth
}
