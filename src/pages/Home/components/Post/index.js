import React from 'react'
import Avatar from '../../../../components/Avatar'
import { formatDistanceToNow } from 'date-fns'
import { Comment, FavoriteBorder as Like, Share } from '@material-ui/icons'
import Button from '../../../../components/Button'

function Post(props) {
	const { creator, performance, timestamp, caption, image } = props

	const renderPerformance = () => (
		<div className='flex flex-row items-center py-4 pb-8 justify-between'>
			<div className='flex flex-row items-center gap-x-2 text-white'>
				<Like color='inherit' />
				<p className='text-secondary text-white'>{performance.likes} Likes</p>
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
	)

	return (
		<div className='bg-component_blue rounded'>
			<div className='p-3 flex flex-row gap-x-2 items-center'>
				<div className='grid place-items-center'>
					<Avatar src={creator.image} size='small' />
				</div>
				<div>
					<p className='text-secondary text-white'>{creator.name}</p>
					<p className='text-tertiary text-text_placeholder'>
						{formatDistanceToNow(timestamp, { addSuffix: true })}
					</p>
				</div>
			</div>
			<p className='bg-component_secondary text-secondary text-white p-4'>
				{caption}
			</p>
			{image && <img src={image} alt='attachment' />}
			<div className='p-4'>
				{renderPerformance()}
				<div className='flex flex-row gap-x-6 items-center px-3 py-2 bg-header_blue rounded w-full'>
					<input
						className='bg-header_blue text-text_placeholder border-none w-full text-white outline-none'
						placeholder={'Add a comment'}
					/>
					<Button text={'Post'} size='small' />
				</div>
			</div>
		</div>
	)
}

export default React.memo(Post)
