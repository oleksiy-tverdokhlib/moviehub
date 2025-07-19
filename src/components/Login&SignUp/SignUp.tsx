// import { useState } from 'react'
// import { useAppDispatch } from '../../features/store'
// import type { ILogin } from './Login'
// import { createUser } from '../../features/user/userSlice'
// import { useNavigate } from 'react-router-dom'
// import styles from './Login&SignUp.module.css'
// import TextInput from '../TextInput/TextInput'

// export interface ISignUp extends ILogin {
// 	name: string
// 	confirmPassword: string
// }

// const initialData: ISignUp = {
// 	email: '',
// 	name: '',
// 	password: '',
// 	confirmPassword: '',
// }

// const SignUp = () => {
// 	const dispatch = useAppDispatch()
// 	const navigate = useNavigate()
// 	const [data, setData] = useState<ISignUp>(initialData)

// 	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const id = event.target.id
// 		const value = event.target.value
// 		setData({ ...data, [id]: value })
// 	}

// 	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault()
// 		const { email, password, confirmPassword } = data

// 		if (email == '' || password == '') {
// 			alert('Please fill all the field')
// 			return
// 		} else if (confirmPassword !== password) {
// 			alert(`Your passwords don't match`)
// 			return
// 		}
// 		dispatch(createUser(data))
// 		setData(initialData)
// 		navigate('/')
// 	}

// 	return (
// 		<div className={styles.signupContainer}>
// 			<form onSubmit={handleFormSubmit} className={styles.loginForm}>
// 				<h3>Sign Up</h3>
// 				<TextInput
// 					id="email"
// 					label="Email"
// 					type="email"
// 					value={data.email}
// 					onChange={handleInputChange}
// 				/>
// 				<TextInput
// 					id="name"
// 					label="Name"
// 					type="text"
// 					value={data.name}
// 					onChange={handleInputChange}
// 				/>
// 				<TextInput
// 					id="password"
// 					label="Password"
// 					type="password"
// 					value={data.password}
// 					onChange={handleInputChange}
// 				/>
// 				<TextInput
// 					id="confirmPassword"
// 					label="Confirm Password"
// 					type="password"
// 					value={data.confirmPassword}
// 					onChange={handleInputChange}
// 				/>

// 				<button type="submit" className={styles.submitBtn}>
// 					Sign up
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

// export default SignUp
