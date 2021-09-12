import React from 'react'
import Feed from './components/Feed'
import UpcomingEvent from './components/UpcomingEvent'

function NewHome() {
	return (
		<div className='w-screen min-h-screen bg-body_blue flex flex-row flex-1'>
			{/* TODO : Header */}
			<div className='z-10 fixed top-0 bg-header_blue w-screen grid place-content-center h-16'>
				<h2 className='text-primary text-white'>Header</h2>
			</div>
			{/* TODO : Sidebar */}
			<div className='w-96 px-12 bg-component_blue h-screen grid place-content-center'>
				<h2 className='text-primary text-white'>Sidebar</h2>
			</div>
			<Feed />
			<UpcomingEvent />
		</div>
	)
}

export default NewHome
