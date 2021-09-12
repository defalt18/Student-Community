import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar_Chat__friends.css'
import { db } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'
// import ScrollIntoView from 'react-scroll-into-view'

function Sidebar_Chat__friends({ id }) {
	const { user } = useAuthListener()

	var userstring = user.uid.toString()
	const [messages, setMessages] = useState('')
	const [data, setda] = useState('')
	const [friends, setFriends] = useState([])

	useEffect(() => {
		if (id) {
			db.collection('users')
				.doc(userstring)
				.collection('friends')
				.doc(id)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				)
		}
		db.collection('users')
			.doc(id)
			.onSnapshot((snapshot) => {
				return setda(snapshot.data())
			})

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
	}, [id, friends.lastTime])

	return (
		<Link to={`/chats/${id}`}>
			<div className='sidebar_Chat__friends'>
				<Avatar src={data.image} />
				<div className='sidebar_Chat__friends__info'>
					<h2 style={{ margin: 0 }}>{data.Name}</h2>
					<p style={{ margin: 0 }}>{messages[0]?.message}</p>
				</div>
			</div>
		</Link>
	)
}

export default Sidebar_Chat__friends
