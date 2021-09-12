import React from 'react'
import { Avatar } from '@material-ui/core'
import { formatDistanceToNow } from 'date-fns'
import { Comment, FavoriteBorder as Like, Share } from '@material-ui/icons'

function Post(props) {
	const { creator, performance, timestamp, caption, image } = props

	return (
		<div className='bg-component_blue rounded'>
			<div className='p-5 flex flex-row gap-x-2 items-center'>
				<Avatar src={creator.image} />
				<div>
					<p className='text-secondary text-white'>{creator.name}</p>
					<p className='text-tertiary text-text_placeholder'>
						{formatDistanceToNow(timestamp, { addSuffix: true })}
					</p>
				</div>
			</div>
			<p className='text-secondary text-white px-5 py-3'>{caption}</p>
			<img src={image} alt='post-image' />
			<div className='p-5'>
				<div className='flex flex-row gap-x-8 items-center mb-4'>
					<div className='flex flex-row items-center gap-x-2 text-white'>
						<Like color='inherit' />
						<p className='text-secondary text-white'>
							{performance.likes} Likes
						</p>
					</div>
					<div className='flex flex-row items-center gap-x-2 text-white'>
						<Comment color='inherit' />
						<p className='text-secondary text-white'>
							{performance.comments} Comments
						</p>
					</div>
					<div className='flex flex-row items-center gap-x-2 text-white'>
						<Share color='inherit' />
						<p className='text-secondary text-white'>Share</p>
					</div>
				</div>
				<div className='flex flex-row gap-x-6 items-center px-3 py-2 bg-dark_blue rounded w-full'>
					<input
						className='bg-dark_blue text-text_placeholder border-none w-full text-white outline-none'
						placeholder={'Add a comment'}
					/>
					<button className='px-5 py-1 border-none bg-blue-600 text-white rounded'>
						Post
					</button>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Post)
