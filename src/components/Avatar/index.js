import React from 'react'
import AvatarExternal from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { AddIcon } from '../Icons'
import _noop from 'lodash/noop'

const styles = {
	small: {
		width: '2rem',
		height: '2rem'
	},
	medium: {
		width: '3rem',
		height: '3rem'
	},
	large: {
		width: '8rem',
		height: '8rem'
	},
	outline: {
		border: '2px solid #4a7cff'
	}
}
const useStyles = makeStyles(styles)

const addStyles = {
	margin: '30% auto'
}

function Avatar(props) {
	const classes = useStyles()
	const { src, size = 'small', variant = 'normal', callback = _noop } = props

	if (variant === 'normal') {
		if (!src) return <AccountCircleOutlinedIcon />
		return <AvatarExternal src={src} className={classes[size]} />
	}

	if (variant === 'display') {
		if (!src) return <AccountCircleOutlinedIcon className={classes[size]} />
		return (
			<AvatarExternal src={src} className={[classes[size], classes.outline]} />
		)
	}

	if (variant === 'story') {
		if (!src)
			return (
				<button onClick={callback} className='relative'>
					<div
						style={{ ...styles[size], borderRadius: '50%' }}
						className='z-10 absolute top-0 bottom-0 left-0 right-0 bg-darker_blue bg-opacity-40 '
					>
						<AddIcon fill={'#fff'} style={addStyles} />
					</div>
					<AccountCircleOutlinedIcon className={classes[size]} />
				</button>
			)
		return (
			<button onClick={callback} className='relative'>
				<div
					style={{ ...styles[size], borderRadius: '50%' }}
					className='z-10 absolute top-0 bottom-0 left-0 right-0 bg-darker_blue bg-opacity-40 '
				>
					<AddIcon fill={'#fff'} style={addStyles} />
				</div>
				<AvatarExternal
					src={src}
					className={[classes[size], classes.outline]}
				/>
			</button>
		)
	}
}

export default Avatar
