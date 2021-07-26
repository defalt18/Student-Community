import React, { useState } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import { useAuthListener } from '../../hooks'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import { Avatar, Button, CircularProgress, IconButton } from '@material-ui/core'
import { Header, Sidebar } from '../../components'
import { Post } from '../../components'
import { Link } from 'react-router-dom'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import FacebookIcon from '@material-ui/icons/Facebook'
import Grid from '@material-ui/core/Grid'
import FaceIcon from '@material-ui/icons/School'
import './Proj.css'
import SchoolIcon from '@material-ui/icons/AccountBalance'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import InstagramIcon from '@material-ui/icons/Instagram'
import EditProfile from '../../components/Modal/EditProfileModal'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MailIcon from '@material-ui/icons/Mail'
import Chip from '@material-ui/core/Chip'
import cov from './Images/cover__new.png'
import Popover from '@material-ui/core/Popover'
import _orderBy from 'lodash/orderBy'
import {
	useFirestore,
	useFirestoreCollectionData,
	useFirestoreDocData
} from 'reactfire'
import {
	updateMinimalUser,
	uploadImage,
	uploadPhotoForUserId
} from '../../services/user-utils'
import { ErrorOutline } from '@material-ui/icons'

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			club='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			style={{ width: '100%' }}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: 'inherit',
		color: 'white',
		display: 'flex',
		height: 'auto'
	},
	tabs: {
		borderRight: `0px solid rgba(255,255,255,0.2)`
	},
	divider: {
		background: 'rgba(0,0,0,0.5)'
	},
	typography: {
		padding: theme.spacing(2),
		color: 'lightgray'
	},
	bio: {
		color: 'lightgray',
		fontSize: 'large',
		textAlign: 'center',
		width: '100%'
	}
}))

