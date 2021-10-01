import React from 'react'
import { useParams } from 'react-router-dom'
import MediaContainer from '../../components/Media'
import dummy_cover from '../../assets/images/dummy_cover.png'
import UserDetails from './components/UserDetails'
import UserPerformanceDetails from './components/UserPerformanceDetails'
import { default as Header } from 'components/NewHeader'
import useUserData from './hooks/useUserData'
import { CircularProgress as Loader } from '@material-ui/core'

function Profile() {
	const params = useParams()
	const uid = params.uid

	const { loading, ...content } = useUserData({
		userId: uid
	})

	return (
		<div className='bg-body_blue flex flex-col h-screen w-screen overflow-y-scroll pt-16 text-white'>
			<Header />
			<MediaContainer src={dummy_cover} />
			{loading ? (
				<Loader className='m-auto' color='inherit' />
			) : (
				<div className='flex flex-row h-full'>
					<UserDetails className='w-4/12' content={content} />
					<UserPerformanceDetails content={content} className='w-7/12' />
				</div>
			)}
		</div>
	)
}

export default Profile
