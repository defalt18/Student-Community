import React from 'react'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		}
	})
)

function Dialog(props) {
	const { open, toggle, children, className } = props
	const classes = useStyles()
	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={toggle}
			closeAfterTransition
		>
			<Fade in={open}>
				<div className={className}>{children}</div>
			</Fade>
		</Modal>
	)
}

export default Dialog
