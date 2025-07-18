import { useAuthForm } from '../../utils/useAuthForm'
import TextInput from '../TextInput/TextInput'
import styles from './Login&SignUp.module.css'

interface Props {
	mode: 'login' | 'signup'
}

export interface AuthField {
	id: keyof IFormData
	label: string
	type: string
}

export interface ILogin {
	email: string
	password: string
}

export interface ISignUp extends ILogin {
	name: string
	confirmPassword: string
}

export interface IFormData {
	email: string
	password: string
	name?: string
	confirmPassword?: string
}

const loginFields: AuthField[] = [
	{ id: 'email', label: 'Email', type: 'email' },
	{ id: 'password', label: 'Password', type: 'password' },
]

const signUpFields: AuthField[] = [
	{ id: 'email', label: 'Email', type: 'email' },
	{ id: 'name', label: 'Name', type: 'text' },
	{ id: 'password', label: 'Password', type: 'password' },
	{ id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
]

const AuthForm = ({ mode }: Props) => {
	const fields = mode === 'login' ? loginFields : signUpFields

	const { data, handleChange, handleSubmit } = useAuthForm(mode)

	return (
		<div className={styles.loginContainer}>
			<form
				onSubmit={(e) => handleSubmit(e, fields)}
				className={styles.loginForm}
			>
				<h3>{mode === 'login' ? 'Sign In to MoviesHub' : 'Sign Up'}</h3>
				{fields.map(({ id, label, type }) => (
					<TextInput
						key={id}
						id={id}
						label={label}
						type={type}
						value={data[id] ?? ''}
						onChange={handleChange}
					/>
				))}
				<button type="submit" className={styles.submitBtn}>
					{mode === 'login' ? 'Log In' : 'Sign Up'}
				</button>
			</form>
		</div>
	)
}
export default AuthForm
