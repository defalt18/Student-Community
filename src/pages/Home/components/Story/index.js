import React from 'react'
import { useAsync } from 'react-use'
import { fetchHomeStories } from '../../utils/home-utils'
import { CircularProgress as Loader } from '@material-ui/core'
import _map from 'lodash/map'
import { isEmpty } from 'lodash'
import Avatar from '../../../../components/Avatar'

function Stories() {
	const { loading, value: Stories } = useAsync(() => fetchHomeStories())
	return (
		<div className='p-5 bg-component_blue rounded'>
			<div className='flex flex-row gap-x-4 overflow-x-scroll text-white items-center w-full'>
				{loading ? (
					<Loader className='mx-auto' color='inherit' />
				) : isEmpty(Stories) ? (
					<p className='text-secondary'>No stories to show...</p>
				) : (
					_map(Stories, (story) => (
						<div className='flex flex-col gap-y-3 items-center p-1 rounded hover:bg-white hover:bg-opacity-5 cursor-pointer'>
							<Avatar
								src={story.creator.image}
								variant='display'
								size='medium'
							/>
							<p className='text-secondary text-white'>{story.creator.name}</p>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default Stories
