import React from 'react'
import upcomingEvent from '../../../../assets/images/dummy_event_image.png'

function UpcomingEvent() {
	return (
		<div className='cap-370 bg-component_blue h-100% px-3 pt-3 overflow-y-auto'>
			<div className='bg-body_blue px-3 py-4'>
				<h2 className='text-secondary text-white mb-4'>Upcoming Events</h2>
				<img src={upcomingEvent} alt='Upcoming Event' />
			</div>
		</div>
	)
}

export default UpcomingEvent
