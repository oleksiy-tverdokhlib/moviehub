import Icon from '../Icon/Icon'
import TextInput from '../TextInput/TextInput'
import styles from './ActorList.module.css'

interface ActorProps {
	actors: string[]
	onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
	onAdd?: () => void
	onDelete?: (index: number) => void
	errors?: string[]
}

const ActorList = ({
	actors,
	onChange,
	onAdd,
	onDelete,
	errors,
}: ActorProps) => {
	return (
		<>
			<strong>Actors:</strong>
			{actors.map((actor, index) => (
				<div className={styles.actor} key={index}>
					<TextInput
						type="text"
						value={actor}
						id={`${index}`}
						onChange={(e) => onChange(index, e)}
						error={errors?.[index]}
					/>
					{onDelete && (
						<button
							onClick={(e) => {
								e.preventDefault()
								onDelete(index)
							}}
						>
							<Icon id="cancel" />
						</button>
					)}
				</div>
			))}
			{onAdd && (
				<button
					className={styles.actorBtn}
					onClick={(e) => {
						e.preventDefault()
						onAdd()
					}}
				>
					<span>Add actor</span>
					<Icon id="plus" />
				</button>
			)}
		</>
	)
}

export default ActorList
