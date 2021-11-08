import React from 'react'
import MediaContainer from 'components/Media'
import greetingImage from 'assets/images/new_user_image.png'
import Button from 'components/Button'

function Greetings(props) {
	const { toggle } = props
	return (
		<div className='flex bg-body_blue outline-none w-screen h-screen border-none'>
			<div className='w-1/2 outline-none'>
				<MediaContainer
					className='w-full h-screen object-cover'
					src={greetingImage}
				/>
			</div>
			<div className='w-1/2 p-12 flex flex-col outline-none'>
				<p className='prompt-h2 text-white'>Welcome to DAIICT</p>
				<p className='prompt-h2 text-outline_dark'>Student Community</p>
				<p className='mt-4 mb-8 text-white text-secondary'>
					We welcome you to the DAIICT student community. This platform offers
					students a chance to connect and interact with their fellow batchmates
					/ seniors in an online environment. We intend to allow the students to
					grow in an environment where they can learn from each other. <br />
					<br />
					Explore the features involved by browsing through platform and get
					comfortable. Start by setting up your profile. <br />
					<br />
					Please make sure that we keep this a healthy place and no vulgar as
					well as explicit content be shared upon the platform. <br />
					<br />
					Regards, <br />
					Team Student Community
				</p>
				<Button
					variant='filled'
					size='large'
					className='font-bold mt-auto grid place-items-center'
					text='Agree and continue'
					callback={toggle}
				/>
			</div>
		</div>
	)
}

export default Greetings
