import Icon from '../Icon/Icon'
import TextInput from '../TextInput/TextInput'
import styles from './ActorList.module.css'

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
			<div className={styles.actor}
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
						onClick={(e) => {
							e.preventDefault()
							onDelete(index)
						}}
					>
						<Icon id={'cancel'} />
					</button>
				)}
			</div>
		))}
		{onAdd && (
			<button className={styles.actorBtn}
				onClick={(e) => {
					e.preventDefault()
					onAdd()
				}}
			>
				<span>Add actor</span>
				<Icon id={'plus'} />
			</button>
		)}
	</>
)

export default ActorList
