import React, { useCallback } from 'react'
import { Avatar } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { Link } from 'react-router-dom'
import { useAsync } from 'react-use'
import { getUserDetailsById } from '../../services/user-utils'
import { db } from '../../lib/firebase.prod'

function Usersuggest({ keys, uid, user }) {
	const issueFollow = useCallback(async () => {
		await db
			.collection('users')
			.doc(user.uid)
			.collection('friends')
			.doc(uid)
			.set({
				status: 'friend'
			})

		await db
			.collection('users')
			.doc(uid)
			.collection('friends')
			.doc(user.uid)
			.set({
				status: 'friend'
			})
	}, [user, uid])

	const { value: userAbout } = useAsync(() => getUserDetailsById(uid))

	if (uid === 'bKRToNqa1MYgEoTcOzxa2slaTMP2') console.log(userAbout)
	return (
		<Link to={`/profile/${uid}`}>
			<div
				style={{
					display: `${userAbout?.club === 1 ? 'none' : 'flex'}`,
					gap: '1rem',
					padding: '15px 10px',
					alignItems: 'center',
					borderBottom: '0.5px solid rgba(0,0,0,0.3)'
				}}
			>
				<Avatar
					src={userAbout?.image}
					style={{ height: '2.5rem', width: '2.5rem' }}
				/>
				<div
					style={{
						display: 'flex',
						gap: '0.4rem',
						flexDirection: 'column',
						color: 'lightgray'
					}}
				>
					<p style={{ color: 'white', fontWeight: '600', margin: '0' }}>
						{userAbout?.firstname} {userAbout?.lastname}
					</p>
					<p style={{ margin: '0' }}>
						Stream :{' '}
						<span style={{ textTransform: 'uppercase' }}>
							{userAbout?.course}
						</span>
					</p>
				</div>
				<button
					onClick={issueFollow}
					style={{
						borderRadius: '5px',
						border: '0px',
						background: 'rgba(36, 160, 237, 0.9)',
						color: 'white',
						fontSize: 'medium',
						padding: '0.3rem',
						marginLeft: 'auto',
						fontWeight: '500',
						cursor: 'pointer'
					}}
				>
					<CheckIcon
						fontSize='small'
						className={keys}
						style={{ display: 'none' }}
					/>
					<p className={keys} style={{ margin: '0' }}>
						Follow
					</p>
				</button>
			</div>
		</Link>
	)
}

export default Usersuggest
