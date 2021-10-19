import React from 'react'
import Avatar from 'components/Avatar'
import { formatDistanceToNow } from 'date-fns'
import Button from 'components/Button'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import _size from 'lodash/size'
import _has from 'lodash/has'
import { POST_OPTIONS } from './post-model'
import MediaContainer from 'components/Media'
import { useAuthListener } from 'hooks'
import { db } from 'lib/firebase.prod'

function Post(props) {
	const { user } = useAuthListener()
	const {
		creator,
		performance,
		timestamp,
		caption,
		image,
		creatorId,
		NO_ID_FIELD
	} = props

	const CALLBACKS = {
		likes: async () => {
			if (_has(performance.likes, user.uid)) delete performance.likes[user.uid]
			else performance.likes = { ...performance.likes, [user.uid]: 1 }

			await db.collection('posts').doc(NO_ID_FIELD).update({ performance })
		}
	}
	const renderPerformance = () => (
		<div className='flex flex-row items-center py-3 pb-8 justify-between'>
			{_map(POST_OPTIONS, (option) => (
				<Button
					callback={CALLBACKS[option.id]}
					key={option.id}
					className='flex flex-row items-center gap-x-2 text-white p-2'
				>
					{option.id === 'likes'
						? option.icon(_has(performance[option.id], user.uid))
						: option.icon}
					<p className='text-secondary text-white'>
						{option.id !== 'Share' && _size(performance[option.id])}{' '}
						{option.label}
					</p>
				</Button>
			))}
		</div>
	)

	return (
		<div className='bg-component_blue rounded'>
			<div className='p-3 flex flex-row gap-x-2 items-center'>
				<div className='grid place-items-center'>
					<Avatar src={creator.image} size='small' />
				</div>
				<div>
					<Link
						to={`/${creatorId}/new-profile`}
						className='text-secondary text-white'
					>
						{creator.name}
					</Link>
					<p className='text-tertiary text-text_placeholder'>
						{formatDistanceToNow(timestamp, { addSuffix: true })}
					</p>
				</div>
			</div>
			<p
				className='bg-component_secondary text-secondary text-white p-4'
				dangerouslySetInnerHTML={{ __html: caption }}
			/>
			<MediaContainer
				src={image}
				minHeight={300}
				className='max-h-96 object-cover'
			/>
			<div className='p-4'>
				{renderPerformance()}
				<div className='flex flex-row gap-x-6 items-center px-3 py-2 bg-header_blue rounded w-full'>
					<input
						className='bg-header_blue text-text_placeholder border-none w-full text-white outline-none'
						placeholder='Add a comment'
					/>
					<Button text='Post' size='small' variant='filled' />
				</div>
			</div>
		</div>
	)
}

export default React.memo(Post)
