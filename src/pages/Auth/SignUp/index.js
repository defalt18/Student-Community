import React from 'react'
import { ArrowBackIos } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { SIGN_IN } from 'constants/routes'
import RegisterForm from '../components/RegisterForm'

const ButtonStyles = {
	position: 'absolute',
	top: '4rem',
	left: '2rem',
	color: 'white'
}

function SignUp() {
	return (
		<div className='min-h-screen w-screen bg-black text-white'>
			<div className='relative w-full h-44 bg-gradient-to-r from-light_blue to-darker_blue grid text-white place-items-center'>
				<IconButton href={SIGN_IN} style={ButtonStyles} disableRipple>
					<ArrowBackIos color='inherit' className='ml-1' />
				</IconButton>
				<div className='flex flex-col'>
					<p className='font-prompt_head text-4xl mx-auto'>Join</p>
					<p className='font-prompt_head text-4xl'>DAIICT Student Community</p>
				</div>
			</div>
			<div className='mx-auto w-7/12 flex flex-col items-center'>
				<div className='border border-white border-opacity-40 p-8 rounded mt-6'>
					<p className='text-primary text-white mb-8'>Sign up instructions</p>
					<p className='text-secondary text-white'>
						1. For Clubs Enter the name which comes before @daiict.ac.in in club
						email address Club Email format : club_name@daiict.ac.in You have to
						only enter club_name in Club ID section
					</p>
					<p className='text-secondary text-white'>
						2. Please enter valid details in order to maintain consistency and
						harmony
					</p>
					<p className='text-secondary text-white'>
						3. If account details are found to be invalid then that account
						shall be suspended indefinitely
					</p>
				</div>
				<RegisterForm />
			</div>
		</div>
	)
}

export default SignUp
