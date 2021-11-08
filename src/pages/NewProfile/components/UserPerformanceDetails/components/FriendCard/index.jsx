import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import { fetchUserDetailsById, updateUserDetails } from 'services/user-utils'

function FriendCard(props) {
	const { status, creator, userdata } = props

	const onAccept = useCallback(async () => {
		const friends = userdata?.friends
		const creatorFriends = (await fetchUserDetailsById(creator.uid)).friends
		await updateUserDetails(
			{ friends: { ...friends, [creator.uid]: { status: 1, creator } } },
			userdata.NO_ID_FIELD
		)
		await updateUserDetails(
			{
				friends: {
					...creatorFriends,
					[userdata.NO_ID_FIELD]: {
						status: 1,
						creator: {
							image: userdata?.image,
							name: userdata?.username,
							uid: userdata.NO_ID_FIELD,
							degree: userdata?.degree,
							course: userdata?.course
						}
					}
				}
			},
			creator.uid
		)
	}, [userdata, creator])

	const onDecline = useCallback(async () => {
		const friends = userdata?.friends
		const creatorFriends = (await fetchUserDetailsById(creator.uid)).friends
		delete friends[creator.uid]
		delete creatorFriends[userdata.NO_ID_FIELD]
		await updateUserDetails({ friends: friends ?? {} }, userdata.NO_ID_FIELD)
		await updateUserDetails({ friends: creatorFriends ?? {} }, creator.uid)
	}, [userdata, creator.uid])

	const renderActions = () => {
		if (status === 1)
			return <p className='text-outline_blue text-tertiary-bold'>Friends ✓</p>

		return (
			<div className='flex gap-x-2 items-center'>
				<Button
					variant='filled'
					className='h-8 w-max flex items-center justify-center px-2'
					text='Accept'
					callback={onAccept}
				/>
				<Button
					variant='outline'
					className='h-8 w-max flex items-center justify-center'
					text='Decline'
					callback={onDecline}
				/>
			</div>
		)
	}

	return (
		<div className='w-full bg-component_secondary_dark flex justify-between items-center p-3 rounded'>
			<Link
				to={`/${creator.uid}/new-profile`}
				className='flex flex-row gap-x-3 items-center text-decoration-none'
			>
				<Avatar src={creator.image} variant='display' />
				<div>
					<p className='text-secondary text-white'>{creator.name}</p>
					<p className='text-tertiary text-text_placeholder'>
						{creator.degree} | {creator.course}
					</p>
				</div>
			</Link>
			<div className='flex items-center gap-x-3'>{renderActions()}</div>
		</div>
	)
}

export default React.memo(FriendCard)
