import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import _noop from 'lodash/noop'
import CameraIcon from '../../../../../../components/Icons/CameraIcon'

const imageStyles = {
	height: 120,
	width: 120
}

function UserImage(props) {
	const { src, callback = _noop } = props
	return (
		<div className='relative w-28 h-16'>
			<Avatar
				src={src}
				style={imageStyles}
				className='z-0 absolute bottom-10'
			/>
			<button
				className='z-5 absolute bottom-0 left-20 border-none'
				onClick={callback}
			>
				<CameraIcon />
			</button>
		</div>
	)
}

export default UserImage
