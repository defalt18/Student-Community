import React from 'react'
import PollCard from './PollCard'
import { Header, Sidebar, CarouselAdd } from '../components'
import './Polling.css'
import CreatePoll from '../components/Modal/CreatePoll'
import { useAuthListener } from '../hooks'
import { useAsync } from 'react-use'
import { getMinimalUserById } from '../services/user-utils'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

export default function Polling() {
	const { user } = useAuthListener()

	const { data: polls } = useFirestoreCollectionData(
		useFirestore().collection('polls').where('isVerified', '==', true)
	)

	const { value: minimalUser } = useAsync(() => getMinimalUserById(user.uid))

	return (
		<div className='app' style={{ paddingBottom: '20px' }}>
			<Header uimg={minimalUser?.image} />
			<Sidebar />
			<div className='appmain'>
				<div
					className='appleft'
					style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
				>
					<h1>Running Polls</h1>
					{polls?.map(
						(poll) =>
							poll.isVerified && (
								<PollCard
									pollData={{ ...poll, id: poll.NO_ID_FIELD }}
									uid={user.uid}
								/>
							)
					)}
				</div>
				<div className='appright'>
					<div className='wrapper-main'>
						<div
							className='appitem'
							style={{
								padding: 0,
								backgroundColor: 'transparent'
							}}
						>
							<div
								className='carouselItem'
								style={{ borderRadius: '25px', margin: 0 }}
							>
								<CarouselAdd style={{ borderRadius: '25px' }} />
							</div>
						</div>
						<div className='appitem' style={{ padding: 0, overflow: 'hidden' }}>
							<CreatePoll style={{ cursor: 'pointer' }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
