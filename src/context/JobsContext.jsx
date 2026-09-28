import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

export const JobsContext = createContext(null)

const SAVED_KEY = 'jobs.saved'

function loadSavedJobs() {
	try {
		const raw = window.localStorage.getItem(SAVED_KEY)
		return raw ? JSON.parse(raw) : []
	} catch (err) {
		console.error('Error loading saved jobs from localStorage:', err)
		return []
	}
}

const initialState = {
	savedJobs: loadSavedJobs(),
	notifications: [],
}

function jobsReducer(state, action) {
	switch (action.type) {
		case 'SAVE_JOB': {
			const alreadySaved = state.savedJobs.some((j) => j.id === action.payload.id)
			if (alreadySaved) return state
			return { ...state, savedJobs: [...state.savedJobs, action.payload] }
		}

		case 'REMOVE_JOB':
			return {
				...state,
				savedJobs: state.savedJobs.filter((j) => j.id !== action.payload),
			}

		case 'ADD_NOTIFICATION':
			return { ...state, notifications: [...state.notifications, action.payload] }

		case 'DISMISS_NOTIFICATION':
			return {
				...state,
				notifications: state.notifications.filter((n) => n.id !== action.payload),
			}

		default:
			return state
	}
}

export function JobsProvider({ children }) {
	const [state, dispatch] = useReducer(jobsReducer, initialState)

	useEffect(() => {
		try {
			window.localStorage.setItem(SAVED_KEY, JSON.stringify(state.savedJobs))
		} catch (err) {
			console.error('Error saving jobs to localStorage:', err)
		}
	}, [state.savedJobs])

	function isJobSaved(id) {
		return state.savedJobs.some((j) => j.id === id)
	}

	function addNotification(payload) {
		const notification =
			typeof payload === 'string'
				? { id: crypto.randomUUID(), message: payload, type: 'info' }
				: { id: payload.id ?? crypto.randomUUID(), type: 'info', ...payload }
		dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
	}

	function saveJob(job) {
		dispatch({ type: 'SAVE_JOB', payload: job })
		addNotification(`Saved "${job.title}"`)
	}

	function removeJob(id) {
		dispatch({ type: 'REMOVE_JOB', payload: id })
	}

	function dismissNotification(id) {
		dispatch({ type: 'DISMISS_NOTIFICATION', payload: id })
	}

	const value = useMemo(
		() => ({
			savedJobs: state.savedJobs,
			savedCount: state.savedJobs.length,
			notifications: state.notifications,
			isJobSaved,
			saveJob,
			removeJob,
			addNotification,
			dismissNotification,
		}),
		[state.savedJobs, state.notifications]
	)

	return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}

export function useJobs() {
	const ctx = useContext(JobsContext)
	if (!ctx) {
		throw new Error('useJobs must be used within a JobsProvider')
	}
	return ctx
}