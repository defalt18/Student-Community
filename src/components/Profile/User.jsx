import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './User.css'
import avatar_icon from './Images/avatar.png'

function User({ userDetails }) {
	const { image, name, Name } = userDetails

	return (
		<Link to='/utsav' className='user-link flex-center'>
			<img className='img-user' src={image || avatar_icon} alt='User' />
			<span>{name || Name}</span>
		</Link>
	)
}

function UserList({ users }) {
	return users.map((user, index) => <User key={index} userDetails={user} />)
}

export { User, UserList }
