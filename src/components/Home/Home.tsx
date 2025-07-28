import { useFilter } from '../../hooks/sidebarFilters/useFilter'
import styles from './Home.module.css'
import MoviesList from '../Movies/MoviesList'
import Sidebar from '../Sidebar/SideBar'

const Home = () => {
	const { setSearchParams, queryArgs } = useFilter()

	return (
		<main className={styles.home}>
			<Sidebar setSearchParams={setSearchParams} />
			<MoviesList queryArgs={queryArgs} setSearchParams={setSearchParams} />
		</main>
	)
}

export default Home
