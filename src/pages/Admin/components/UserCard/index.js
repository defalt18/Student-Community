import React, { useCallback } from 'react'
import _noop from 'lodash/noop'
import { Avatar } from '@material-ui/core'
import creator_dummy from 'assets/images/creator_dummy.png'

const COLORS_STYLES = {
	user: {
		backgroundColor: 'rgba(156, 219, 20, 0.1)',
		color: '#9cdb14'
	},
	button: {
		backgroundColor: 'rgba(218, 74, 91, 0.1)',
		color: '#DA4A5B'
	}
}

const imageStyles = {
	height: 120,
	width: 120
}

function UserCard(props) {
	const {
		callback = _noop,
		username,
		firstName,
		lastName,
		city,
		country,
		uid,
		batch,
		cover,
		degree,
		course,
		image,
		bio
	} = props

	const onClick = useCallback(async () => {
		await callback(uid, { image, cover })
	}, [callback, image, uid, cover])

	return (
		<div className='relative bg-component_core bg-opacity-50 p-5 flex flex-col items-center rounded'>
			<div className='justify-between flex items-center w-full'>
				<div
					style={COLORS_STYLES.user}
					className='p-1 px-4 rounded-xl uppercase text-secondary font-bold'
				>
					user
				</div>
				<button
					onClick={onClick}
					style={COLORS_STYLES['button']}
					className='text-secondary p-1 px-4 rounded-xl font-bold'
				>
					DELETE
				</button>
			</div>
			<div className='flex-1'>
				<div className='flex flex-col gap-y-3 my-4 items-center'>
					<Avatar src={image || creator_dummy} style={imageStyles} />
					<p className='text-secondary text-white text-3xl font-bold'>
						{username}
					</p>
					<p className='text-secondary text-white max-h-56 truncate'>{bio}</p>
					<p className='text-secondary text-white'>
						{firstName} {lastName}
					</p>
					<p className='text-secondary text-outline_blue'>UID: {uid}</p>
					<p className='text-secondary text-white'>
						{city}, {country}
					</p>
					<p className='text-secondary text-white'>
						{degree} | {course} | {batch} Batch
					</p>
				</div>
			</div>
		</div>
	)
}

export default React.memo(UserCard)
