import { useEffect, type JSX } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer.tsx/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import AuthForm from './components/Login&SignUp/AuthForm'
import MovieDataForm from './components/Movies/MovieDataForm'
import { useAppDispatch, useAppSelector } from './features/store'
import { login } from './features/user/userSlice'

interface ProtectedRouteProps {
	isAuth: boolean
	children: JSX.Element
}

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
	if (!isAuth) {
		return <Navigate to="/login" replace />
	}
	return children
}

function App() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const isAuth = useAppSelector((state) => state.user.currentUser?.status)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token && !isAuth) {
			dispatch(login())
		}
		navigate('/')
	}, [isAuth])

	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/login" element={<AuthForm type="login" />} />
					<Route path="/signup" element={<AuthForm type="signup" />} />
					{/* Protected Routes */}
					<Route
						path="/movies/:id"
						element={
							<ProtectedRoute isAuth={!!isAuth}>
								<MovieDataForm mode={'edit'} />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/create"
						element={
							<ProtectedRoute isAuth={!!isAuth}>
								<MovieDataForm mode={'create'} />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/"
						element={
							<ProtectedRoute isAuth={!!isAuth}>
								<Home />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
			<Footer />
		</>
	)
}

export default App
