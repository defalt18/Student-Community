import React from 'react'
import MediaContainer from 'components/Media'
import { format } from 'date-fns'
import Button from 'components/Button'
import _isEmpty from 'lodash/isEmpty'
import c from 'classnames'

function EventCard(props) {
	const { content, isUpcoming = false } = props

	if (_isEmpty(content)) return null

	return (
		<div className='bg-gradient-to-b from-header_blue_secondary to-header_blue p-6 rounded flex w-full'>
			<div className='w-10/12 pl-12 px-8 font-bold flex flex-col gap-y-2'>
				<p className='text-primary text-white'>{content.eventName}</p>
				<p className='text-secondary text-white mb-12'>
					Event by {content.creator.name}
				</p>
				<p className='text-secondary text-white'>
					<span className='text-outline_blue'>Date : </span>
					{format(content.startTime, 'dd MMMM yyyy')} -{' '}
					{format(content.endTime, 'dd MMMM yyyy')}
				</p>
				<p className='text-secondary text-white'>
					<span className='text-outline_blue'>Venue : </span>
					{content.venue}
				</p>
				<p
					className={c(
						'text-secondary text-white',
						isUpcoming ? '' : 'opacity-0'
					)}
				>
					<span className='text-outline_blue'>Time : </span>
					{format(content.deadline, 'hh aa')}
				</p>
				<p
					className={c(
						'text-secondary text-white mb-12',
						isUpcoming ? '' : 'opacity-0'
					)}
				>
					<span className='text-outline_blue'>Deadline to register : </span>
					{format(content.deadline, 'hh:mm aa, dd MMMM yyyy')}
				</p>
				<p className='text-secondary text-white'>
					<span className='text-outline_blue'>Attendees : </span>
					{content.attendees}
				</p>
				<Button
					text='Attend'
					variant='outline'
					size='medium'
					className='mt-9 w-max'
				/>
			</div>
			<div className='flex-1'>
				<MediaContainer
					src={content.poster}
					className='object-cover h-96 min-w-event-poster rounded'
				/>
			</div>
		</div>
	)
}

export default React.memo(EventCard)
