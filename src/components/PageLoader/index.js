import React from 'react'
import logo from '../../assets/images/DA-logo.png'
import { CircularProgress } from '@material-ui/core'

function PageLoader() {
	return (
		<div className='w-screen h-screen bg-body_blue grid place-items-center text-white'>
			<div className='flex flex-col gap-y-8 items-center'>
				<img src={logo} alt='da-logo' className='h-50 w-60' />
				<CircularProgress color={'inherit'} />
			</div>
		</div>
	)
}

export default PageLoader
