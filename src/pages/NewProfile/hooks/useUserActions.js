import React, { useCallback } from 'react'
import {
	fetchUserDetailsById,
	notifyUser,
	updateUserDetails
} from 'services/user-utils'
import { useAsync } from 'react-use'
import Button from 'components/Button'
import _has from 'lodash/has'

export function useUserActions({ friendDoc, userId }) {
	const { NO_ID_FIELD: friendUserId } = friendDoc

	const { loading: disabled, value: userDoc } = useAsync(() =>
		fetchUserDetailsById(userId)
	)

	const notificationDetails = useCallback(
		(userdata) => ({
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
		[]
	)

	const appendCreator = useCallback(
		(userdata) => ({
			uid: userdata.NO_ID_FIELD,
			course: userdata.course,
			degree: userdata.degree,
			name: userdata.username,
			image: userdata.image
		}),
		[]
	)

	const acceptRequest = useCallback(async () => {
		const userFriends = userDoc?.friends
		const friendMembers = friendDoc?.friends
		await updateUserDetails(
			{
				...userDoc,
				friends: {
					...userFriends,
					[friendUserId]: { status: 1, creator: appendCreator(friendDoc) }
				}
			},
			userId
		)
		await updateUserDetails(
			{
				...friendDoc,
				friends: {
					...friendMembers,
					[userId]: { status: 1, creator: appendCreator(userDoc) }
				}
			},
			friendUserId
		)
	}, [userDoc, friendDoc, userId, friendUserId, appendCreator])

	const eraseRequest = useCallback(async () => {
		const userFriends = userDoc?.friends
		const friendMembers = friendDoc?.friends
		delete userFriends[friendUserId]
		delete friendMembers[userId]
		await updateUserDetails({ ...userDoc, friends: userFriends }, userId)
		await updateUserDetails(
			{ ...friendDoc, friends: friendMembers },
			friendUserId
		)
	}, [userDoc, friendDoc, userId, friendUserId])

	const sendRequest = useCallback(async () => {
		await updateUserDetails(
			{
				...userDoc,
				friends: {
					...(userDoc?.friends ?? {}),
					[friendUserId]: { status: -1, creator: appendCreator(friendDoc) }
				}
			},
			userId
		)
		await updateUserDetails(
			{
				...friendDoc,
				friends: {
					...(friendDoc?.friends ?? {}),
					[userId]: { status: 0, creator: appendCreator(userDoc) }
				}
			},
			friendUserId
		)
		await notifyUser(friendUserId, notificationDetails(userDoc))
	}, [
		userDoc,
		userId,
		friendDoc,
		friendUserId,
		appendCreator,
		notificationDetails
	])

	const actions = useCallback(() => {
		if (friendDoc.role === 'Individual') {
			if (friendUserId === userId)
				return (
					<Button
						text='Edit profile'
						variant='outline'
						className='w-full flex justify-center'
						disabled={disabled}
					/>
				)
			if (_has(friendDoc?.friends, userId)) {
				const { status } = friendDoc?.friends[userId]
				if (status === -1)
					return (
						<div className='flex gap-x-2 items-center'>
							<Button
								text='Accept Request'
								variant='filled'
								className='w-full py-2 flex justify-center'
								callback={acceptRequest}
								disabled={disabled}
							/>
							<Button
								text='Decline'
								variant='outline'
								className='w-full flex justify-center'
								disabled={disabled}
								callback={eraseRequest}
							/>
						</div>
					)

				if (status === 0) {
					return (
						<Button
							text='Revoke'
							variant='abort'
							disabled={disabled}
							className='w-full py-2 flex justify-center'
							callback={eraseRequest}
						/>
					)
				}

				if (status === 1) {
					return (
						<Button
							text='Unfriend'
							disabled={disabled}
							variant='abort'
							className='w-full py-2 flex justify-center'
							callback={eraseRequest}
						/>
					)
				}
			}

			return (
				<Button
					text='Follow'
					disabled={disabled}
					variant='outline'
					className='w-full flex justify-center'
					callback={sendRequest}
				/>
			)
		}

		return null
	}, [
		sendRequest,
		acceptRequest,
		disabled,
		friendDoc,
		userId,
		friendUserId,
		eraseRequest
	])

	return { actions }
}
