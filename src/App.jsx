import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { JobsProvider } from './context/JobsContext'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Saved from './pages/Saved'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'

export default function App() {
	return (
		<JobsProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<RootLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/jobs" element={<Jobs />} />
						<Route path="/saved" element={<Saved />} />
						<Route path="/apply" element={<Apply />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</JobsProvider>
	)
}