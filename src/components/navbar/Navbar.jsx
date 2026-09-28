import { NavLink } from 'react-router-dom'
import { useJobs } from '../../context/JobsContext'
import styles from './Navbar.module.css'

export default function Navbar() {
	const { savedCount } = useJobs()

	function linkClass({ isActive }) {
		return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
	}

	return (
		<nav className={styles.navbar}>
			<span className={styles.brand}>Job Board</span>
			<div className={styles.links}>
				<NavLink to="/" end className={linkClass}>
					Home
				</NavLink>
				<NavLink to="/jobs" className={linkClass}>
					Jobs
				</NavLink>
				<NavLink to="/saved" className={linkClass}>
					Saved
					{savedCount > 0 && <span className={styles.badge}>{savedCount}</span>}
				</NavLink>
				<NavLink to="/apply" className={linkClass}>
					Apply
				</NavLink>
			</div>
		</nav>
	)
}