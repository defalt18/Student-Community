/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { FirebaseContext } from '../../context/firebase'
import HomeIcon from '@material-ui/icons/Home'
import EventIcon from '@material-ui/icons/Event'
import PeopleIcon from '@material-ui/icons/People'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PollIcon from '@material-ui/icons/Poll'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useAuthListener } from '../../hooks'
import { useAuth } from 'reactfire'

export default function Sidebar() {
	const { user } = useAuthListener()
	const sideItemList = [
		{
			listIcon: <HomeIcon />,
			listText: 'Home',
			listPath: '/'
		},
		{
			listIcon: <PeopleIcon />,
			listText: 'Friends',
			listPath: '/friends'
		},
		{
			listIcon: <PollIcon />,
			listText: 'Polling',
			listPath: '/polling'
		},
		{
			listIcon: <EventIcon />,
			listText: 'Events',
			listPath: '/events'
		},
		{
			listIcon: <AccountCircleIcon />,
			listText: 'Profile',
			listPath: `/profile/${user?.uid}`
		}
	]
	// const { firebase } = useContext(FirebaseContext);
	const auth = useAuth()

	return (
		<div className='sidebar'>
			<ul className='sidebar-itemlist'>
				{/* logo upper */}
				<li className='sidebar-logo'>
					<NavLink to='/' className='sidebar-itemlink'>
						<div className='sidebar-itemname sidebar-logoname'>DA-IICT</div>
						<svg
							aria-hidden='true'
							focusable='false'
							data-prefix='fad'
							data-icon='angle-double-right'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'
							className='svg-inline--fa fa-angle-double-right fa-w-14 fa-5x sidebar-itemicon'
						>
							<g className='fa-group'>
								<path
									fill='currentColor'
									d='M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z'
									className='fa-secondary'
								></path>
								<path
									fill='currentColor'
									d='M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z'
									className='fa-primary'
								></path>
							</g>
						</svg>
					</NavLink>
				</li>
				{sideItemList.map((item, key) => {
					return (
						<li className='sidebar-item' key={key}>
							<NavLink to={item.listPath} className='sidebar-itemlink'>
								<div className='sidebar-itemicon fa-primary'>
									{item.listIcon}
								</div>
								<div className='sidebar-itemname'>{item.listText}</div>
							</NavLink>
						</li>
					)
				})}

				<li className='sidebar-item'>
					<NavLink
						to='/signin'
						onClick={() =>
							auth.signOut().then(() => {
								window.location.href = '/signin'
							})
						}
						className='sidebar-itemlink'
					>
						<div className='sidebar-itemicon fa-primary'>
							<ExitToAppIcon />
						</div>
						<div className='sidebar-itemname'>Signout</div>
					</NavLink>
				</li>
			</ul>
		</div>
	)
}
