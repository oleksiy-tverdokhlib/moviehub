import Icon from '../../common/Icon/Icon'
import TextInput from '../../common/TextInput/TextInput'
import styles from './ActorList.module.css'

interface ActorProps {
	actors: string[]
	onChange: (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
		actor: string
	) => void
	onAdd?: () => void
	onDelete?: (index: number) => void
	errors?: string[]
	disabled?: boolean
}

const ActorList = ({
	actors,
	onChange,
	onAdd,
	onDelete,
	errors,
	disabled,
}: ActorProps) => {
	return (
		<>
			<strong>Actors:</strong>
			{actors.map((actor, index, arr) => (
				<div className={styles.actor} key={index}>
					<TextInput
						type="text"
						value={actor}
						label={`${index}`}
						onChange={(e) => onChange(index, e, actor)}
						error={errors?.[index]}
						disabled={disabled}
					/>
					{onDelete && !disabled && (
						<button
							onClick={(e) => {
								e.preventDefault()
								onDelete(index)
							}}
							disabled={arr.length == 1}
						>
							<Icon id="cancel" />
						</button>
					)}
				</div>
			))}
			{onAdd && !disabled && (
				<button
					className={styles.actorBtn}
					onClick={(e) => {
						e.preventDefault()
						onAdd()
					}}
					disabled={disabled}
				>
					<span>Add actor</span>
					<Icon id="plus" />
				</button>
			)}
		</>
	)
}

export default ActorList
