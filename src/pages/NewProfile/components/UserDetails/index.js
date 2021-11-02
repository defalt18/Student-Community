import React from 'react'
import c from 'classnames'
import UserImage from './components/UserImage'
import creator_dummy from 'assets/images/creator_dummy.png'
import _has from 'lodash/has'
import Divider from 'components/Divider'
import Tag from 'components/ContentTag'
import _map from 'lodash/map'
import Button from 'components/Button'
import {
	PersonIcon,
	BooksIcon,
	StarIcon,
	LocationIcon,
	Instagram,
	Facebook
} from 'components/Icons'
import _isEmpty from 'lodash/isEmpty'

function UserDetails(props) {
	const { className, content, user } = props
	const {
		image,
		username,
		bio = 'Hey there I am a new student',
		firstName,
		lastName,
		city,
		country,
		course,
		batch,
		degree,
		skills,
		NO_ID_FIELD: visitorId
	} = content.userdata

	const authorisation = visitorId === user.uid

	return (
		<div className={c('flex flex-col items-center px-24', className)}>
			<UserImage src={image || creator_dummy} authorisation={authorisation} />
			<p className='text-primary-02 text-white mt-4'>{username}</p>
			<Tag className='mt-2' variant='Student' />
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
			<p className='text-secondary text-outline_blue self-start my-2'>ABOUT</p>
			<div className='flex flex-col gap-y-2 self-start mt-2'>
				<div className='flex flex-row'>
					<div className='w-8 flex flex-col items-center'>
						<PersonIcon fill='#fff' />
					</div>
					<p className='text-secondary text-white'>
						{firstName} {lastName}
					</p>
				</div>
				<div className='flex flex-row'>
					<div className='w-8 flex flex-col items-center'>
						<LocationIcon fill='#fff' />
					</div>
					<p className='text-secondary text-white'>
						{city}, {country}
					</p>
				</div>
				<div className='flex flex-row'>
					<div className='w-8 flex flex-col items-center'>
						<BooksIcon fill='#fff' />
					</div>
					<p className='text-secondary text-white'>
						{degree} | {course} | {batch} Batch
					</p>
				</div>
				{_isEmpty(skills) ? null : (
					<div className='flex flex-row'>
						<div className='w-8 flex flex-col items-center'>
							<StarIcon fill='#fff' />
						</div>
						<p className='text-secondary text-white'>
							{_map(skills, (skill) => (
								<p key={skill}>{skill}</p>
							))}
						</p>
					</div>
				)}
			</div>
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
