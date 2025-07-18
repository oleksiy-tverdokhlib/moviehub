interface Props {
	id: string
	label?: string
	type?: string
	value: string | number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({ id, label, type = 'text', value, onChange }: Props) => (
	<label style={{ display: 'flex', flexDirection: 'column' }}>
		{label && <span>{label}:</span>}
		<input id={id} type={type} value={value} onChange={onChange} />
	</label>
)

export default TextInput
