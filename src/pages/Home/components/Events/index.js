import React from 'react'
import MediaContainer from 'components/Media'
import _map from 'lodash/map'
import EventCard from './components/EventCard'
import _head from 'lodash/head'
import { useToggle } from 'react-use'
import Dialog from 'components/Dialog'
import AddEventDialog from './components/AddEventDialog'
import Button from '../../../../components/Button'

function Events(props) {
	const { events, userdata } = props
	const [eventAction, toggle] = useToggle(false)
	const upcomingEvent = _head(events)

	return (
		<div className='pt-32 text-white px-12 h-screen overflow-scroll pb-20 w-10/12 flex-1'>
			<div className='flex w-full'>
				<div className='w-1/2'>
					<p className='prompt-h2 text-darker_blue'>DAIICT</p>
					<p className='prompt-h2 text-darker_blue'>Events</p>
					<p className='text-secondary my-6'>
						Find all the fun and exciting activities happening among the DAIICT
						community here.
					</p>
					{userdata.role === 'Club' && (
						<Button
							variant='filled'
							className='px-16 py-3 font-bold mb-16'
							text='Add Event'
							callback={toggle}
						/>
					)}
				</div>
				<div className='w-1/2'>
					{/*Vector Image*/}
					<MediaContainer />
				</div>
			</div>
			<div className='my-3 mb-6 flex justify-between items-center'>
				<p className='text-outline_blue prompt-subtext-02'>Upcoming event</p>
			</div>
			<div className='flex flex-col gap-y-6'>
				<EventCard
					key={upcomingEvent?.NO_ID_FIELD}
					content={upcomingEvent}
					userdata={userdata}
					isUpcoming
				/>
			</div>
			<div className='my-6 flex justify-between items-center'>
				<p className='text-outline_blue prompt-subtext-02'>All events</p>
				<select
					defaultValue='All'
					className='form bg-body_blue text-outline_blue text-secondary rounded border border-white border-opacity-50 outline-none p-3 pr-8 cursor-pointer'
				>
					<option value='All'>All</option>
					<option value='Today'>Today</option>
					<option value='This week'>This week</option>
					<option value='This year'>This year</option>
				</select>
			</div>
			<div className='flex flex-col gap-y-6'>
				{_map(events, (event) => (
					<EventCard
						key={event.NO_ID_FIELD}
						content={event}
						userdata={userdata}
					/>
				))}
			</div>
			<Dialog open={eventAction && userdata.role === 'Club'} toggle={toggle}>
				<AddEventDialog userdata={userdata} toggle={toggle} />
			</Dialog>
		</div>
	)
}

export default React.memo(Events)