function Prof(props) {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const { user } = useAuthListener()

	const uid = props.match.params.id.toString()

	const { data: posts } = useFirestoreCollectionData(
		useFirestore().collection('posts').where('UID', '==', uid)
	)

	const { status: userLoading, data: minimalUser } = useFirestoreDocData(
		useFirestore().collection('users').doc(uid)
	)
	const { data: minimalUserLoggedIn } = useFirestoreDocData(
		useFirestore().collection('users').doc(user.uid)
	)

	const { status, data: about } = useFirestoreCollectionData(
		useFirestore().collection('users').doc(uid).collection('About')
	)

	const { data: photos } = useFirestoreCollectionData(
		useFirestore().collection('users').doc(uid).collection('photos')
	)

	const { data: events } = useFirestoreCollectionData(
		useFirestore().collection('events').where('uid', '==', uid)
	)

	const { data: friends } = useFirestoreCollectionData(
		useFirestore().collection('users').doc(uid).collection('friends')
	)

	const handlechange = async (_event) => {
		const image = _event.target.files[0]
		const url = await uploadImage(image)
		await updateMinimalUser({ ...minimalUser, cover: url, uid: user.uid })
	}
	const handlechangedp = async (_event) => {
		const image = _event.target.files[0]
		const url = await uploadImage(image)
		await updateMinimalUser({ ...minimalUser, image: url, uid: user.uid })
	}

	const handlephotoupload = async (_event) => {
		const image = _event.target.files[0]
		const url = await uploadImage(image)
		await uploadPhotoForUserId(user.uid, url)
	}

	const convert = (date) => {
		let year = Number(date.substring(0, 4)),
			month = Number(date.substring(5, 7)),
			day = Number(date.substring(8))
		return new Date(year, month - 1, day)
	}

	return (
		<>
			<Header uimg={minimalUserLoggedIn?.image} />
			<Sidebar />
			{status === 'success' && userLoading === 'success' ? (
				<>
					{user.uid === props.match.params.id ? (
						<>
							<input
								onChange={handlechange}
								accept='image/*'
								type='file'
								id='cover'
								style={{ display: 'none' }}
							/>
							<Typography
								style={{
									position: 'fixed',
									background: 'rgb(31,30,30)',
									width: 'auto',
									textAlign: 'center',
									top: '80px',
									right: '20px',
									zIndex: 1,
									color: 'white',
									padding: '10px',
									borderRadius: '10px',
									cursor: 'pointer'
								}}
							>
								<label
									htmlFor='cover'
									style={{ padding: 0, margin: 0, cursor: 'pointer' }}
								>
									Upload Cover
								</label>
							</Typography>
						</>
					) : null}

					<img
						src={minimalUser.cover === '' ? cov : minimalUser.cover}
						style={{
							position: 'fixed',
							objectFit: 'cover',
							boxShadow: '0 3px 5px 0 black',
							top: 0,
							width: '100vw',
							height: '60vh'
						}}
					/>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							paddingTop: '30vh',
							paddingBottom: '5vh',
							background: '#151516',
							minHeight: '100vh',
							paddingLeft: '60px'
						}}
					>
						<div
							style={{
								margin: 'auto',
								background: 'rgb(31,30,30)',
								boxShadow: '0 3px 5px 0 black',
								position: 'relative',
								width: '75vw',
								borderRadius: '10px',
								padding: '20px'
							}}
						>
							<Avatar
								onClick={handleClick}
								src={minimalUser.image}
								style={{
									height: '150px',
									width: '150px',
									position: 'absolute',
									left: '50%',
									transform: 'translate(-50%,-50%)',
									top: 0
								}}
							/>
							<Popover
								className='popover'
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center'
								}}
							>
								<a href={minimalUser.image}>
									<Typography className={classes.typography}>
										View Image
									</Typography>
								</a>
								{user.uid === props.match.params.id ? (
									<>
										<input
											onChange={handlechangedp}
											accept='image/*'
											type='file'
											id='dp'
											style={{ display: 'none' }}
										/>
										<Typography
											className={classes.typography}
											style={{ cursor: 'pointer' }}
										>
											<label htmlFor='dp'>Upload Image</label>
										</Typography>
									</>
								) : (
									<></>
								)}
							</Popover>
							<div
								className='Stats'
								style={{
									display: 'flex',
									gap: '20px',
									alignItems: 'center',
									padding: '0 5vw'
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center'
									}}
								>
									<d
										style={{
											fontSize: 'xx-large',
											fontWeight: 'bold',
											color: 'white'
										}}
									>
										{friends?.length}
									</d>
									<d style={{ color: 'lightgray' }}>Friends</d>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center'
									}}
								>
									<d
										style={{
											fontSize: 'xx-large',
											fontWeight: 'bold',
											color: 'white'
										}}
									>
										{posts?.length}
									</d>
									<d style={{ color: 'lightgray' }}>Posts</d>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center'
									}}
								>
									<d
										style={{
											fontSize: 'xx-large',
											fontWeight: 'bold',
											color: 'white'
										}}
									>
										{photos?.length}
									</d>
									<d style={{ color: 'lightgray' }}>Photos</d>
								</div>
								{minimalUser.club === 1 && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center'
										}}
									>
										<d
											style={{
												fontSize: 'xx-large',
												fontWeight: 'bold',
												color: 'white'
											}}
										>
											{events?.length}
										</d>
										<d style={{ color: 'lightgray' }}>Events</d>
									</div>
								)}
								<Button
									variant='contained'
									style={{
										marginLeft: 'auto',
										background: 'rgba(0,150,255,0.7)',
										color: 'white'
									}}
								>
									{user.uid === props.match.params.id ? (
										<EditProfile uid={user.uid} />
									) : friends?.includes(user.uid) ? (
										<d onClick={() => console.log('followed')}>Following</d>
									) : (
										<d onClick={() => console.log('followed')}>Follow</d>
									)}
								</Button>
							</div>
							<h1
								style={{
									margin: 'auto',
									color: 'white',
									textAlign: 'center',
									textTransform: 'capitalize'
								}}
							>
								{about[0].firstname} {about[0].lastname}
							</h1>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexDirection: 'column'
								}}
							>
								{minimalUser.club === 1 ? (
									<Chip
										avatar={
											<PeopleIcon style={{ color: 'rgba(0,100,255,1)' }} />
										}
										label='Club'
										variant='outlined'
										style={{
											color: 'rgba(0,100,255,1)',
											borderColor: 'rgba(0,100,255,1)',
											marginTop: '10px',
											fontSize: '15px',
											padding: '0 10px',
											background: 'rgba(0,100,255,0.2)'
										}}
									/>
								) : (
									<Chip
										avatar={<FaceIcon style={{ color: 'darkgreen' }} />}
										label='Student'
										variant='outlined'
										style={{
											color: 'green',
											borderColor: 'darkgreen',
											marginTop: '10px',
											background: 'rgba(0,255,0,0.05)'
										}}
									/>
								)}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '10px',
										color: 'gray',
										justifyContent: 'center'
									}}
								>
									<LocationOnIcon fontSize='medium' />
									<h2>
										{about[0].city}, {about[0].state}
									</h2>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '30px',
										gap: '10px',
										color: 'gray',
										justifyContent: 'center'
									}}
								>
									<SchoolIcon fontSize='medium' />
									<d style={{ fontSize: '20px', textTransform: 'uppercase' }}>
										{about[0].degree} {about[0].batch}, {about[0].course}
									</d>
								</div>
							</div>
							<p
								style={{
									position: 'relative',
									textAlign: 'center',
									color: 'lightgray',
									fontSize: 'large',
									padding: '10px 10vw'
								}}
							>
								{minimalUser.club !== 1 ? (
									<d>Hey I am a student at DAIICT!</d>
								) : (
									<d>We are a club at DAIICT!</d>
								)}
							</p>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'white'
								}}
							>
								{about[0].insta === undefined ? (
									<></>
								) : (
									<IconButton href={about[0].insta}>
										<InstagramIcon style={{ color: '#DD2A7B' }} />
									</IconButton>
								)}
								{about[0].fb === undefined ? (
									<></>
								) : (
									<IconButton href={about[0].fb}>
										<FacebookIcon style={{ color: '#4267B2' }} />
									</IconButton>
								)}
								{about[0].whatsapp === undefined ? (
									<></>
								) : (
									<Tooltip title={about[0].whatsapp}>
										<IconButton>
											<WhatsAppIcon style={{ color: 'green' }} />
										</IconButton>
									</Tooltip>
								)}
								{about[0].linkedin === undefined ? (
									<></>
								) : (
									<IconButton href={about[0].linkedin}>
										<LinkedInIcon color='primary' />
									</IconButton>
								)}
								<a href={'mailto:' + about[0].studentid + '@daiict.ac.in'}>
									<IconButton>
										<MailIcon style={{ color: 'red' }} />
									</IconButton>
								</a>
							</div>
							<div className={classes.root}>
								<Tabs
									orientation='vertical'
									variant='scrollable'
									value={value}
									onChange={handleChange}
									aria-label='Vertical tabs example'
									className={classes.tabs}
								>
									<Tab label='Posts' {...a11yProps(0)} />
									<Tab label='About' {...a11yProps(1)} />
									<Tab label='Photos' {...a11yProps(2)} />
									{minimalUser?.club === 1 && (
										<Tab label='Events' {...a11yProps(3)} />
									)}
								</Tabs>
								<TabPanel value={value} index={0}>
									{posts?.length > 0 ? (
										_orderBy(posts, ['timestamp'], ['desc']).map((post) =>
											post.UID === props.match.params.id ? (
												<div
													className='appitem'
													style={{
														padding: '0',
														background: 'transparent'
													}}
												>
													<Post
														key={post.NO_ID_FIELD}
														// pid={id}
														// lclss={post.UID}
														// usernm={post.username}
														// text={post.caption}
														// img={post.imageUrl}
														// likes={post.likes}
														// comments={post.comments}
														postData={{ ...post, postId: post.NO_ID_FIELD }}
														userdata={minimalUser}
													/>
												</div>
											) : (
												<></>
											)
										)
									) : (
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												color: 'gray',
												alignItems: 'center',
												gap: '10px',
												justifyContent: 'center'
											}}
										>
											<ErrorOutline style={{ fontSize: '100px' }} />
											<d style={{ fontSize: '35px', color: 'gray' }}>
												No posts to show!
											</d>
										</div>
									)}
								</TabPanel>
								<TabPanel value={value} index={1}>
									<div style={{ display: 'flex', gap: '20px' }}>
										<div style={{ width: '50%' }}>
											<h2 style={{ margin: 0 }}>Personal Information</h2>
											<hr />
											<p>First Name : {about[0].firstname}</p>
											<p>Last Name : {about[0].lastname}</p>
											<p>Birthday : {about[0].birthdate}</p>
											<p style={{ textTransform: 'capitalize' }}>
												Gender : {about[0].gender}
											</p>
										</div>
										<div style={{ width: '50%' }}>
											<h2 style={{ margin: 0 }}>Educational Information</h2>
											<hr />
											<p style={{ textTransform: 'capitalize' }}>
												Degree : {about[0].degree}
											</p>
											<p>Batch : {about[0].batch}</p>
											<p>
												Course :{' '}
												<d style={{ textTransform: 'uppercase' }}>
													{about[0].course}
												</d>
											</p>
											<p style={{ textTransform: 'capitalize' }}>
												Country : {about[0].country}
											</p>
										</div>
									</div>
									<div style={{ width: '100%' }}>
										<h2 style={{ margin: 0 }}>Skill Set</h2>
										<hr />
										<div className='about-right-skill-set'>
											{about[0].skills?.map((skill) => (
												<div className='about-right-skill-item' key={id}>
													{skill}
												</div>
											))}
										</div>
									</div>
								</TabPanel>
								<TabPanel value={value} index={2}>
									<div
										style={{
											position: 'sticky',
											display: 'flex',
											top: 0,
											alignItems: 'center',
											justifyContent: 'space-between',
											padding: '10px 20px',
											background: 'inherit',
											boxShadow: '0 5px 5px 0 rgba(0,0,0,0.5)'
										}}
									>
										<Avatar
											src={minimalUser?.image}
											style={{ margin: `${user.uid !== uid ? 'auto' : ''}` }}
										/>
										<input
											type='file'
											id='photos'
											accept='image/*'
											onChange={handlephotoupload}
											style={{ display: 'none' }}
										/>
										{user.uid === uid ? (
											<Button
												variant='contained'
												style={{
													background: 'rgba(0,150,255,0.7)',
													color: 'white'
												}}
											>
												<label htmlFor='photos'>Upload Photos</label>
											</Button>
										) : (
											<></>
										)}
									</div>
									<div style={{ maxHeight: '90vh', overflow: 'auto' }}>
										<Grid container spacing={0}>
											{photos?.map((pic) => (
												<Grid item xs={4}>
													<img
														src={pic.image}
														style={{
															objectFit: 'cover',
															maxHeight: '200px',
															margin: 0,
															boxShadow: '0 0 3px 0 black'
														}}
													/>
												</Grid>
											))}
										</Grid>
									</div>
								</TabPanel>
								{minimalUser?.club === 1 && (
									<TabPanel value={value} index={3}>
										<h2 style={{ margin: '0 5px', marginBottom: '10px' }}>
											Events by {about[0].studentid} will show here
										</h2>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: '20px'
											}}
										>
											{events?.map((data) => (
												<div
													style={{
														display: 'flex',
														width: '100%',
														padding: '20px',
														background: 'black',
														alignItems: 'center',
														borderRadius: '20px'
													}}
												>
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
															gap: '10px'
														}}
													>
														<h3 style={{ margin: 0 }}>{data.name}</h3>
														{new Date(
															new Date().getFullYear(),
															new Date().getMonth(),
															new Date().getDate()
														) < convert(data.date) ? (
															<Chip
																label='Running'
																variant='outlined'
																style={{
																	color: 'rgba(0,200,100,1)',
																	width: 'fit-content',
																	borderColor: 'rgba(0,200,100,1)',
																	padding: '0 10px',
																	background: 'rgba(0,200,100,0.2)'
																}}
															/>
														) : (
															<Chip
																label='Completed'
																variant='outlined'
																style={{
																	color: 'rgba(200,100,0,1)',
																	width: 'fit-content',
																	borderColor: 'rgba(200,100,0,1)',
																	padding: '0 10px',
																	background: 'rgba(200,100,0,0.2)'
																}}
															/>
														)}
														<p style={{ margin: 0 }}>Date : {data.date}</p>
														<p style={{ margin: 0 }}>
															Deadline : {data.deadline}
														</p>
														{user.uid === uid && (
															<Link to={`/participants/${id}`}>
																<Button
																	style={{
																		width: 'fit-content',
																		background: 'white',
																		color: 'black'
																	}}
																>
																	See Participants
																</Button>
															</Link>
														)}
													</div>
													<div
														style={{ borderRadius: '5px', marginLeft: 'auto' }}
													>
														<img
															src={data.poster}
															alt={data.name}
															style={{
																height: '150px',
																borderRadius: '5px',
																marginLeft: 'auto'
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</TabPanel>
								)}
							</div>
						</div>
					</div>
				</>
			) : (
				<CircularProgress />
			)}
		</>
	)
}

export default React.memo(Prof)
