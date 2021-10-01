import React from 'react'
import AvatarExternal from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

const useStyles = makeStyles(() => ({
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
}))

function Avatar(props) {
	const classes = useStyles()
	const { src, size = 'small', variant = 'normal' } = props

	if (variant === 'normal') {
		if (!src) return <AccountCircleOutlinedIcon />
		return <AvatarExternal src={src} className={classes[size]} />
	}

	if (variant === 'display')
		return (
			<AvatarExternal src={src} className={[classes[size], classes.outline]} />
		)
}

export default Avatar
