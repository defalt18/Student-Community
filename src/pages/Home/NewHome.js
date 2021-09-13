import React from 'react'
import Feed from './components/Feed'
import UpcomingEvent from './components/EventFeed'

function NewHome() {
	return (
		<div className='w-screen min-h-screen bg-body_blue flex'>
			{/* TODO : Header */}
			<div className='z-10 fixed top-0 border-b border-header_border_blue bg-header_blue w-screen grid place-content-center h-16'>
				<h2 className='text-primary text-white'>Header</h2>
			</div>
			{/* TODO : Sidebar */}
			<div className='group w-20 px-12 bg-component_blue h-screen grid place-content-center transition-all duration-300 hover:w-2/12'>
				<h2 className='text-primary text-white text-opacity-0 duration-300 group-hover:text-opacity-100'>
					Sidebar
				</h2>
			</div>
			<Feed />
			<UpcomingEvent />
		</div>
	)
}

export default NewHome
