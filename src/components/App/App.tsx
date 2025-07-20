import { useIsAuth } from '../../utils/useIsAuth'
import Footer from '../Footer.tsx/Footer'
import Header from '../Header/Header'
import './App.css'
import AppRoutes from './AppRoutes'

function App() {
	const isAuth = useIsAuth()

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
