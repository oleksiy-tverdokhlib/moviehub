import type { ChangeEvent } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps {
	label: string
	isAuthForm?: boolean
	type?: string
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	error?: string
	disabled?: boolean
}

const TextInput = ({
	label,
	value,
	isAuthForm,
	onChange,
	error,
	disabled,
}: TextInputProps) => {
	const id = label?.toLowerCase()
	const isInt = Number.isInteger(+label)

	return (
		<>
			{disabled ? (
				<span className="span">
					{!isInt && `${label}: `} {value}
				</span>
			) : (
				<div className={styles.inputField}>
					{!isInt && (
						<label htmlFor={id}>
							{label != 'search' && <span>{label}:</span>}
						</label>
					)}

					<input
						id={id}
						type="text"
						value={value}
						onChange={onChange}
						placeholder={`${isAuthForm ? 'Your' : 'Movie'} ${
							isInt ? 'actor' : id
						}`}
					/>

					{error && <div className={styles.errorMessage}>{error}</div>}
				</div>
			)}
		</>
	)
}

export default TextInput
