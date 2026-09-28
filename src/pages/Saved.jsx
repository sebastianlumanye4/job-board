import { useJobs } from '../context/JobsContext'
import styles from './Saved.module.css'

export default function Saved() {
	const { savedJobs, removeJob } = useJobs()

	if (savedJobs.length === 0) {
		return <p className={styles.empty}>No saved jobs yet</p>
	}

	return (
		<section className={styles.page}>
			<h1 className={styles.title}>Saved Jobs</h1>
			<ul className={styles.list}>
				{savedJobs.map((job) => (
					<li key={job.id} className={styles.item}>
						<span className={styles.jobInfo}>
							<span className={styles.jobTitle}>{job.title}</span>
							<span className={styles.jobCompany}>— {job.company}</span>
						</span>
						<button type="button" className={styles.removeButton} onClick={() => removeJob(job.id)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</section>
	)
}