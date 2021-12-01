import React from 'react'
import Button from 'components/Button'
import MediaContainer from 'components/Media'
import _map from 'lodash/map'
import image from 'assets/images/resources_vector.svg'

const Resources = [
	{
		id: 'Books',
		name: 'Books',
		image: '',
		link: 'https://en.wikipedia.org/'
	},
	{
		id: 'Videos',
		name: 'Videos',
		image: '',
		link: 'https://en.wikipedia.org/'
	},
	{
		id: 'UsefulLinks',
		name: 'Useful Links',
		image: '',
		link: 'https://en.wikipedia.org/'
	},
	{
		id: 'Software&Licences',
		name: 'Software & Licences',
		image: '',
		link: 'https://en.wikipedia.org/'
	}
]

function Academic() {
	return (
		<div className='pt-32 text-white px-12 w-10/12 h-screen overflow-scroll pb-20 flex-1'>
			<div className='flex w-full'>
				<div className='w-1/2'>
					<p className='prompt-h2 text-darker_blue'>All the tools right</p>
					<p className='prompt-h2 text-darker_blue'>on your screen</p>
					<p className='text-secondary my-6'>
						So here we welcome you to the Academics Page which offers a compact
						view to all the resources an institute as well as the student
						community has to offer!. Dive in and enjoy the journey...
					</p>
					<Button variant='filled' text='Contribute' size='large' />
				</div>
				<div className='w-1/2'>
					<MediaContainer src={image} />
				</div>
			</div>
			<div className='mt-24 w-full'>
				<p className='prompt-h4 text-white mb-8'>
					Checkout available resources
				</p>
				<div className='flex flex-wrap gap-x-3 justify-evenly items-center'>
					{_map(Resources, (resource) => (
						<div
							id={resource.id}
							className='bg-header_blue rounded p-3 pt-40 flex-1'
						>
							<MediaContainer src={resource.image} />
							<p className='text-secondary text-white mb-12'>{resource.name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Academic
