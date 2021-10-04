import React from 'react'
import { useParams } from 'react-router-dom'
import UserDetails from './components/UserDetails'
import UserPerformanceDetails from './components/UserPerformanceDetails'
import { default as Header } from 'components/NewHeader'
import useUserData from './hooks/useUserData'
import { CircularProgress as Loader } from '@material-ui/core'
import Cover from './components/Cover'
import { useAuthListener } from 'hooks'

function Profile() {
	const { user } = useAuthListener()
	const params = useParams()
	const uid = params.uid

	const { loading, ...content } = useUserData({
		userId: uid
	})

	return (
		<div className='bg-body_blue flex flex-col h-screen w-screen overflow-y-scroll pt-16 text-white'>
			<Header />
			{loading ? (
				<Loader className='m-auto' color='inherit' />
			) : (
				<>
					<Cover content={content} user={user} />
					<div className='flex flex-row h-full'>
						<UserDetails className='w-4/12' content={content} user={user} />
						<UserPerformanceDetails
							content={content}
							user={user}
							className='w-7/12'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Profile
