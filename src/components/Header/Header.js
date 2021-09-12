import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../lib/firebase.prod'
import IconButton from '@material-ui/core/IconButton'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import SchoolIcon from '@material-ui/icons/School'
import PeopleIcon from '@material-ui/icons/People'
import SearchIcon from '@material-ui/icons/Search'
import Avatar from '@material-ui/core/Avatar'
import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined'
import Badge from '@material-ui/core/Badge'
import './Header.css'
import CreatePost from '../Modal/CreatePost'
import { useLocation } from 'react-router-dom'
import { useAuthListener } from '../../hooks'
import Popover from '@material-ui/core/Popover'

const HeaderItemList = [
	{
		listIcon: <HomeIcon />,
		listText: 'Home',
		listPath: '/'
	},
	{
		listIcon: <SchoolIcon />,
		listText: 'Academic',
		listPath: '/resources'
	},
	{
		listIcon: <PeopleIcon />,
		listText: 'Clubs',
		listPath: '/clubs'
	}
]

function Header({ uimg }) {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	const { user } = useAuthListener()
	var userstring = user?.uid.toString()
	const [nots, setnots] = useState([])
	const [search, setser] = useState([])
	const [searchOpen, setSearchOpen] = useState(false)

	function opensearch() {
		setSearchOpen(true)
		var t = document.getElementsByClassName('header-item')
		var j = document.getElementsByClassName('createpost')

		for (var i = 0; i < t.length - 1; i++) {
			t[i].style.display = 'none'
		}
		t[3].style.display = 'block'
		t[3].style.transition = 'all 4s'
		j[0].style.display = 'none'
		console.log('open')
	}

	function closesearch() {
		if (searchOpen) {
			var t = document.getElementsByClassName('header-item')
			var j = document.getElementsByClassName('createpost')
			var gfg = document.getElementById('serres')

			for (var m = 0; m < t.length - 1; m++) {
				t[m].style.display = 'block'
			}
			t[3].style.display = 'none'
			j[0].style.display = 'block'
			gfg.style.display = 'none'
			setSearchOpen(false)
			console.log('close')
		}
	}

	let location = useLocation()

	function useOuterClick(callback) {
		const innerRef = useRef()
		const callbackRef = useRef()

		// set current callback in ref, before second useEffect uses it
		useEffect(() => {
			// useEffect wrapper to be safe for concurrent mode
			callbackRef.current = callback
		})

		useEffect(() => {
			document.addEventListener('click', handleClick)
			return () => document.removeEventListener('click', handleClick)

			// read most recent callback and innerRef dom node from refs
			function handleClick(e) {
				if (
					innerRef.current &&
					callbackRef.current &&
					!innerRef.current.contains(e.target)
				) {
					callbackRef.current(e)
				}
			}
		}, []) // no need for callback + innerRef dep

		return innerRef // return ref; client can omit `useRef`
	}

	const innerRef = useOuterClick(() => {
		// counter state is up-to-date, when handler is called
		// alert(`Clicked outside! Increment counter to ${counter + 1}`);
		// setCounter((c) => c + 1);
		closesearch()
	})

	// function delnot() {
	// 	const ref = db.collection('users').doc(user.uid).collection('Notifs')
	// 	ref.onSnapshot((snapshot) => {
	// 		snapshot.docs.forEach((doc) => {
	// 			ref.doc(doc.id).delete()
	// 		})
	// 	})
	// }

	useEffect(() => {
		if (user)
			db.collection('users')
				.doc(user.uid)
				.collection('Notifs')
				.onSnapshot((snapshot) => {
					setnots(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							noti: doc.data()
						}))
					)
				})
	}, [nots.length])

	const hanchan = (e) => {
		db.collection('users')
			.orderBy('Name')
			.startAt(e.target.value)
			.endAt(e.target.value + '\uf8ff')
			.get()
			.then((snapshot) => {
				setser(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						sers: doc.data()
					}))
				)
			})

		// setAnchorEl(event.currentTarget);
		// handleClick();
		document.getElementById('serres').style.display = ''
	}

	return (
		<div className='header'>
			<ul className='header-itemlist'>
				<ul className='header-itemlist-left'>
					<li className='header-logo'>
						<NavLink to='/' className='header-logolink'>
							<img
								className='header-logoimg header-logoitem'
								src='https://miro.medium.com/max/3150/1*i21kX4g8cdsSlkfx6Pu0CQ.png'
								alt='DA-LOGO'
							/>
							<div className='header-logoname header-logoitem'>
								Student Community
							</div>
						</NavLink>
					</li>
				</ul>
				<ul className='header-itemlist-center'>
					{HeaderItemList.map((item, key) => {
						return (
							<li
								className={`header-item ${
									item.listPath === location.pathname ? 'active-class' : ''
								}`}
								key={key}
							>
								<NavLink to={item.listPath} className='header-itemlink'>
									<div className='header-itemname'>{item.listText}</div>
								</NavLink>
							</li>
						)
					})}
					<li>
						<div className='createpost'>
							<CreatePost img={uimg} />
						</div>
					</li>
					<li ref={innerRef}>
						<input
							className='header-item header-itemname search-box-item'
							onChange={hanchan}
							type='text'
							placeholder='Search Community....'
							style={{
								background: '#232324',
								border: 'none',
								marginTop: '3px',
								color: 'white',
								display: 'none',
								width: '40vw',
								margin: '0'
							}}
						/>
						<div
							id='serres'
							style={{
								position: 'absolute',
								top: '55px',
								background: 'rgba(35,35,36)',
								borderBottomLeftRadius: '15px',
								borderBottomRightRadius: '15px',
								maxHeight: '30vh',
								overflow: 'auto'
							}}
						>
							{search.map(({ id, sers }) => (
								<NavLink to={`/profile/${id}`} key={id}>
									<div
										className='serele'
										key={id}
										style={{
											display: 'flex',
											gap: '0.5rem',
											margin: 0,
											padding: '10px',
											width: '40vw',
											cursor: 'pointer',
											alignItems: 'center',
											color: 'white'
										}}
									>
										<Avatar
											alt='Remy Sharp'
											src={sers.image}
											style={{
												height: 50,
												width: 50,
												fontSize: '15px'
											}}
										/>
										<h4 style={{ margin: 0 }}>{sers.Name}</h4>
									</div>
								</NavLink>
							))}
							{/* </Popover> */}
						</div>
					</li>
				</ul>
				<ul className='header-itemlist-right'>
					<li className='header-item-right'>
						<div className='header-itemicon header-right-'>
							<Badge color='secondary' badgeContent={0} variant='dot'>
								<SearchIcon onClick={opensearch} style={{ fontSize: '25px' }} />
							</Badge>
						</div>
					</li>
					<li className='header-item-right'>
						<div className='header-itemicon header-right-'>
							<Badge color='secondary' badgeContent={nots.length} variant='dot'>
								<div>
									<IconButton aria-describedby={id} onClick={handleClick}>
										<NotificationsNoneOutlinedIcon
											style={{ color: 'lightgray' }}
										/>
									</IconButton>
									{/* <Button aria-describedby={id} onClick={handleClick}>
                                    <NotificationsNoneOutlinedIcon
                                        style={{ fontSize: '25px' , color:'lightgray'}}
                                    />
                                </Button> */}
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
										// className={classes.paper}
									>
										{nots.map(({ id, noti }) => (
											<div
												key={id}
												className='notif-element'
												style={{
													display: 'flex',
													gap: '0.5rem',
													flexDirection: 'column',
													margin: 0,
													padding: '10px',
													width: '20vw',
													cursor: 'pointer'
												}}
											>
												<p
													style={{
														fontSize: '13px',
														margin: 0,
														color: 'lightgray'
													}}
												>
													{noti.text}
												</p>
											</div>
										))}
									</Popover>
								</div>
							</Badge>
						</div>
					</li>
					<li className='header-item-right'>
						<NavLink to='/chats' className='header-itemlink'>
							<div className='header-itemicon header-right-'>
								<Badge color='primary' badgeContent={0} variant='dot'>
									<ForumOutlinedIcon style={{ fontSize: '25px' }} />
								</Badge>
							</div>
						</NavLink>
					</li>
					<li className='header-item-right'>
						<NavLink
							to={`/profile/${userstring}/posts`}
							className='header-itemlink'
						>
							<div className='header-itemicon header-right-'>
								<Badge color='secondary' badgeContent={0} variant='dot'>
									<Avatar
										alt='Remy Sharp'
										src={uimg}
										style={{
											height: 25,
											width: 25,
											fontSize: '15px',
											border: '2px solid white'
										}}
									/>
								</Badge>
							</div>
						</NavLink>
					</li>
				</ul>
			</ul>
		</div>
	)
}

export default React.memo(Header)
