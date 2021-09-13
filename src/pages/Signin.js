import React from 'react'
import { Link } from 'react-router-dom'
import DA_Logo from '../assets/images/DA-logo.png'

function Signin() {
	return (
		<div className='w-full h-screen grid grid-cols-2 bg-red-600'>
			<div>
				<img src={DA_Logo} alt='DAIICT' />
				<h1>Welcome to DAIICT</h1>
				<h1>Student Community</h1>
				<p>
					This is DA's exclusive social network platform. Connect with your
					friends, seniors and clubs all virtually and get to know the latest of
					all the college life has to offer!
				</p>
			</div>
			<div>
				<form>
					<header>Sign In</header>
					<input type='text' />
					<input type='password' />
					<button>Sign In</button>
					<div>
						New to Student Community at DAIICT?
						<Link to='/signup'>Sign up now.</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signin
