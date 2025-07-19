import TextInput from '../TextInput/TextInput'

interface Props {
	actors: string[]
	onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
	onAdd?: () => void
	onDelete?: (index: number) => void
}

const ActorList = ({ actors, onChange, onAdd, onDelete }: Props) => (
	<>
		<strong>Actors:</strong>
		{actors.map((actor, index) => (
			<div
				key={index}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '5px',
					width: '100%',
				}}
			>
				<TextInput
					type="text"
					value={actor}
					id={`${index}`}
					onChange={(e) => onChange(index, e)}
				/>
				{onDelete && (
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault()
							onDelete(index)
						}}
					>
						X
					</button>
				)}
			</div>
		))}
		{onAdd && (
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault()
					onAdd()
				}}
			>
				Add Actor
			</button>
		)}
	</>
)

export default ActorList
