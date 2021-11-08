import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { HOME } from 'constants/routes'
import { useHistory } from 'react-router-dom'
import { useUser } from 'reactfire'

function VerificationScreen() {
	const history = useHistory()
	const { data: user } = useUser()

	if (user) {
		if (user.emailVerified) history.push(HOME, { details: 'new user' })
	}

	return (
		<div className='bg-body_blue h-screen w-screen grid place-items-center'>
			<div className='bg-header_blue p-8 rounded-xl'>
				<p className='text-primary text-white mb-6'>Verify your email</p>
				<div className='flex gap-x-3 text-white'>
					<CircularProgress color='inherit' />
					<div>
						<p className='text-secondary'>
							Please head over to your email to verify your email with us...
						</p>
						<p className='text-secondary'>
							As soon as you verify your credentials, you will be redirected. If
							not redirected after a few seconds hit refresh
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VerificationScreen
