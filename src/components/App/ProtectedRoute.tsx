import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import type { JSX } from 'react'

interface ProtectedRouteProps {
	isAuth: boolean
	children: JSX.Element
}

const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
	if (!isAuth) {
		return <Navigate to={ROUTES.LOGIN} replace />
	}
	return children
}

export default ProtectedRoute
