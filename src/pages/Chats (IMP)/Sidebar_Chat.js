/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import './Sidebar_Chat.css'
import Avatar from '@material-ui/core/Avatar'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Sidebar_Chat__friends from './Sidebar_Chat__friends'
import { Firebase, db } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

function Sidebar_Chat() {
	const [friends, setFriends] = useState([])
	const [info, setInfo] = useState([])
	const { user } = useAuthListener()
	var userstring = user.uid.toString()
	var last_time
	const [search, setser] = useState([])
	const [open, setOpen] = React.useState(false)

	//below useEffect will run onMount only
	useEffect(() => {
		db.collection('users')
			.doc(userstring)
			.collection('friends')
			.orderBy('lastTime', 'desc')
			.onSnapshot((snapshot) => {
				setFriends(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						friend: doc.data()
					}))
				)
			})
	}, [friends.lastTime])

	//below useEffect will run onMount only
	useEffect(() => {
		db.collection('users')
			.doc(userstring)
			.onSnapshot((snapshot) => {
				setInfo(snapshot.data())
			})
	}, [])

	const handleClickAway = () => {
		setOpen(false)
	}

	const search_friends = (e) => {
		if (e.target.value !== '') {
			db.collection('users')
				.doc(userstring)
				.collection('friends')
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
		} else {
			setser('')
		}

		setOpen(true)
	}

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className='sidebar_Chat'>
				<div className='sidebar_chat__header'>
					{/* <div style={{display:'flex',backdropFilter:'saturate(180%) blur(10px)',width:'100%',alignItems:'center',gap:'20px'}}> */}
					<Avatar src={info.image} style={{ height: '70px', width: '70px' }} />
					<h1 style={{ fontSize: '30px' }}>{info.Name}</h1>
					{/* </div> */}
				</div>

				<div className='sidebar_Chat__search'>
					<div className='sidebar_Chat__searchContainer'>
						<SearchIcon />
						<input
							placeholder='Seacrh or start a new conversation'
							type='text'
							onChange={search_friends}
						/>
					</div>
				</div>

				{/* <div className="sidebar_Chat__addFriend">
                <Button variant="contained" color="secondary">
                    Add a Friend
                </Button>
            </div> */}

				{open && search !== '' ? (
					<div className='sidebar_chat__chats closing'>
						<div className='headings'>Your Search</div>
					</div>
				) : (
					<></>
				)}

				{open && search !== '' ? (
					<div className='sidebar_chat__chats closing'>
						{search.map(({ id, sers }) => (
							<Sidebar_Chat__friends id={id} />
						))}
					</div>
				) : (
					<></>
				)}

				{open && search !== '' ? (
					<div className='sidebar_chat__chats closing'>
						<div className='headings'>Your Chat</div>
					</div>
				) : (
					<></>
				)}

				<div className='sidebar_chat__chats'>
					{/* <Sidebar_Chat__friends /> */}
					{friends?.map(({ id, friend }) => (
						<Sidebar_Chat__friends id={id} />
					))}
				</div>
			</div>
		</ClickAwayListener>
	)
}

export default Sidebar_Chat
