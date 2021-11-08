import React, { useCallback } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { Link, useHistory } from 'react-router-dom'
import Button from '../Button'
import Avatar from '../Avatar'
import c from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { clearNotificationById, updateUserDetails } from 'services/user-utils'

const VARIANTS = {
	Request: 'request',
	Like: 'like',
	Comment: 'comment'
}

function Notification(props) {
	const {
		className,
		variant,
		friends: creatorFriends,
		timestamp,
		contentId,
		creator,
		NO_ID_FIELD,
		user,
		userdata
	} = props
	const history = useHistory()

	const headToContent = useCallback(
		() => history.push(`/show/posts/${contentId}`),
		[history, contentId]
	)
	const onClick = useCallback(
		async () => await clearNotificationById(user.uid, NO_ID_FIELD),
		[user.uid, NO_ID_FIELD]
	)

	const onAccept = useCallback(async () => {
		const friends = userdata?.friends
		await updateUserDetails(
			{ friends: { ...friends, [creator.uid]: { status: 1, creator } } },
			user.uid
		)
		await updateUserDetails(
			{
				friends: {
					...creatorFriends,
					[user.uid]: {
						status: 1,
						creator: {
							image: userdata?.image,
							name: userdata?.username,
							uid: user.uid,
							degree: userdata?.degree,
							course: userdata?.course
						}
					}
				}
			},
			creator.uid
		)
		await clearNotificationById(user.uid, NO_ID_FIELD)
	}, [userdata, user.uid, creator, NO_ID_FIELD, creatorFriends])

	const onDecline = useCallback(async () => {
		const friends = userdata?.friends
		delete friends[creator.uid]
		delete creatorFriends[user.uid]
		await updateUserDetails({ friends: friends ?? {} }, user.uid)
		await updateUserDetails({ friends: creatorFriends ?? {} }, creator.uid)
		await clearNotificationById(user.uid, NO_ID_FIELD)
	}, [userdata?.friends, user.uid, creator.uid, NO_ID_FIELD, creatorFriends])

	const renderContent = () => {
		switch (variant) {
			case VARIANTS.Request:
				return (
					<div className='flex gap-x-2 items-center'>
						<Avatar src={creator.image} size='small' />
						<div>
							<Link
								to={`/${creator.uid}/new-profile`}
								className='text-secondary font-bold'
							>
								<span className='text-outline_blue'>{creator.name} </span>
								sent you a friend request.
							</Link>
							<p className='text-tertiary text-text_placeholder'>
								{formatDistanceToNow(timestamp, { addSuffix: true })}
							</p>
						</div>
					</div>
				)

			case VARIANTS.Comment:
				return (
					<div className='flex gap-x-2 items-center'>
						<Avatar src={creator.image} size='small' />
						<div>
							<Link
								to={`/${creator.uid}/new-profile`}
								className='text-secondary font-bold'
							>
								<span className='text-outline_blue'>{creator.name} </span>
								commented on your post.
							</Link>
							<p className='text-tertiary text-text_placeholder'>
								{formatDistanceToNow(timestamp, { addSuffix: true })}
							</p>
						</div>
					</div>
				)

			case VARIANTS.Like:
				return (
					<div className='flex gap-x-2 items-center'>
						<Avatar src={creator.image} size='small' />
						<div>
							<Link
								to={`/${creator.uid}/new-profile`}
								className='text-secondary font-bold'
							>
								<span className='text-outline_blue'>{creator.name} </span>
								liked your post.
							</Link>
							<p className='text-tertiary text-text_placeholder'>
								{formatDistanceToNow(timestamp, { addSuffix: true })}
							</p>
						</div>
					</div>
				)

			default:
				return null
		}
	}

	const renderActions = () => {
		switch (variant) {
			case VARIANTS.Request:
				return (
					<div className='flex gap-x-2 items-center'>
						<Button
							variant='filled'
							className='h-8 w-max flex items-center justify-center px-2'
							text='Accept'
							callback={onAccept}
						/>
						<Button
							variant='outline'
							className='h-8 w-max flex items-center justify-center'
							text='Decline'
							callback={onDecline}
						/>
					</div>
				)

			case VARIANTS.Comment:
				return (
					<Button
						variant='filled'
						callback={headToContent}
						className='px-4 py-1'
						text='View'
					/>
				)

			case VARIANTS.Like:
				return (
					<Button
						variant='filled'
						callback={headToContent}
						className='px-4 py-1'
						text='View'
					/>
				)
			default:
				return null
		}
	}

	return (
		<div
			className={c(
				'flex justify-between items-center bg-header_blue p-2 rounded w-full',
				className
			)}
		>
			{renderContent()}
			<div className='flex items-center gap-x-2'>
				{renderActions()}
				<Button
					callback={onClick}
					variant='standard'
					className='rounded-3xl p-2'
				>
					<CloseIcon className='cursor-pointer' />
				</Button>
			</div>
		</div>
	)
}

export default React.memo(Notification)
