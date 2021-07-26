/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { CircularProgress, CssBaseline } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuthListener } from '../../hooks'
import { db } from '../../lib/firebase.prod'
import CreateEvent from '../../components/Modal/CreateEvent'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import './Events.css'
import { useAsync } from 'react-use'
import { fetchAllEvents } from '../../services/event-utils'
import _map from 'lodash/map'
import { getUserDetailsById } from '../../services/user-utils'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

function Events() {
	const { user } = useAuthListener()
	const [open, setOpen] = useState(false)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	const { loading, value: events } = useAsync(() => fetchAllEvents())
	const { value: udata } = useAsync(() => getUserDetailsById(user.uid))

	console.log('Rendered', udata)

	return (
		<div className='Evnthd'>
			<CssBaseline />
			{loading ? (
				<div
					style={{
						display: 'flex',
						height: '50%',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<CircularProgress style={{ color: 'white' }} />
				</div>
			) : (
				<>
					<div
						className='appitem'
						style={{
							width: '60%',
							flex: 1,
							margin: 'auto',
							borderRadius: '5px',
							background: 'linear-gradient(45deg,rgba(255,50,0),purple)',
							display: 'flex',
							justifyContent: 'space-between',
							fontFamily: 'Poppins, sans-serif'
						}}
					>
						<div className='eveleft'>
							<h1 style={{ margin: 0, fontSize: '40px' }}>Upcoming Event</h1>
							<p style={{ fontSize: '25px', fontWeight: 'bold' }}>
								{events[0].data.name}
							</p>
							<p style={{ fontSize: '25px', fontWeight: 'bold' }}>
								Date : {events[0]?.data.date}
							</p>
							<p
								style={{
									margin: 0,
									fontSize: '25px',
									fontWeight: 'bold'
								}}
							>
								Time : {events[0]?.data.time}
							</p>
							<p
								style={{
									margin: 0,
									fontSize: '25px',
									fontWeight: 'bold'
								}}
							>
								Venue : {events[0]?.data.venue}
							</p>
						</div>
						<img
							src={events[0]?.data.poster}
							style={{
								maxHeight: '40vh',
								maxWidth: '50%',
								borderRadius: '5px'
							}}
						/>
					</div>
					{user.email.includes('club') !== true ? (
						<></>
					) : (
						<div className='appitem eventitem' style={{ margin: '20px auto' }}>
							<h1 style={{ margin: 0 }}>
								Want to create an event of your own !?
								<p style={{ fontSize: 'medium', fontWeight: 'normal' }}>
									Only clubs and committees shall have this unique priviledge of
									creating an event
								</p>
								<p
									style={{
										margin: '5px 0',
										borderRadius: '25px',
										width: '20%',
										fontWeight: 'normal',
										background: 'rgba(255,255,255)',
										display: 'flex',
										color: 'black',
										justifyContent: 'center'
									}}
								>
									<CreateEvent />
								</p>
							</h1>
						</div>
					)}
					<div className='eventitem'>
						<h1
							style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}
						>
							Scheduled events for this season
						</h1>
					</div>
					{_map(events, ({ id, data, participants }) => (
						<div
							key={id}
							className='eventitem'
							style={{
								background: `url("${data.poster}")`,
								borderRadius: '25px',
								backgroundPosition: 'center top'
							}}
						>
							<div
								className='appitem'
								style={{
									padding: 0,
									display: 'flex',
									backdropFilter: 'saturate(180%) blur(10px)',
									margin: 0
								}}
							>
								<div
									style={{
										background: 'rgba(0,0,0,0.7)',
										padding: '15px',
										borderTopLeftRadius: 'inherit',
										width: '50%',
										borderBottomLeftRadius: 'inherit'
									}}
								>
									<h1 style={{ textTransform: 'capitalize' }}>{data.name}</h1>
									<p>{data.desc}</p>
									<p>
										<b>Date : </b>
										{data.date}
									</p>
									<p>
										<b>Deadline : </b>
										{data.deadline}
									</p>
									<p>
										<b>Duration : </b>
										{data.duration}
									</p>
									<p>
										<b>Venue : </b>
										{data.venue}
									</p>
									<p>
										<b>Time : </b>
										{data.time}
									</p>
									<p>
										<b>Interested participants : </b>
										{participants.length}
									</p>
									{user.displayName !== 'Club' &&
										(participants.includes(user.uid) > 0 ? (
											<p className='registered'>Registered</p>
										) : (
											<p
												className='register_button'
												onClick={async () => {
													await db
														.collection('events')
														.doc(id)
														.collection('participants')
														.doc(user.uid)
														.set({
															...udata,
															followers: udata.followers.length
														})
													setOpen(true)
												}}
											>
												Click to register
											</p>
										))}
									<p>
										Regards
										<br />
										{data.org}
									</p>
								</div>
								<div
									style={{
										padding: '20px',
										width: '50%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<img
										src={data.poster}
										style={{
											maxWidth: '100%',
											maxHeight: '50vh',
											borderRadius: '10px'
										}}
									/>
								</div>
							</div>
						</div>
					))}
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity='success'>
							Successfully registered for then event
						</Alert>
					</Snackbar>
				</>
			)}
		</div>
	)
}

export default Events
