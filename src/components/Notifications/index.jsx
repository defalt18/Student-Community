import React, { useCallback } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { Link, useHistory } from 'react-router-dom'
import Button from '../Button'
import Avatar from '../Avatar'
import c from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { clearNotificationById } from 'services/user-utils'

const VARIANTS = {
	Request: 'request',
	Like: 'like',
	Comment: 'comment'
}

function Notification(props) {
	const {
		className,
		variant,
		timestamp,
		contentId,
		creator,
		NO_ID_FIELD,
		user
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

	const renderContent = () => {
		switch (variant) {
			case VARIANTS.Request:
				return null

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
				return null

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
