import React from 'react'
import c from 'classnames'
import UserImage from './components/UserImage'
import creator_dummy from 'assets/images/creator_dummy.png'
import _has from 'lodash/has'
import Divider from 'components/Divider'
import Tag from 'components/ContentTag'
import Button from 'components/Button'
import { Instagram, Facebook } from 'components/Icons'
import { getUserDetails } from '../../utils/getUserDetails'

function UserDetails(props) {
	const { className, content, user } = props
	const {
		image,
		username,
		bio = 'Hey there I am a new student',
		role,
		NO_ID_FIELD: visitorId
	} = content.userdata

	const authorisation = visitorId === user.uid

	return (
		<div className={c('flex flex-col items-center px-24', className)}>
			<UserImage src={image || creator_dummy} authorisation={authorisation} />
			<p className='text-primary-02 text-white mt-4'>{username}</p>
			<Tag className='mt-2' variant={role} />
			<p className='text-secondary text-white mt-3'>{bio}</p>
			{authorisation ? (
				<Button
					text='Edit Profile'
					variant='outline'
					className='text-secondary w-full mt-3 grid place-items-center'
				/>
			) : (
				<Button
					text='Follow'
					variant='outline'
					className='text-secondary w-full mt-3 grid place-items-center'
				/>
			)}
			<Divider className='mt-6' />
			{getUserDetails(role, content.userdata)}
			<Divider className='mt-6' />
			{_has(content.userdata, 'socials') && (
				<>
					<p className='text-secondary text-outline_blue self-start my-2'>
						CONNECT
					</p>
					<div className='flex flex-row gap-x-3 self-start mt-2'>
						<Instagram />
						<Facebook />
					</div>
					<Divider className='mt-6' />
				</>
			)}
		</div>
	)
}

export default React.memo(UserDetails)
