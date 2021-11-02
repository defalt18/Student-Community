import React from 'react'
import Suggestions from '../Feed/components/Suggestions'
import _head from 'lodash/head'
import MediaContainer from 'components/Media'
import _isEmpty from 'lodash/isEmpty'
import { format } from 'date-fns'

function EventFeed(props) {
	const { events, userdata, user } = props
	const upcomingEvent = _head(events)

	const renderEventInfo = () => {
		if (_isEmpty(events))
			return (
				<p className='text-secondary text-white mb-1 mt-3 flex items-center gap-x-1'>
					<span>No upcoming events</span>
					<span className='text-xl'>😢</span>
				</p>
			)

		return (
			<>
				<MediaContainer
					src={upcomingEvent.poster}
					alt='Upcoming Event'
					className='max-h-64 w-full object-cover rounded'
				/>
				<p className='text-secondary text-white mb-1 mt-3'>
					{upcomingEvent.eventName}
				</p>
				<p className='text-tertiary text-white'>
					{format(upcomingEvent.startTime, 'MMM dd')} -{' '}
					{format(upcomingEvent.endTime, 'MMM dd')}
				</p>
			</>
		)
	}
	return (
		<div className='bg-component_blue h-screen px-3 pt-24 overflow-y-scroll feed-width flex-1'>
			<div className='bg-header_blue p-5 rounded'>
				<p className='text-secondary text-outline_blue mb-4'>Upcoming Events</p>
				{renderEventInfo()}
			</div>
			<Suggestions userdata={userdata} user={user} />
		</div>
	)
}

export default React.memo(EventFeed)
