import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CameraIcon from 'components/Icons/CameraIcon'
import c from 'classnames'
import { useToggle } from 'react-use'
import Dialog from 'components/Dialog'
import ImagePopup from '../ImagePopup'

const imageStyles = {
	height: 120,
	width: 120
}

function UserImage(props) {
	const { className, ...rest } = props
	const [open, toggle] = useToggle(false)

	return (
		<div className={c('relative w-28 h-16', className)}>
			<Avatar
				src={rest?.src}
				style={imageStyles}
				className='z-0 absolute bottom-10'
			/>
			<button
				onClick={toggle}
				className='z-5 absolute bottom-0 left-20 border-none'
			>
				<CameraIcon />
			</button>
			<Dialog open={open} toggle={toggle}>
				<ImagePopup {...rest} />
			</Dialog>
		</div>
	)
}

export default React.memo(UserImage)
