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
			<div key={index}>
				<input type="text" value={actor} onChange={(e) => onChange(index, e)} />
				{onDelete && <button onClick={() => onDelete(index)}>X</button>}
			</div>
		))}
		{onAdd && <button onClick={onAdd}>Add Actor</button>}
	</>
)

export default ActorList
