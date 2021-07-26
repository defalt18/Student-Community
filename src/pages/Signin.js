/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '../components'
import * as ROUTES from '../constants/routes'
import './Signin.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useAuth } from 'reactfire'

export default function SignIn() {
	const auth = useAuth()
	const history = useHistory()
	// const { firebase } = useContext(FirebaseContext);
	const [emailAddress, setEmailAddress] = useState('')
	// const [firstname, setFirstName] = useState('');
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const isInvalid = password === '' || emailAddress === ''

	const handleSignin = async (event) => {
		event.preventDefault()

		const result = await auth.signInWithEmailAndPassword(emailAddress, password)
		console.log(result)
		history.push(ROUTES.HOME)
	}

	return (
		<>
			<div className='signin-page'>
				<div className='warni'>
					<span
						style={{
							borderRadius: '10px',
							border: '1px solid white',
							padding: '0 5px',
							margin: '0 10px'
						}}
					>
						!
					</span>
					For best viewing experience, open in the latest Google Chrome browser
					on PC and Laptops only
				</div>
				<div className='spacer1'>
					<div className='spacer2'></div>
				</div>
				<div className='headsofda'>
					<img
						className='header-logoimg header-logoitem'
						src='https://miro.medium.com/max/3150/1*i21kX4g8cdsSlkfx6Pu0CQ.png'
						alt='DA-LOGO'
						style={{ height: '150px' }}
					/>
					<h1 style={{ margin: 0 }}>Welcome to DA-IICT</h1>
					<h1
						style={{
							margin: 0,
							fontSize: '65px',
							lineHeight: '50px',
							color: 'rgba(0,150,255)'
						}}
					>
						{' '}
						Student Community
					</h1>
					<p style={{ fontSize: '30px', color: 'lightblue', width: '80%' }}>
						DA's exclusive social network! <br />
						Connect with your friends, seniors and clubs all virtually and get
						to know the latest of all the college life has to offer!
					</p>
				</div>
				<div
					className='masthead'
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						fontSize: '20px',
						color: 'lightgray',
						margin: 0,
						bottom: 0,
						width: '100%',
						textAlign: 'center',
						background: 'rgba(0,0,0,0.95)'
					}}
				>
					<div
						className='name'
						style={{
							display: 'flex',
							margin: 0,
							fontWeight: 'normal',
							alignItems: 'center',
							gap: '20px'
						}}
					>
						Founders :<p style={{ margin: 0 }}>Kushagra Pathak</p>
						<p style={{ margin: 0 }}>Ridham Suvagiya</p>
						<p style={{ margin: 0 }}>Ravi Patel</p>
					</div>
				</div>
				<Form style={{ position: 'absolute', margin: 0, right: '50px' }}>
					<Form.Title>Sign In</Form.Title>
					{error && <Form.Error data-testid='error'>{error}</Form.Error>}

					<Form.Base onSubmit={handleSignin} method='POST'>
						<Form.Input
							placeholder='Email address'
							value={emailAddress}
							onChange={({ target }) => setEmailAddress(target.value)}
							style={{ background: '#151516' }}
						/>
						<Form.Input
							type='password'
							value={password}
							autoComplete='off'
							placeholder='Password'
							onChange={({ target }) => setPassword(target.value)}
							style={{ background: '#151516' }}
						/>
						<Form.Submit
							disabled={isInvalid}
							type='submit'
							data-testid='sign-in'
							onClick={() => {
								document.getElementById('bosig').innerText = 'Signing in'
								document.getElementById('sucsig').style.display = ''
							}}
							style={{
								background: '#073589',
								display: 'flex',
								gap: '20px',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<p id='bosig' style={{ margin: 0, padding: 0 }}>
								Sign In
							</p>
							<CircularProgress
								id='sucsig'
								size={25}
								style={{ display: 'none', color: 'white' }}
							/>
						</Form.Submit>
					</Form.Base>

					<Form.Text>
						New to Student Community @DAIICT?{' '}
						<Form.Link to='/signup'>Sign up now.</Form.Link>
					</Form.Text>
				</Form>
			</div>
		</>
	)
}
