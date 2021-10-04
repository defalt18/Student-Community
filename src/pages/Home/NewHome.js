import React, { useState } from 'react'
import Feed from './components/Feed'
import UpcomingEvent from './components/EventFeed'
import Sidebar from 'components/NewSidebar'
import Header from 'components/NewHeader'
import { VIEWS } from './fixtures/home-model'
import Clubs from './components/Clubs'
import Academic from './components/Academic'
import Polls from './components/Polls'
import Events from './components/Events'

function NewHome() {
	const [view, navigator] = useState(VIEWS.HOME)

	const renderContent = () => {
		switch (view) {
			case VIEWS.HOME:
				return (
					<>
						<Feed />
						<UpcomingEvent />
					</>
				)

			case VIEWS.CLUBS:
				return <Clubs />

			case VIEWS.ACADEMIC:
				return <Academic />

			case VIEWS.POLL:
				return <Polls />

			case VIEWS.EVENTS:
				return <Events />

			default:
				return null
		}
	}
	return (
		<div className='w-screen min-h-screen bg-body_blue flex'>
			<Header />
			<Sidebar view={view} navigator={navigator} />
			{renderContent()}
		</div>
	)
}

export default NewHome
