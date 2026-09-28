import { createContext, useContext, useState } from 'react'
import styles from './Tabs.module.css'

const TabsContext = createContext(null)

function useTabsContext() {
	const ctx = useContext(TabsContext)
	if (!ctx) {
		throw new Error('Tabs.* components must be used within a Tabs component')
	}
	return ctx
}

function Tabs({ defaultTab, children }) {
	const [activeTab, setActiveTab] = useState(defaultTab)
	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div className={styles.tabs}>{children}</div>
		</TabsContext.Provider>
	)
}

function TabList({ children }) {
	return (
		<div className={styles.tabList} role="tablist">
			{children}
		</div>
	)
}

function Tab({ id, children }) {
	const { activeTab, setActiveTab } = useTabsContext()
	const isActive = activeTab === id

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isActive}
			className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
			onClick={() => setActiveTab(id)}
		>
			{children}
		</button>
	)
}

function TabPanels({ children }) {
	return <div className={styles.tabPanels}>{children}</div>
}

function TabPanel({ id, children }) {
	const { activeTab } = useTabsContext()
	if (activeTab !== id) return null
	return (
		<div className={styles.tabPanel} role="tabpanel">
			{children}
		</div>
	)
}

Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panels = TabPanels
Tabs.Panel = TabPanel

export default Tabs