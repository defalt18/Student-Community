import React from 'react'
import MediaContainer from 'components/Media'
import Button from 'components/Button'
import PollCard from './components/PollCard'
import _map from 'lodash/map'
import Dialog from 'components/Dialog'
import { useToggle } from 'react-use'
import PollCreator from './components/PollCreator'

function Polls(props) {
	const { polls, userdata } = props
	const [pollAction, toggle] = useToggle(false)
	return (
		<div className='pt-32 text-white px-12 h-screen overflow-scroll pb-20 w-10/12 flex-1'>
			<div className='flex w-full'>
				<div className='w-1/2'>
					<p className='prompt-h2 text-darker_blue'>Polling</p>
					<p className='text-secondary my-6'>
						Raise an issue - get votes - make change
					</p>
					<Button
						variant='filled'
						className='px-8 py-3 font-bold'
						text='Create poll'
						callback={toggle}
					/>
				</div>
				<div className='w-1/2'>
					{/*Vector Image*/}
					<MediaContainer />
				</div>
			</div>
			<div className='my-8 flex justify-between items-center'>
				<p className='text-outline_blue prompt-subtext-02'>Ongoing polls</p>
			</div>
			<div className='flex flex-col gap-y-6'>
				{_map(
					polls,
					(poll) =>
						poll.isVerified && <PollCard {...poll} userdata={userdata} />
				)}
			</div>
			<Dialog open={pollAction} toggle={toggle}>
				<PollCreator toggle={toggle} userdata={userdata} />
			</Dialog>
		</div>
	)
}

export default React.memo(Polls)
