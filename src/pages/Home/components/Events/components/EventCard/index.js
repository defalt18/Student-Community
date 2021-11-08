import React, { useCallback } from 'react'
import MediaContainer from 'components/Media'
import { format } from 'date-fns'
import Button from 'components/Button'
import _isEmpty from 'lodash/isEmpty'
import c from 'classnames'
import { updateEventDetails } from 'services/event-utils'
import _has from 'lodash/has'

function EventCard(props) {
	const { content, isUpcoming = false, userdata } = props

	const onAttend = useCallback(async () => {
		await updateEventDetails(content.NO_ID_FIELD, {
			attendees: content.attendees + 1,
			performance: { ...content.performance, [userdata.NO_ID_FIELD]: 1 }
		})
	}, [content, userdata])

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
				{_has(content.performance, userdata?.NO_ID_FIELD) ? (
					<div className='border border-outline_blue px-6 py-1 text-secondary text-outline_blue rounded w-max mt-9'>
						Attending ✓
					</div>
				) : (
					<Button
						text='Attend'
						variant='outline'
						size='medium'
						className='mt-9 w-max'
						callback={onAttend}
					/>
				)}
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
