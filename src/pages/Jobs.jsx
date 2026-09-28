import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useJobs } from '../context/JobsContext'
import { fetchDefaultJobs } from '../lib/idJob'
import JobCard from '../components/JobCard/JobCard'
import Tabs from '../components/Tabs/Tabs'
import styles from './Jobs.module.css'

export default function Jobs() {
	const fetcher = useCallback(() => fetchDefaultJobs(20), [])
	const { data, loading, error } = useFetch(fetcher, [])
	const { isJobSaved, saveJob } = useJobs()
	const [search, setSearch] = useState('')

	const jobs = data ?? []

	const filteredJobs = useMemo(
		() => jobs.filter((job) => job.title.toLowerCase().includes(search.toLowerCase())),
		[jobs, search]
	)

	const categories = useMemo(
		() => Array.from(new Set(filteredJobs.map((job) => job.category))).sort(),
		[filteredJobs]
	)

	return (
		<section className={styles.page}>
			<h1 className={styles.title}>Jobs</h1>
			<input
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search by job title…"
				aria-label="Search jobs by title"
				className={styles.searchInput}
			/>

			{loading && <p className={styles.status}>Loading jobs…</p>}
			{error && <p className={styles.error}>Something went wrong: {error}</p>}

			{!loading && !error && filteredJobs.length === 0 && <p className={styles.empty}>No jobs found.</p>}

			{!loading && !error && filteredJobs.length > 0 && (
				<Tabs defaultTab={categories[0]}>
					<Tabs.List>
						{categories.map((category) => (
							<Tabs.Tab key={category} id={category}>
								{category}
							</Tabs.Tab>
						))}
					</Tabs.List>
					<Tabs.Panels>
						{categories.map((category) => (
							<Tabs.Panel key={category} id={category}>
								{filteredJobs
									.filter((job) => job.category === category)
									.map((job) => (
										<JobCard
											key={job.id}
											job={job}
											saved={isJobSaved(job.id)}
											onSave={() => saveJob(job)}
										/>
									))}
							</Tabs.Panel>
						))}
					</Tabs.Panels>
				</Tabs>
			)}
		</section>
	)
}