import React, { useCallback, useState } from 'react'
import daLogo from 'assets/images/DA-logo.png'
import Button from 'components/Button'
import { SIGN_UP, HOME, VERIFY } from 'constants/routes'
import { useAuth } from 'reactfire'
import { signInWithCredentials } from '../actions/auth'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { useToggle } from 'react-use'
import Input from '../components/RegisterForm/components/Input'

const classes = {
	container: 'mt-8',
	input: 'p-3'
}
const Loader = ({ loading }) => {
	return (
		<div className='absolute h-screen w-full pointer-events-none'>
			{loading ? (
				<div className='text-black bg-gray-300 mx-auto mt-16 max-w-max rounded p-3 flex gap-x-3 items-center justify-center'>
					<CircularProgress
						color='inherit'
						style={{
							height: 20,
							width: 20
						}}
					/>
					<p className='text-secondary'>Signing you in...</p>
				</div>
			) : null}
		</div>
	)
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
			console.log(user)
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
			<Loader loading={loading} />
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
				<form className='bg-black border border-white border-opacity-40 p-12 rounded flex flex-col justify-center w-525 h-5/6'>
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
						className='mt-12'
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
		</div>
	)
}

export default SignIn
