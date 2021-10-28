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
import useHomeData from './hooks/useHomeData'
import { CircularProgress as Loader } from '@material-ui/core'

function NewHome(props) {
	const { user } = props
	const [view, navigator] = useState(VIEWS.HOME)
	const { loading, events, polls, ...rest } = useHomeData()

	const renderContent = () => {
		switch (view) {
			case VIEWS.HOME:
				return (
					<>
						<Feed loading={loading} {...rest} user={user} />
						<UpcomingEvent
							loading={loading}
							events={events}
							userdata={rest?.userdata}
							user={user}
						/>
					</>
				)

			case VIEWS.CLUBS:
				return <Clubs />

			case VIEWS.ACADEMIC:
				return <Academic />

			case VIEWS.POLL:
				return <Polls loading={loading} polls={polls} />

			case VIEWS.EVENTS:
				return <Events loading={loading} events={events} />

			default:
				return null
		}
	}
	return (
		<div className='w-screen min-h-screen bg-body_blue flex'>
			<Header />
			<Sidebar view={view} navigator={navigator} />
			{loading ? (
				<div className='m-auto text-white flex flex-col items-center'>
					<Loader className='m-auto' color='inherit' />
					<p className='text-primary-02 mt-3'>Loading content</p>
				</div>
			) : (
				renderContent()
			)}
		</div>
	)
}

export default NewHome
