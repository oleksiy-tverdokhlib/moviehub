import type { ChangeEvent } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps {
	id?: string
	label?: string
	type?: string
	value: string | number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	error?: string
}

const TextInput = ({
	id,
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
	error,
}: TextInputProps) => (
	<div className={styles.inputField}>
		<label htmlFor={id}>{label && <span>{label}:</span>}</label>
		<input
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
		{error && <div className={styles.errorMessage}>{error}</div>}
	</div>
)

export default TextInput
