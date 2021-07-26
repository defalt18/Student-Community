import { Avatar } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}))

function Story({ storyData }) {
	const { avimg, name, imgurl } = storyData
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<div
				onClick={handleOpen}
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<Avatar
					src={avimg}
					style={{ height: 50, width: 50, border: '3px solid rgba(0,155,255)' }}
				/>
				<p style={{ margin: 0, marginTop: 2 }}>{name}</p>
			</div>
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
			>
				<Fade in={open} style={{ outline: 'none' }}>
					<div>
						<div
							style={{
								padding: '10px',
								position: 'absolute',
								background: 'rgba(0,0,0,0.2)',
								display: 'flex',
								gap: '10px',
								alignItems: 'center',
								color: 'white'
							}}
						>
							<Avatar src={avimg} />
							<p style={{ fontWeight: 'bold' }}>{name}</p>
						</div>
						<img src={imgurl} style={{ maxWidth: '40vw', maxHeight: '70vh' }} />
					</div>
				</Fade>
			</Modal>
		</>
	)
}

export default React.memo(Story)
