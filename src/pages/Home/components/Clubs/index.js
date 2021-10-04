import React from 'react'
import MediaContainer from 'components/Media'
import _map from 'lodash/map'
import { clubsData } from './fixtures/club-model'

function Clubs() {
	return (
		<div className='pt-32 text-white px-12 h-screen overflow-scroll pb-20 w-10/12 flex-1'>
			<div className='flex w-full'>
				<div className='w-1/2'>
					<p className='prompt-h2 text-darker_blue'>DAIICT</p>
					<p className='prompt-h2 text-darker_blue'>Clubs</p>
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
			<div className='mt-24 w-full'>
				<div className='grid grid-cols-3 gap-6'>
					{_map(clubsData, (club) => (
						<div
							id={club.id}
							className='bg-header_blue rounded p-3 flex flex-col items-center justify-center'
						>
							<MediaContainer src={club.image} className='h-72 object-cover' />
							<p className='text-primary text-white mb-6 mt-4'>{club.name}</p>
							<p className='text-secondary text-white self-center text-center w-8/12'>
								{club.description}
							</p>
							<a
								href={`/${club.id}/info`}
								className='text-secondary mt-8 underline text-outline_blue'
							>
								Know more
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Clubs
