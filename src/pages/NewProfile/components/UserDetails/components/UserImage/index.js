import React, { useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar'
import _noop from 'lodash/noop'
import _head from 'lodash/head'
import CameraIcon from 'components/Icons/CameraIcon'
import c from 'classnames'

const imageStyles = {
	height: 120,
	width: 120
}

function UserImage(props) {
	const { src, callback = _noop, className } = props

	const onChange = useCallback(
		async (_event) => {
			const { files } = _event.target
			callback(_head(files))
		},
		[callback]
	)

	return (
		<div className={c('relative w-28 h-16', className)}>
			<Avatar
				src={src}
				style={imageStyles}
				className='z-0 absolute bottom-10'
			/>
			<label
				htmlFor='userImage'
				className='cursor-pointer z-5 absolute bottom-0 left-20 border-none'
			>
				<CameraIcon />
			</label>
			<input
				type='file'
				name='image'
				accept='image/*'
				className='hidden'
				id='userImage'
				onChange={onChange}
			/>
		</div>
	)
}

export default UserImage
