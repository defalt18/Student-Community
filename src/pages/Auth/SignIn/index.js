import React, { useCallback, useState } from 'react'
import daLogo from 'assets/images/DA-logo.png'
import Button from 'components/Button'
import { SIGN_UP, HOME, VERIFY } from 'constants/routes'
import { useAuth } from 'reactfire'
import { signInWithCredentials } from '../actions/auth'
import { useHistory } from 'react-router-dom'
import { useToggle } from 'react-use'
import Input from '../components/RegisterForm/components/Input'
import Dialog from 'components/Dialog'
import PageLoader from 'components/PageLoader'

const classes = {
	container: 'mt-8',
	input: 'p-3'
}

function SignIn() {
	const auth = useAuth()
	const history = useHistory()
	const [loading, toggle] = useToggle(false)
	const [credentials, setCredentials] = useState({
		email: '',
		password: ''
	})

	const onChange = useCallback(
		(_event) => {
			const { name, value } = _event.target
			setCredentials({ ...credentials, [name]: value })
		},
		[credentials, setCredentials]
	)

	const onSignIn = useCallback(
		async (_event) => {
			_event.preventDefault()
			toggle()
			const { user, error } = await signInWithCredentials(auth, credentials)
			if (user?.emailVerified && error === 'SUCCESS') {
				if (!user.emailVerified) history.push(VERIFY)
				else history.replace(HOME)
			}
			toggle()
		},
		[auth, credentials, history, toggle]
	)

	return (
		<div className='h-screen w-screen bg-body_blue flex text-white'>
			<div className='w-1/2 pl-24 flex items-center'>
				<div>
					<img src={daLogo} className='h-44 w-44 mb-16' />
					<p className='text-prompt text-white'>Welcome to DAIICT</p>
					<p className='text-prompt text-darker_blue mb-4'>Student Community</p>
					<p className='text-secondary-02 text-white'>
						This is DA's exclusive social network platform. Connect with your
						friends, seniors and clubs all virtually and get to know the latest
						of all the college life has to offer!
					</p>
				</div>
			</div>
			<div className='pl-16'>
				<form className='bg-black bg-opacity-50 border-0-5 p-12 rounded flex flex-col justify-center w-525 h-5/6'>
					<p className='text-primary text-white mb-12'>Sign In</p>
					<Input
						name='email'
						onChange={onChange}
						classes={classes}
						value={credentials.email}
						placeholder='Email ID'
					/>
					<Input
						name='password'
						onChange={onChange}
						classes={classes}
						value={credentials.password}
						placeholder='Password'
						type='password'
					/>
					<Button
						type='submit'
						callback={onSignIn}
						awaitResponse={false}
						className='mt-12 grid place-items-center'
						text='Sign In'
						variant='filled'
						size='large'
					/>
					<p className='text-secondary-02 text-white mt-24'>
						New to Student Community at DAIICT?{' '}
						<a href={SIGN_UP} className='underline'>
							Sign up now.
						</a>
					</p>
				</form>
			</div>
			<Dialog open={loading} toggle={toggle} className='outline-none'>
				<div className='bg-component_core grid place-items-center p-2'>
					<PageLoader type='loading' />
					<p className='text-secondary text-white'>Signing you in...</p>
				</div>
			</Dialog>
		</div>
	)
}

export default SignIn
