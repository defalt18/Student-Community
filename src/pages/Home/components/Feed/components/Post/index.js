import React, { useCallback } from 'react'
import Avatar from 'components/Avatar'
import { formatDistanceToNow } from 'date-fns'
import Button from 'components/Button'
import { Link, useHistory } from 'react-router-dom'
import _map from 'lodash/map'
import _size from 'lodash/size'
import _keys from 'lodash/keys'
import _has from 'lodash/has'
import { POST_OPTIONS } from './post-model'
import MediaContainer from 'components/Media'
import { useAuthListener } from 'hooks'
import { useToggle } from 'react-use'
import isEmpty from 'lodash/isEmpty'
import { updatePostPerformance } from 'services/post-utils'
import _isEmpty from 'lodash/isEmpty'
import c from 'classnames'

function Post(props) {
	const { user } = useAuthListener()
	const history = useHistory()
	const {
		creator,
		performance,
		timestamp,
		caption,
		image,
		userdata,
		creatorId,
		NO_ID_FIELD
	} = props
	const [showComments, toggle] = useToggle(false)
	const [postComment, setComment] = React.useState('')

	const onChange = React.useCallback(
		(_event) => {
			const { target } = _event
			setComment(target.value)
		},
		[setComment]
	)

	const POST_ACTIONS = user ? POST_OPTIONS : [POST_OPTIONS[2]]
	const onUploadComment = useCallback(async () => {
		if (!isEmpty(postComment)) {
			performance.comments = {
				...performance.comments,
				[user?.uid]: {
					name: userdata.username,
					content: postComment
				}
			}
			await updatePostPerformance(NO_ID_FIELD, performance)
			setComment('')
		} else alert('Add a comment first')
	}, [performance, NO_ID_FIELD, user?.uid, userdata?.username, postComment])

	const CALLBACKS = React.useMemo(
		() => ({
			likes: async () => {
				if (_has(performance.likes, user.uid))
					delete performance.likes[user.uid]
				else performance.likes = { ...performance.likes, [user.uid]: 1 }

				await updatePostPerformance(NO_ID_FIELD, performance)
			},
			comments: () => {
				toggle()
			},
			Share: () => {
				history.push(`/show/posts/${NO_ID_FIELD}`)
			}
		}),
		[history, NO_ID_FIELD, performance, user, toggle]
	)

	const renderPerformance = () => (
		<div
			className={c(
				'flex flex-row items-center py-3 pb-6',
				user ? 'justify-between' : 'justify-around'
			)}
		>
			{_map(POST_ACTIONS, (option) => (
				<Button
					callback={CALLBACKS[option.id]}
					key={option.id}
					id={option.id}
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
		<div className='bg-component_blue rounded min-w-700'>
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
				{showComments && !_isEmpty(performance.comments) && (
					<div className='border-t border-component_core py-4'>
						{_map(_keys(performance.comments), (user) => (
							<Link
								to={`/${user}/new-profile`}
								exact
								className='flex items-center gap-x-2 mt-2'
							>
								<p className='text-outline_blue text-primary-03'>
									{performance.comments[user].name}
								</p>
								<p className='text-white text-secondary'>
									{performance.comments[user].content}
								</p>
							</Link>
						))}
					</div>
				)}
				{user && (
					<div className='flex flex-row gap-x-6 items-center px-3 py-2 bg-header_blue rounded w-full'>
						<input
							className='bg-header_blue text-text_placeholder border-none w-full text-white outline-none'
							placeholder='Add a comment'
							value={postComment}
							onChange={onChange}
						/>
						<Button
							text='Post'
							size='small'
							variant='filled'
							callback={onUploadComment}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default React.memo(Post)
