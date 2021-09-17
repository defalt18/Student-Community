import React from 'react'
import { useParams } from 'react-router-dom'
import MediaContainer from '../../components/Media'
import dummy_cover from '../../assets/images/dummy_cover.png'
import UserDetails from './components/UserDetails'
import UserPerformanceDetails from './components/UserPerformanceDetails'
import { default as Header } from 'components/NewHeader'

function Profile() {
	const params = useParams()
	const uid = params.uid

	return (
		<div className='bg-body_blue flex flex-col h-screen w-screen overflow-y-scroll pt-16'>
			<Header />
			<MediaContainer src={dummy_cover} />
			<div className='flex flex-row h-full'>
				<UserDetails className='w-4/12' />
				<UserPerformanceDetails
					className='w-7/12'
					content={{
						numberOfPosts: 6,
						numberOfSources: 1,
						numberOfFriends: 20
					}}
				/>
			</div>
		</div>
	)
}

export default Profile
