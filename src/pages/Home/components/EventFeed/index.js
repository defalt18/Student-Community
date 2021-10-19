import React from 'react'
import upcomingEvent from 'assets/images/dummy_event_image.png'
import Suggestions from '../Feed/components/Suggestions'
import MediaContainer from 'components/Media'

function EventFeed() {
	return (
		<div className='bg-component_blue h-screen px-3 pt-24 overflow-y-scroll feed-width flex-1'>
			<div className='bg-header_blue p-5 rounded'>
				<p className='text-secondary text-outline_blue mb-4'>Upcoming Events</p>
				<MediaContainer
					src={upcomingEvent}
					alt='Upcoming Event'
					className='max-h-64 w-full object-cover rounded'
				/>
				<p className='text-secondary text-white mb-1 mt-3'>Synapse 2022</p>
				<p className='text-tertiary text-white'>Feb 21 - Feb 24</p>
			</div>
			<Suggestions />
		</div>
	)
}

export default EventFeed
