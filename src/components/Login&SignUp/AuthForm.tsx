import { useSelector } from 'react-redux'
import type { AuthModeProps, IFormData } from '../../types/userTypes'
import { useAuthForm } from '../../hooks/useAuthForm'
import TextInput from '../../common/TextInput/TextInput'
import styles from './Login&SignUp.module.css'
import type { RootState } from '../../features/store'

interface AuthField {
	id: keyof IFormData
	label: string
	type: string
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

const AuthForm = ({ mode }: AuthModeProps) => {
	const fields = mode === 'login' ? loginFields : signUpFields
	const { data, handleChange, handleSubmit } = useAuthForm({ mode })
	const { error } = useSelector((state: RootState) => state.user)

	return (
		<div className={styles.loginContainer}>
			<form
				onSubmit={(e) => handleSubmit(e, fields)}
				className={styles.loginForm}
			>
				<h3>{mode === 'login' ? 'Sign In to MoviesHub' : 'Sign Up'}</h3>

				{error?.error && (
					<div className={styles.errorMessage}>
						<p>{error?.error.code}</p>
						<p>Wrong field values. Try again</p>
					</div>
				)}

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
