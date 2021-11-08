import React, { useCallback, useMemo } from 'react'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import {
	fetchUserDetailsById,
	notifyUser,
	updateUserDetails
} from 'services/user-utils'
import _has from 'lodash/has'
import _isEmpty from 'lodash/isEmpty'

const closeIconStyles = {
	color: '#7DACF9'
}

function Card(props) {
	const {
		image,
		username: name,
		userdata,
		type = 'normal',
		uid = 'xyz',
		course,
		degree
	} = props

	const notificationDetails = useMemo(
		() => ({
			creator: {
				image: userdata.image,
				name: userdata.username,
				degree: userdata.degree,
				course: userdata.course,
				uid: userdata?.NO_ID_FIELD
			},
			contentId: '',
			friends: userdata?.friends ?? {},
			variant: 'request',
			timestamp: Date.now()
		}),
		[userdata]
	)
	const onSendRequest = useCallback(async () => {
		const friends = userdata?.friends
		const creator = await fetchUserDetailsById(uid)
		const creatorFriends = creator.friends

		if (_isEmpty(creatorFriends))
			await updateUserDetails(
				{
					friends: {
						[userdata.NO_ID_FIELD]: {
							status: 0,
							creator: notificationDetails.creator
						}
					}
				},
				uid
			)
		else
			await updateUserDetails(
				{
					friends: {
						...creatorFriends,
						[userdata.NO_ID_FIELD]: {
							status: 0,
							creator: notificationDetails.creator
						}
					}
				},
				uid
			)

		if (_isEmpty(friends))
			await updateUserDetails(
				{
					friends: {
						[uid]: {
							status: -1,
							creator: {
								uid: creator.NO_ID_FIELD,
								image: creator.image,
								name: creator.username,
								degree: creator.degree,
								course: creator.course
							}
						}
					}
				},
				userdata?.NO_ID_FIELD
			)
		else
			await updateUserDetails(
				{
					friends: {
						...friends,
						[uid]: {
							status: -1,
							creator: {
								uid: creator.NO_ID_FIELD,
								image: creator.image,
								name: creator.username,
								degree: creator.degree,
								course: creator.course
							}
						}
					}
				},
				userdata?.NO_ID_FIELD
			)

		await notifyUser(uid, notificationDetails)
	}, [userdata, uid, notificationDetails])

	const onRevokeRequest = useCallback(async () => {
		const friends = userdata?.friends
		delete friends[uid]

		const creatorFriends = (await fetchUserDetailsById(uid)).friends
		delete creatorFriends[userdata?.NO_ID_FIELD]

		await updateUserDetails({ friends: friends ?? {} }, userdata.NO_ID_FIELD)
		await updateUserDetails({ friends: creatorFriends ?? {} }, uid)
	}, [uid, userdata])

	const renderActions = () => {
		if (_has(userdata?.friends, uid)) {
			if (userdata?.friends[uid]?.status === 1)
				return <p className='text-outline_blue text-tertiary-bold'>Friends ✓</p>

			if (userdata?.friends[uid].status === 0)
				return (
					<p className='text-outline_blue text-tertiary-bold'>
						Incoming request
					</p>
				)

			return (
				<div className='flex items-center gap-x-2'>
					<p className='text-tertiary-bold text-outline_blue'>
						Friend request sent
					</p>
					<Button
						variant='abort'
						className='px-3 py-2'
						text='Revoke'
						callback={onRevokeRequest}
					/>
				</div>
			)
		}

		return (
			<Button
				text='Send friend request'
				variant='outline'
				className='text-tertiary-bold'
				callback={onSendRequest}
			/>
		)
	}

	return (
		<div className='w-full bg-component_secondary_dark flex justify-between items-center p-3 rounded'>
			<Link
				to={`/${uid}/new-profile`}
				className='flex flex-row gap-x-3 items-center text-decoration-none'
			>
				<Avatar src={image} variant='display' />
				<div>
					<p className='text-secondary text-white'>{name}</p>
					<p className='text-tertiary text-text_placeholder'>
						{degree} | {course}
					</p>
				</div>
			</Link>
			<div className='flex items-center gap-x-3'>
				{renderActions()}
				{type === 'recent' && (
					<Button className='rounded-3xl text-outline_blue'>
						<CloseIcon style={closeIconStyles} />
					</Button>
				)}
			</div>
		</div>
	)
}

export default React.memo(Card)
