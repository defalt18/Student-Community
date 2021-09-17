import React from 'react'
import Feed from './components/Feed'
import UpcomingEvent from './components/EventFeed'
import Sidebar from 'components/NewSidebar'
import Header from 'components/NewHeader'

function NewHome() {
	return (
		<div className='w-screen min-h-screen bg-body_blue flex'>
			<Header />
			<Sidebar />
			<Feed />
			<UpcomingEvent />
		</div>
	)
}

export default NewHome
