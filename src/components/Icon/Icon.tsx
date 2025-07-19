import styles from './Icons.module.css'
interface IconProps {
	id: string
	onClick?: () => void
}
const Icon = ({ id, onClick }: IconProps) => (
	<svg onClick={onClick} className={styles.icon}>
		<use href={`/sprite.svg?v=1#${id}`} />
	</svg>
)

export default Icon
