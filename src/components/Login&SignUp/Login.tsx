import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../features/store'
import { loginUser } from '../../features/user/userSlice'
import styles from './Login&SignUp.module.css'
import TextInput from '../TextInput/TextInput'

export interface ILogin {
	email: string
	password: string
}

function Login() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const [data, setData] = useState<ILogin>({
		email: 'petro@gmail.com',
		password: 'super-password',
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = event.target.id
		const value = event.target.value
		setData({ ...data, [id]: value })
	}

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (data.email == '' || data.password == '') {
			alert('Please fill all the fields')
			return
		}
		dispatch(loginUser(data))
		localStorage.setItem('userName', JSON.stringify(data.email))
		setData({ email: '', password: '' })
	}

	return (
		<div className={styles.loginContainer}>
			<form onSubmit={handleFormSubmit} className={styles.loginForm}>
				<h3>Sign In to MoviesHub</h3>

				<div className={styles.loginField}>
					<TextInput
						id="email"
						label="Email"
						type="email"
						value={data.email}
						onChange={handleInputChange}
					/>
				</div>

				<div className={styles.loginField}>
					<TextInput
						id="password"
						label="Password"
						type="password"
						value={data.password}
						onChange={handleInputChange}
					/>
				</div>

				<button type="submit" className={styles.submitBtn}>
					Log In
				</button>
			</form>
		</div>
	)
}

export default Login
