import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../features/store'
import { logout } from '../../features/user/userSlice'
import type { AuthStatus } from '../../interfaces/movies'
import Icon from '../common/Icon/Icon'
import styles from './Header.module.css'

const Header = ({ isAuth }: AuthStatus) => {
	const dispatch = useAppDispatch()

	const userName = localStorage.getItem('userName')
	const parsedName = userName && JSON.parse(userName)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link to="/" title="Main page">
					<h2 className={styles.logo}>MovieHub</h2>
				</Link>
				<div className={styles.currentUser}>
					{!isAuth && (
						<>
							<Link to="/login">login</Link>
							<Link to="/signup">sign up</Link>
						</>
					)}

					{!!isAuth && (
						<div className={styles.logout}>
							<span className={styles.username}> {parsedName}</span>
							<span className={styles.logoutBtn} onClick={handleLogout}>
								<span>Logout</span>
								<Icon id="logout" />
							</span>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
