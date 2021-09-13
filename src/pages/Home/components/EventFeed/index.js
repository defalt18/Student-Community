import React from 'react'
import upcomingEvent from '../../../../assets/images/dummy_event_image.png'
import Suggestions from '../Suggestions'

function EventFeed() {
	return (
		<div className='flex-1 bg-component_blue h-screen px-3 pt-20 overflow-y-scroll'>
			<div className='bg-header_blue px-3 py-4 rounded'>
				<p className='text-secondary text-outline_blue mb-4'>Upcoming Events</p>
				<img
					src={upcomingEvent}
					alt='Upcoming Event'
					className='max-h-56 w-full object-cover'
				/>
				<p className='text-secondary text-white mb-1 mt-3'>Synapse 2022</p>
				<p className='text-tertiary text-white'>Feb 21 - Feb 24</p>
			</div>
			<Suggestions />
		</div>
	)
}

export default EventFeed
