import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'
import Footer from '../Footer.tsx/Footer'
import Header from '../Header/Header'
import { useAppDispatch, useAppSelector } from '../../features/store'
import { login } from '../../features/user/userSlice'
import { ROUTES } from '../../utils/constants'

function App() {
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

	return (
		<>
			<Header isAuth={isAuth} />
			<div className="container">
				<AppRoutes isAuth={isAuth} />
			</div>
			<Footer />
		</>
	)
}

export default App
