import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
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
		},
		{
			listIcon: <ExitToAppIcon />,
			listText: 'Logout',
			listPath: '/signin',
			on_click: () => {
				auth.signOut().then(() => {
					window.location.href = '/signin'
				})
			}
		}
	]

	const auth = useAuth()

	return (
		<div className='sidebar'>
			{sideItemList.map(({ listIcon, listPath, listText, on_click }, index) => (
				<NavLink
					key={index}
					to={listPath}
					onClick={on_click}
					exact
					className='link'
					activeClassName='link-active'
				>
					{listIcon}
					{listText}
				</NavLink>
			))}
		</div>
	)
}
