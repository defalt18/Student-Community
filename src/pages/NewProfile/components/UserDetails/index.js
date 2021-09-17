import React from 'react'
import c from 'classnames'
import UserImage from './components/UserImage'
import creator_dummy from '../../../../assets/images/creator_dummy.png'
import Divider from '../../../../components/Divider'
import Tag from '../../../../components/ContentTag'
import Button from '../../../../components/Button'
import {
	PersonIcon,
	BooksIcon,
	StarIcon,
	LocationIcon,
	Instagram,
	Facebook
} from '../../../../components/Icons'

function UserDetails(props) {
	const { className, content } = props
	return (
		<div className={c('flex flex-col items-center px-24', className)}>
			<UserImage src={creator_dummy} />
			<p className='text-primary-02 text-white mt-4'>Emma_123</p>
			<Tag className='mt-2' variant='Student' />
			<p className='text-secondary text-white mt-3'>
				Hey there! I am a student at DAIICT.
			</p>
			<Button
				text='Edit Profile'
				variant='outline'
				className='text-secondary w-full mt-3'
			/>
			<Divider className='mt-6' />
			<p className='text-secondary text-outline_blue self-start my-2'>ABOUT</p>
			<div className='flex flex-row gap-x-2 self-start mt-2'>
				<div className='grid place-items-center'>
					<PersonIcon />
					<LocationIcon />
					<BooksIcon />
					<StarIcon />
				</div>
				<div className='flex flex-col gap-y-2'>
					<p className='text-secondary text-white'>Emma Watson</p>
					<p className='text-secondary text-white'>Gandhinagar, India</p>
					<p className='text-secondary text-white'>
						Btech | ICT with CS | 2018 Batch
					</p>
					<p className='text-secondary text-white'>App Development</p>
				</div>
			</div>
			<Divider className='mt-6' />
			<p className='text-secondary text-outline_blue self-start my-2'>
				CONNECT
			</p>
			<div className='flex flex-row gap-x-3 self-start mt-2'>
				<Instagram />
				<Facebook />
			</div>
			<Divider className='mt-6' />
		</div>
	)
}

export default UserDetails
