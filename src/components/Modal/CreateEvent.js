import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import EventMake from './EventMake'

const useStyles = makeStyles((theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		paper: {
			backgroundColor: 'transparent',
			border: '0px solid',
			borderRadius: '20px',
			boxShadow: theme.shadows[5],
			// padding: theme.spacing(2, 4, 3),
			padding: '0',
			outline: 'none'
		},
		buttoncreate: {
			// color: 'var(--text-primary)',
			// margin: '2px 30px',
			padding: '10px 20px',
			// padding: '0px',
			color: 'black',
			// filter: 'grayscale(50%) opacity(0.7)',
			transition: 'var(--transition-speed)',
			border: 'none',
			background: 'transparent',
			fontSize: '19px',
			outline: 'none',
			'&:hover': {
				color: 'rgba(0,150,255)'
			},
			MuiBackdropRoot: {
				backgroundColor: '#111'
			}
		}
	})
)

export default function TransitionsModal({ img }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<button
				type='button'
				onClick={handleOpen}
				className={classes.buttoncreate}
			>
				Fill the form
			</button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
				style={{
					backdropFilter: 'saturate(180%) blur(5px)'
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						{/* <h1>Hey there</h1> */}
						<EventMake imgus={img} handleClose={handleClose} />
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
