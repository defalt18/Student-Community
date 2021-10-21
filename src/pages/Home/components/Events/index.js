import React from 'react'
import MediaContainer from 'components/Media'

function Events(props) {
	const { events, loading } = props
	return (
		<div className='pt-32 text-white px-12 h-screen overflow-scroll pb-20 w-10/12 flex-1'>
			<div className='flex w-full'>
				<div className='w-1/2'>
					<p className='prompt-h2 text-darker_blue'>DAIICT</p>
					<p className='prompt-h2 text-darker_blue'>Events</p>
					<p className='text-secondary my-6'>
						Students take and learn the best available from the community itself
						making the campus a vibrant place to nurture and grow into. These
						little clubs make the college an organism as with its own city to
						breed into!
					</p>
				</div>
				<div className='w-1/2'>
					{/*Vector Image*/}
					<MediaContainer />
				</div>
			</div>
		</div>
	)
}

export default Events
