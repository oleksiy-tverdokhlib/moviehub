import styles from './TextInput.module.css'

interface Props {
	id?: string
	label?: string
	type?: string
	value: string | number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
}

const TextInput = ({
	id,
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
}: Props) => (
	<div className={styles.inputField}>
		<label>
			{label && <span>{label}:</span>}
			<input
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</label>
	</div>
)

export default TextInput
