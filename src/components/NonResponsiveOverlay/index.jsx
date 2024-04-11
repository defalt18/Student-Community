import React from 'react'
import { createPortal } from 'react-dom'
import DesktopGraphic from './assets/non_responsive_vector.svg'

const NonResponsiveOverlay = () => {
	const PortalContent = (
		<div className='lg:hidden h-full w-full bg-black fixed top-0 p-4 box-border z-30'>
			<div className='grid place-items-center border-2 border-slate-700 h-full w-full'>
				<div className='flex flex-col px-8 gap-y-4 md:gap-y-8 -mt-12 md:-mt-16'>
					<img
						src={DesktopGraphic}
						alt='Open in desktop graphic'
						className='h-[20rem] md:h-[25rem] w-full object-contain'
					/>
					<span className='text-l md:text-2xl text-center text-slate-300'>
						For the best viewing experience, please open this website on a
						desktop
					</span>
				</div>
			</div>
		</div>
	)

	return createPortal(PortalContent, document.body, 'portal-overlay-content')
}

export default NonResponsiveOverlay
