import { Route, Routes } from 'react-router-dom'
import type { AuthStatus } from '../../interfaces/movies'
import { ROUTES } from '../../shared/constants'
import Home from '../Home/Home'
import AuthForm from '../Login&SignUp/AuthForm'
import MovieDataForm from '../Movies/MovieDataForm'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = ({ isAuth }: AuthStatus) => {
	const isAuthenticated = !!isAuth

	return (
		<Routes>
			<Route path={ROUTES.LOGIN} element={<AuthForm mode="login" />} />
			<Route path={ROUTES.SIGNUP} element={<AuthForm mode="signup" />} />

			<Route
				path={`${ROUTES.MOVIE}/:id`}
				element={
					<ProtectedRoute isAuth={isAuthenticated}>
						<MovieDataForm mode={'edit'} />
					</ProtectedRoute>
				}
			/>
			<Route
				path={ROUTES.CREATE}
				element={
					<ProtectedRoute isAuth={isAuthenticated}>
						<MovieDataForm mode={'create'} />
					</ProtectedRoute>
				}
			/>

			<Route
				path={ROUTES.HOME}
				element={
					<ProtectedRoute isAuth={isAuthenticated}>
						<Home />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<div>Wrong url. Redirecting...</div>} />
		</Routes>
	)
}

export default AppRoutes
