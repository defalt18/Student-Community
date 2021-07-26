import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import pic1 from './Students.png'
import pic2 from './Ribbon.png'
import { db } from '../../lib/firebase.prod'
import { Button } from '@material-ui/core'
import './WelcomeMod.css'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		paper: {
			backgroundColor: 'rgb(31,30,30)',
			border: '0px solid',
			borderRadius: '20px',
			boxShadow: theme.shadows[5],
			// padding: theme.spacing(2, 4, 3),
			padding: '0',
			outline: 'none',
			color: 'white'
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

export default function TransitionsModal({ uid }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(true)

	// const handleOpen = () => {
	//     setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false)
		db.collection('users').doc(uid).update({
			firstLogin: 0
		})
	}

	return (
		<div>
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
				style={
					{
						// backdropFilter: 'saturate(180%) blur(5px)',
					}
				}
			>
				<Fade in={open}>
					<div
						className={classes.paper}
						style={{
							padding: '20px',
							width: '50vw',
							position: 'relative',
							overflow: 'hidden'
						}}
					>
						<div>
							<h1 className='typewriter' style={{ zIndex: 1000 }}>
								Welcome to the Student Community
							</h1>
							<img
								src={pic2}
								height='100px'
								style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}
							/>
							<img
								src={pic1}
								height='120px'
								style={{ position: 'absolute', bottom: 10, right: 30 }}
							/>
						</div>
						<p style={{ width: '95%' }}>
							We welcome you to the student community website. This website
							offers students a chance to connect and interact with their fellow
							batchmates and seniors in an online atmosphere.
							<p>
								We intend to allow the students to grow in an environment where
								they learn from eachother.
							</p>
							<p>
								Explore the features involved by browsing in on the website and
								get comfortable. Start by setting up your profile!
							</p>
							<b>
								Please make sure that we keep this a healthy place and no vulgar
								as well as explicit content be shared on this platform
							</b>
							<p>
								Regards
								<br />
								Team Student Community
							</p>
						</p>
						<Button
							onClick={handleClose}
							variant='contained'
							style={{ margin: 'auto' }}
						>
							Agree and Continue
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
