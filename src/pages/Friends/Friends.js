import { React, useState, useEffect } from 'react'
import Friendelement from './Friendelement'
import SearchIcon from '@material-ui/icons/Search'
import { db } from '../../lib/firebase.prod'
import { useAuthListener } from '../../hooks'

function Friends() {
	const [friends, setFriends] = useState([])
	const { user } = useAuthListener()
	var userstring = user.uid.toString()

	useEffect(() => {
		db.collection('users')
			.doc(userstring)
			.collection('friends')
			.onSnapshot((snapshot) => {
				setFriends(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						friend: doc.data()
					}))
				)
			})
	}, [userstring])

	return (
		<div
			style={{
				background: '#151516',
				paddingLeft: '100px',
				color: 'white',
				width: 'auto',
				height: '100vh',
				overflow: 'auto',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					alignItems: 'center'
				}}
			>
				<h1 style={{ paddingTop: '65px' }}>Your Friends</h1>
				<div
					style={{
						paddingTop: '65px',
						paddingRight: '20px',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<SearchIcon style={{ fontSize: '30px', color: 'gray' }} />
					<input
						type='text'
						placeholder='Search your friends..'
						style={{
							background: '#111',
							color: 'white',
							width: '30vw',
							border: 'none',
							padding: '10px',
							fontSize: 'medium',
							borderRadius: '15px'
						}}
					/>
				</div>
			</div>
			<div
				className='friendlist'
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
					gridGap: '10px',
					padding: '10px'
				}}
			>
				{friends.map(({ id }) => (
					<Friendelement uid={id} key={id} />
				))}
			</div>
		</div>
	)
}

export default Friends
